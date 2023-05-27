import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {AvailableRoomType} from "../../../../model/room-type/AvailableRoomType";
import {RoomTypeService} from "../../../../service/RoomTypeService";
import {AvailableRoomTypeListRequestDto} from "../../../../dto/room-type/AvailableRoomTypeListRequestDto";
import {
  PrivateSelectComponentComponent
} from "../../../../component/private/private-select/private-select-component.component";
import {RoomTypeCardData} from "../../../../model/room-type/RoomTypeCardData";
import {ErrorDto} from "../../../../dto/error/ErrorDto";

@Component({
  selector: 'app-user-reservation-new-step-first-page',
  templateUrl: './user-reservation-new-step-first-page.component.html',
  styleUrls: ['./user-reservation-new-step-first-page.component.scss']
})
export class UserReservationNewStepFirstPageComponent {

  @ViewChild("roomTypeNameSelect") roomTypeNameSelect: PrivateSelectComponentComponent | undefined;

  @ViewChild("capacitySelect") capacitySelect: PrivateSelectComponentComponent | undefined;

  shoppingCart: number = 0;

  roomTypeList: string[] = ["Any"];

  numberOfPeopleList: string[] = [];

  availableRoomTypeList: AvailableRoomType[] = [];

  busy: boolean = false;

  errorDto: ErrorDto = {} as ErrorDto;

  public availableRoomTypeListRequestDto: AvailableRoomTypeListRequestDto = {
    check_in: new Date().toISOString(),
    check_out: this.getDefaultCheckOutDate().toISOString(),
    room_type_name: undefined,
    capacity: undefined
  };

  private roomTypeCardDataList: RoomTypeCardData[] = [];

  constructor(private router: Router, private authService: AuthService, private roomTypeService: RoomTypeService) {
  }

  ngOnInit(): void {
    const token = this.authService.getItem('jwt');
    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    }

    this.getRoomTypeConfigurationInfo();
    this.getAvailableRoomTypeList();
  }

  public getDateFromISO(dateInISO: String): string {
    return dateInISO.split('T')[0];
  }

  public handleDateChange(event: Event) {
    const inputDate = event.target as HTMLInputElement;
    const newDate = new Date(inputDate.value);
    if (inputDate.id === "check-in" && newDate < new Date(this.availableRoomTypeListRequestDto.check_out) && newDate > new Date()) {
      this.availableRoomTypeListRequestDto.check_in = new Date(inputDate.value).toISOString();
    }
    if (inputDate.id === "check-out" && newDate > new Date(this.availableRoomTypeListRequestDto.check_in)) {
      this.availableRoomTypeListRequestDto.check_out = new Date(inputDate.value).toISOString();
    }

    inputDate.value = this.getDateFromISO(inputDate.id === "check-in" ? this.availableRoomTypeListRequestDto.check_in : this.availableRoomTypeListRequestDto.check_out);
  }

  public handleShoppingCartChange(roomTypeCardData: RoomTypeCardData) {
    this.shoppingCart += roomTypeCardData.amount;
    let result = this.roomTypeCardDataList.find(r => roomTypeCardData.roomTypeName === r.roomTypeName);
    if (result) {
      result.amount += roomTypeCardData.amount;
    } else {
      this.roomTypeCardDataList.push(roomTypeCardData);
    }

    const spanElement = document.getElementById('shopping-cart') as HTMLSpanElement;
    spanElement.classList.add('fade-in-animation');
    setTimeout(() => {
      spanElement.classList.remove('fade-in-animation');
    }, 2 * 1000);
  }

  public onClickSearchButton(): void {
    this.availableRoomTypeListRequestDto.room_type_name = this.roomTypeNameSelect?.getSelectedOption();
    this.availableRoomTypeListRequestDto.capacity = this.capacitySelect?.getSelectedOption();
    this.getAvailableRoomTypeList();
  }

  public routerGoToShoppingCart(): void {
    this.getShoppingCartSummary();
  }

  private async getRoomTypeConfigurationInfo(): Promise<void> {
    this.busy = true;
    this.roomTypeService.getRoomTypeConfigurationInfo().subscribe(response => {
      response.room_type_list.forEach(room_type => this.roomTypeList.push(room_type));
      this.numberOfPeopleList = response.capacity_list;
      this.errorDto.result = true;
    }, () => {
      this.errorDto.result = false;
      this.errorDto.message = 'Room type configuration info not found.';
    });
  }

  private async getAvailableRoomTypeList(): Promise<void> {
    this.busy = true;
    this.roomTypeService.getAvailableRoomTypeList(this.availableRoomTypeListRequestDto).subscribe(response => {
      this.availableRoomTypeList = response.available_room_type_list.map(availableRoomTypeDto => {
        return this.roomTypeService.toAvailableRoomTypeMapper(availableRoomTypeDto);
      });

      if (this.availableRoomTypeList.length < 1) {
        this.errorDto.result = false;
        this.errorDto.message = 'No available rooms found. Please try to change filters.';
      } else {
        this.errorDto.result = true;
      }
      this.busy = false;
    }, () => {
      this.busy = false;
      this.errorDto.result = false;
      this.errorDto.message = 'Available room type list not found.';
    });
  }

  private async getShoppingCartSummary(): Promise<void> {
    if (this.shoppingCart == 0) {
      return;
    }

    this.busy = true;
    this.roomTypeService.getShoppingCartSummary(this.roomTypeService.toShoppingCartSummaryRequestDtoMapper(
      this.availableRoomTypeListRequestDto.check_in, this.availableRoomTypeListRequestDto.check_out, this.roomTypeCardDataList, false, false))
      .subscribe(response => {
        this.authService.saveShoppingCartDetailsResponseDtoInSessionStorage(this.roomTypeService.toShoppingCartModelMapper(response));
        this.busy = false;
        this.errorDto.result = true;
        this.router.navigateByUrl('/private/user/reservation/new/step/second');
      }, () => {
        this.busy = false;
        this.errorDto.result = false;
        this.errorDto.message = 'Available room type list has changed during selection process.';
        this.getAvailableRoomTypeList();
      });
  }

  private getDefaultCheckOutDate(): Date {
    const weekInMs: number = 7 * 24 * 60 * 60 * 1000;
    const currentDate: Date = new Date();

    return new Date(currentDate.getTime() + weekInMs);
  }

}
