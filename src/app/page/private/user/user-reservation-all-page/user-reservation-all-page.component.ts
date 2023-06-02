import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {ReservationService} from "../../../../service/ReservationService";
import {UserReservationAllRequestDto} from "../../../../dto/reservation/UserReservationAllRequestDto";
import {DateUtil} from "../../../../util/DateUtil";
import {
  PrivateSelectComponentComponent
} from "../../../../component/private/private-select/private-select-component.component";
import {ErrorDto} from "../../../../dto/error/ErrorDto";
import {RoomTypeConfigurationUtil} from "../../../../util/RoomTypeConfigurationUtil";
import {UserReservationInfo} from "../../../../model/reservation/UserReservationInfo";
import {Table} from "../../../../model/common/Table";
import {Row} from "../../../../model/common/Row";

@Component({
  selector: 'app-user-reservation-all-page',
  templateUrl: './user-reservation-all-page.component.html',
  styleUrls: ['./user-reservation-all-page.component.scss']
})
export class UserReservationAllPageComponent {

  @ViewChild("roomTypeNameSelect") roomTypeNameSelect: PrivateSelectComponentComponent | undefined;

  @ViewChild("capacitySelect") capacitySelect: PrivateSelectComponentComponent | undefined;

  roomTypeList: string[] = [];

  numberOfPeopleList: string[] = [];

  busy: boolean = false;

  errorDto: ErrorDto = {} as ErrorDto;

  userReservationAllRequestDto: UserReservationAllRequestDto = {
    user_profile_id: Number.parseInt(this.authService.getItem("id") ?? "0"),
  } as UserReservationAllRequestDto;

  userReservationInfoList: UserReservationInfo[] = [];

  constructor(public dateUtil: DateUtil, private router: Router, private authService: AuthService,
              private roomTypeConfigurationUtil: RoomTypeConfigurationUtil, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    const token = this.authService.getItem('jwt');
    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    }

    this.busy = true;
    this.roomTypeConfigurationUtil.getRoomTypeConfigurationInfo().then(value => {
      this.roomTypeList = value.roomTypeList;
      this.numberOfPeopleList = value.numberOfPeopleList;
      this.errorDto = value.errorDto;
      this.getUserReservationList();
    }).catch(() => {
      this.errorDto.result = false;
      this.errorDto.message = 'Failed to load configuration data.';
      this.busy = false;
    });
  }

  public onDateSelectOptionChanged(event: Event): void {
    this.userReservationAllRequestDto.room_type_name = this.roomTypeNameSelect?.getSelectedOption();
    this.userReservationAllRequestDto.capacity = this.capacitySelect?.getSelectedOption();
    const inputDate = event.target as HTMLInputElement;
    if (!inputDate.value) {
      if (inputDate.id === "check-in") {
        this.userReservationAllRequestDto.check_in = "";
      } else {
        this.userReservationAllRequestDto.check_out = "";
      }
      this.getUserReservationList();
      return;
    }

    const newDate = new Date(inputDate.value);
    if (inputDate.id === "check-in") {
      if (newDate > new Date(this.userReservationAllRequestDto.check_out)) {
        inputDate.value = this.dateUtil.getDateFromISO(this.userReservationAllRequestDto.check_in);
        return;
      }
      this.userReservationAllRequestDto.check_in = newDate.toISOString();
    } else {
      if (newDate < new Date(this.userReservationAllRequestDto.check_in)) {
        inputDate.value = this.dateUtil.getDateFromISO(this.userReservationAllRequestDto.check_out);
        return;
      }
      this.userReservationAllRequestDto.check_out = newDate.toISOString();
    }

    this.getUserReservationList();
  }

  public onRoomTypeCapacitySelectOptionChanged(selectedOption: string) {
    this.userReservationAllRequestDto.room_type_name = selectedOption;
    this.userReservationAllRequestDto.capacity = selectedOption;
    this.getUserReservationList();
  }

  public createTable(): Table {
    return {
      headerList: ["No", "Transaction", "Room type", "Check in", "Check out", "Capacity", "Room cost"],
      rowList: this.toRowListMapper()
    };
  }

  private toRowListMapper(): Row[] {
    let counter: number = 1;
    let rowList: Row[] = [];
    this.userReservationInfoList.forEach(userReservationInfo => {
      rowList.push({
        id: userReservationInfo.id,
        no: counter,
        cellList: [
          userReservationInfo.transactionCode,
          userReservationInfo.roomType,
          userReservationInfo.checkIn,
          userReservationInfo.checkOut,
          userReservationInfo.capacity.toString(),
          userReservationInfo.roomCost + "€"
        ]
      });
      counter++;
    });
    return rowList;
  }

  private async getUserReservationList() {
    this.busy = true;
    this.reservationService.getUserReservationInfoList(this.userReservationAllRequestDto).subscribe(response => {
      this.userReservationInfoList = this.reservationService.toUserReservationInfoListMapper(response);
      this.errorDto.result = true;
      if (this.userReservationInfoList.length == 0) {
        this.errorDto.result = false;
        this.errorDto.message = "Empty user reservation list";
      }
      this.busy = false;
    }, () => {
      this.errorDto.result = false;
      this.errorDto.message = 'Incorrect date format';
      this.busy = false;
    });
  }
}
