import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {RoomTypeService} from "../../../../service/RoomTypeService";
import {ShoppingCartModel} from "../../../../model/shopping-cart/ShoppingCartModel";
import {
  PrivateSelectComponentComponent
} from "../../../../component/private/private-select/private-select-component.component";
import {RoomTypeCardData} from "../../../../model/room-type/RoomTypeCardData";
import {CarDto} from "../../../../dto/shopping-cart/CarDto";
import {PaymentService} from "../../../../service/PaymentService";
import {DateUtil} from "../../../../util/DateUtil";

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

  constructor(public dateHandler: DateUtil, private router: Router, private authService: AuthService, private roomTypeService: RoomTypeService,
              private paymentService: PaymentService) {
    window.addEventListener('popstate', this.handlePopState);
  }

  ngOnInit(): void {
    const token = this.authService.getItem('jwt');
    const shoppingCartModel = this.authService.getItem('shoppingCartModel')
    if (!token || this.authService.isTokenExpired(token) || !shoppingCartModel) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    } else {
      this.shoppingCartModel = JSON.parse(shoppingCartModel);
      this.shoppingCartModel.roomTypeSummaryInfo.forEach(roomTypeSummaryInfo => this.shoppingCart += roomTypeSummaryInfo.roomTypeCardData.amount);
    }
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
    this.router.navigateByUrl('/private/user/reservation/new/step/first');
  }

  public pay(): void {
    this.initializePayment()
  }

  private async initializePayment() {
    this.paymentService.initializePayment('Diamond Hotel', 'Reservation', this.getTotalCost()).subscribe(response => {
      this.authService.saveStripeTokenInSessionStorage(response);
      this.router.navigateByUrl('private/user/reservation/all');
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
