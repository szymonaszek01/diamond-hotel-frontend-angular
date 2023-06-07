import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {RoomTypeService} from "../../../../service/RoomTypeService";
import {ShoppingCartModel} from "../../../../model/shopping-cart/ShoppingCartModel";
import {CarDto} from "../../../../dto/shopping-cart/CarDto";
import {TransactionService} from "../../../../service/TransactionService";
import {DateUtil} from "../../../../util/DateUtil";
import {ReservationService} from "../../../../service/ReservationService";
import {UserReservationNewRequestDto} from "../../../../dto/reservation/UserReservationNewRequestDto";
import {ErrorDto} from "../../../../dto/error/ErrorDto";
import {TransactionStatusInfoDto} from "../../../../dto/transaction/TransactionStatusInfoDto";

@Component({
  selector: 'app-user-reservation-new-step-second-page',
  templateUrl: './user-reservation-new-step-second-page.component.html',
  styleUrls: ['./user-reservation-new-step-second-page.component.scss']
})
export class UserReservationNewStepSecondPageComponent {

  shoppingCart: number = 0;

  shoppingCartModel: ShoppingCartModel = {} as ShoppingCartModel;

  busy: boolean = false;

  carRentSelectedValue: string = "Any";

  carPickUpSelectedValue: string = "Any";

  flightNumber: string = '';

  carRentDuration: string = '';

  errorDto: ErrorDto = {} as ErrorDto;

  constructor(public dateHandler: DateUtil, private router: Router, private authService: AuthService, private roomTypeService: RoomTypeService,
              private transactionService: TransactionService, private reservationService: ReservationService) {
    window.addEventListener('popstate', this.handlePopState);
  }

  ngOnInit(): void {
    this.authService.onPageInit(undefined, "/login-page");
    const shoppingCartModel = this.authService.getItem('shoppingCartModel')
    if (!shoppingCartModel) {
      this.authService.navigateByRole('/reservation/new/step/first');
    } else {
      this.shoppingCartModel = JSON.parse(shoppingCartModel);
      this.shoppingCartModel.roomTypeSummaryInfo.forEach(roomTypeSummaryInfo => this.shoppingCart += roomTypeSummaryInfo.roomTypeCardData.amount);
    }
    this.errorDto.result = true;
    this.errorDto.message = "";
  }

  public handlePopState(): void {
    this.authService.removeItem('shoppingCartModel');
  }

  public onCarRentSelectChanged(value: string): void {
    this.carRentSelectedValue = value;
    if (this.carRentSelectedValue == "No") {
      this.carRentDuration = '';
      this.getShoppingCartSummaryCostWithCar();
    }
  }

  public onCarPickUpSelectChanged(value: string): void {
    this.carPickUpSelectedValue = value;
    if (this.carPickUpSelectedValue == "No") {
      this.flightNumber = '';
      this.getShoppingCartSummaryCostWithCar();
    }
  }

  public onInputChanged(): void {
    if (this.isValidFlightNumber() || this.isValidCarRentDuration()) {
      this.getShoppingCartSummaryCostWithCar();
    }
  }

  public isValidFlightNumber(): boolean {
    const regex = /^[A-Z]{2}\d{3,4}$/;
    return regex.test(this.flightNumber);
  }

  public isValidCarRentDuration(): boolean {
    const carRentDurationAsNumber: number = Number.parseInt(this.carRentDuration) * 24 * 60 * 60 * 1000;
    const reservationTime: number = new Date(this.shoppingCartModel.checkOut).getTime() - new Date(this.shoppingCartModel.checkIn).getTime();

    return carRentDurationAsNumber > 0 && carRentDurationAsNumber < reservationTime;
  }

  public getTotalCost(): number {
    return this.shoppingCartModel.totalWithoutTax + this.shoppingCartModel.carPickUpCost + this.shoppingCartModel.carRentCost + this.shoppingCartModel.tax;
  }

  public routerGoToRoomSelection(): void {
    this.authService.removeItem('shoppingCartModel');
    this.authService.navigateByRole('/reservation/new/step/first');
  }

  public pay(): void {
    this.createNewReservation()
  }

  private async createNewReservation() {
    this.busy = true;
    this.shoppingCartModel.flightNumber = this.flightNumber;
    const userReservationNewRequestDto: UserReservationNewRequestDto = this.reservationService.toUserReservationNewRequestDtoMapper(this.shoppingCartModel);
    this.reservationService.createNewUserReservation(userReservationNewRequestDto).subscribe(response => {
      this.errorDto.result = true;
      this.busy = false;
      this.initializePayment(response.transaction_code, response.reservation_cost);
    }, () => {
      this.errorDto.result = false;
      this.busy = false;
      this.errorDto.message = "Number of available rooms has changed. Please, create reservation again."
    })
  }

  private async initializePayment(code: string, cost: number) {
    this.transactionService.initializePayment('Diamond Hotel', 'Reservation - ' + code, cost).subscribe(response => {
      this.authService.saveStripeTokenInSessionStorage(response);
      this.approveTransaction(code);
    }, () => {
      this.cancelTransaction(code);
    });
  }

  private async approveTransaction(code: string) {
    const transactionStatusInfoDto: TransactionStatusInfoDto = {
      code: code,
      status: "APPROVED"
    };
    this.busy = true;
    this.transactionService.changeTransactionStatus(transactionStatusInfoDto).subscribe(() => {
      this.busy = false;
      this.errorDto.result = true;
      this.authService.navigateByRole('/reservation/all');
    }, () => {
      this.busy = false;
      this.errorDto.result = false;
      this.errorDto.message = "Transaction not found. Please, pay again.";
    });
  }

  private async cancelTransaction(code: string) {
    const transactionStatusInfoDto: TransactionStatusInfoDto = {
      code: code,
      status: "CANCELLED"
    };
    this.busy = true;
    this.transactionService.changeTransactionStatus(transactionStatusInfoDto).subscribe(() => {
      this.busy = false;
      this.errorDto.result = true;
      this.authService.navigateByRole('/reservation/new/step/first');
    }, () => {
      this.busy = false;
      this.errorDto.result = false;
      this.errorDto.message = "Transaction not found. Please, create reservation again.";
    });
  }

  private async getShoppingCartSummaryCostWithCar() {
    this.busy = true;
    const carDto: CarDto = {
      check_in: this.shoppingCartModel.checkIn,
      check_out: this.shoppingCartModel.checkOut,
      total_room_cost: this.shoppingCartModel.totalWithoutTax,
      car_pick_up: this.carPickUpSelectedValue == "Yes" && this.isValidFlightNumber(),
      car_rent: this.carRentSelectedValue == "Yes" && this.isValidCarRentDuration(),
      car_rent_duration: this.isValidCarRentDuration() ? Number.parseInt(this.carRentDuration) : 0
    };

    this.roomTypeService.getShoppingCartSummaryCostWithCar(carDto).subscribe(response => {
      this.shoppingCartModel.totalWithoutTax = response.total_without_tax;
      this.shoppingCartModel.tax = response.tax;
      this.shoppingCartModel.carRentCost = response.car_rent;
      this.shoppingCartModel.carPickUpCost = response.car_pick_up;
      this.busy = false;
    }, () => {
      this.busy = false;
      console.log("Calculating total cost with car failed");
    })
  }
}
