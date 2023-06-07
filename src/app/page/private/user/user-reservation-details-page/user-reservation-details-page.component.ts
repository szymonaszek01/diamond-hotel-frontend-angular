import {Component} from '@angular/core';
import {ErrorDto} from "../../../../dto/error/ErrorDto";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {ReservationService} from "../../../../service/ReservationService";
import {UserReservationDetails} from "../../../../model/reservation/UserReservationDetails";
import {AvailableRoomType} from "../../../../model/room-type/AvailableRoomType";
import {Detail} from "../../../../model/common/Detail";
import {UserReservationDetailsInfoRequestDto} from "../../../../model/reservation/UserReservationDetailsInfoRequestDto";

@Component({
  selector: 'app-user-reservation-details-page',
  templateUrl: './user-reservation-details-page.component.html',
  styleUrls: ['./user-reservation-details-page.component.scss']
})
export class UserReservationDetailsPageComponent {

  busy: boolean = false;

  userReservationDetails: UserReservationDetails = {} as UserReservationDetails;

  errorDto: ErrorDto = {} as ErrorDto;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService,
              private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.busy = true;
    const token = this.authService.getItem('jwt');
    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    }

    this.errorDto.result = true;
    this.errorDto.message = "";

    this.activatedRoute.params.subscribe(params => {
      const reservationId: number = Number.parseInt(params['reservation-id']);
      this.getUserReservationDetails(reservationId);
    });
  }

  public createAvailableRoomType(): AvailableRoomType {
    return {
      roomType: this.userReservationDetails.roomType,
      roomTypeOpinion: this.userReservationDetails.roomTypeOpinion
    };
  }

  public onButtonCancelClick(): void {
    this.busy = true;
    this.activatedRoute.params.subscribe(params => {
      const reservationId: number = Number.parseInt(params['reservationId']);
      this.deleteUserReservationDetailsInfo(reservationId);
    });
  }

  public createReservationDetailList(): Detail[] {
    return [
      {
        label: "User",
        value: this.userReservationDetails.email,
        visibility: this.authService.isAdmin()
      },
      {
        label: "Check in",
        value: this.userReservationDetails.checkIn,
        visibility: true
      },
      {
        label: "Check out",
        value: this.userReservationDetails.checkOut,
        visibility: true
      },
      {
        label: "Flight number",
        value: this.userReservationDetails.flightNumber,
        visibility: this.userReservationDetails.flightNumber.length > 0
      },
      {
        label: "Number",
        value: this.userReservationDetails.room.roomNumber.toString(),
        visibility: true
      },
      {
        label: "Floor",
        value: this.userReservationDetails.room.floor.toString(),
        visibility: true
      },
      {
        label: "Room cost",
        value: this.userReservationDetails.roomCost + "€",
        visibility: true
      }
    ];
  }

  public createTransactionDetailList(): Detail[] {
    return [
      {
        label: "Code",
        value: this.userReservationDetails.transaction.code,
        visibility: true
      },
      {
        label: "Total",
        value: this.userReservationDetails.transaction.totalWithoutTax + "€",
        visibility: true
      },
      {
        label: "Tax",
        value: this.userReservationDetails.transaction.tax + "€",
        visibility: true
      },
      {
        label: "Car rent",
        value: this.userReservationDetails.transaction.carRent + "€",
        visibility: true
      },
      {
        label: "Car pick up",
        value: this.userReservationDetails.transaction.carPickUp + "€",
        visibility: true
      },
      {
        label: "Status",
        value: this.userReservationDetails.transaction.status,
        visibility: true
      }
    ];
  }

  private async getUserReservationDetails(reservationId: number) {
    const userReservationDetailsInfoRequestDto: UserReservationDetailsInfoRequestDto = {
      user_profile_id: Number.parseInt(this.authService.getItem("id") ?? "0"),
      reservation_id: reservationId
    }
    this.busy = true;
    this.reservationService.getUserReservationDetailsInfo(userReservationDetailsInfoRequestDto).subscribe(response => {
      this.userReservationDetails = this.reservationService.toUserReservationDetailsMapper(response);
      this.errorDto.result = true;
      this.busy = false;
    }, () => {
      this.errorDto.result = false;
      this.errorDto.message = "Reservation not found";
      this.busy = false;
    });
  }

  private deleteUserReservationDetailsInfo(reservationId: number) {
    this.busy = true;
    this.reservationService.cancelUserReservation(reservationId).subscribe(response => {
      if (response.status == "CANCELLED") {
        this.errorDto.result = true;
        this.busy = false;
        this.router.navigateByUrl('private/user/' + this.authService.getItem("id") + '/reservation/all');
      } else {
        this.errorDto.result = false;
        this.errorDto.message = "Reservation not cancelled. Try again later.";
      }
    }, () => {
      this.errorDto.result = false;
      this.errorDto.message = "Reservation not found";
      this.busy = false;
    });
  }
}
