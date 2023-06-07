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
import {DateUtil} from "../../../../util/DateUtil";
import {RoomTypeConfigurationUtil} from "../../../../util/RoomTypeConfigurationUtil";

@Component({
  selector: 'app-user-reservation-new-step-first-page',
  templateUrl: './user-reservation-new-step-first-page.component.html',
  styleUrls: ['./user-reservation-new-step-first-page.component.scss']
})
export class UserReservationNewStepFirstPageComponent {

  @ViewChild("roomTypeNameSelect") roomTypeNameSelect: PrivateSelectComponentComponent | undefined;

  @ViewChild("capacitySelect") capacitySelect: PrivateSelectComponentComponent | undefined;

  shoppingCart: number = 0;

  roomTypeList: string[] = [];

  numberOfPeopleList: string[] = [];

  availableRoomTypeList: AvailableRoomType[] = [];

  busy: boolean = false;

  errorDto: ErrorDto = {} as ErrorDto;

  public availableRoomTypeListRequestDto: AvailableRoomTypeListRequestDto = {
    check_in: new Date().toISOString(),
    check_out: this.dateUtil.getDefaultCheckOutDate().toISOString(),
    room_type_name: undefined,
    capacity: undefined
  };

  private roomTypeCardDataList: RoomTypeCardData[] = [];

  constructor(public dateUtil: DateUtil, private authService: AuthService,
              private roomTypeService: RoomTypeService, private roomTypeConfigurationUtil: RoomTypeConfigurationUtil) {
  }

  ngOnInit(): void {
    this.busy = true;
    this.authService.onPageInit(undefined, "/login-page");

    this.roomTypeConfigurationUtil.getRoomTypeConfigurationInfo().then(value => {
      this.roomTypeList = value.roomTypeList;
      this.numberOfPeopleList = value.numberOfPeopleList;
      this.errorDto = value.errorDto;
      this.getAvailableRoomTypeList();
    }).catch(() => {
      this.errorDto.result = false;
      this.errorDto.message = 'Failed to load configuration data.';
    });
  }

  public onDateSelectOptionChanged(event: Event): void {
    if (this.dateUtil.handleDateChange(event, this.availableRoomTypeListRequestDto)) {
      this.shoppingCart = 0;
      this.roomTypeCardDataList = [];
      this.getAvailableRoomTypeList();
    }
  }

  public onRoomTypeSelectOptionChanged(selectedOption: string) {
    this.availableRoomTypeListRequestDto.room_type_name = selectedOption;
    this.getAvailableRoomTypeList();
  }

  public onCapacitySelectOptionChanged(selectedOption: string) {
    this.availableRoomTypeListRequestDto.capacity = selectedOption;
    this.getAvailableRoomTypeList();
  }

  public onShoppingCartOptionChanged(roomTypeCardData: RoomTypeCardData) {
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

  public routerGoToShoppingCart(): void {
    this.getShoppingCartSummary();
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
        this.authService.navigateByRole('/reservation/new/step/second');
      }, () => {
        this.busy = false;
        this.errorDto.result = false;
        this.errorDto.message = 'Available room type list has changed during selection process.';
        this.getAvailableRoomTypeList();
      });
  }
}
