import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserReservationAllResponseDto} from "../dto/reservation/UserReservationAllResponseDto";
import {UserReservationAllRequestDto} from "../dto/reservation/UserReservationAllRequestDto";
import {UserReservationInfo} from "../model/reservation/UserReservationInfo";
import {UserReservationNewRequestDto} from "../dto/reservation/UserReservationNewRequestDto";
import {UserReservationNewResponseDto} from "../dto/reservation/UserReservationNewResponseDto";
import {ShoppingCartModel} from "../model/shopping-cart/ShoppingCartModel";
import {UserReservationDetailsInfoResponseDto} from "../dto/reservation/UserReservationDetailsInfoResponseDto";
import {UserReservationDetails} from "../model/reservation/UserReservationDetails";
import {RoomTypeService} from "./RoomTypeService";
import {RoomService} from "./RoomService";
import {TransactionService} from "./TransactionService";
import {UserReservationDetailsInfoRequestDto} from "../model/reservation/UserReservationDetailsInfoRequestDto";
import {UserReservationCancellationResponseDto} from "../dto/reservation/UserReservationCancellationResponseDto";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // URL_PRODUCTION
  private url = 'https://diamond-hotel-backend.onrender.com/api/v1/reservation';

  // URL_LOCALHOST
  // private url = 'http://localhost:5432/api/v1/reservation';

  constructor(private http: HttpClient, private roomTypeService: RoomTypeService, private roomService: RoomService, private transactionService: TransactionService) {
  }

  public getUserReservationInfoList(userReservationAllRequestDto: UserReservationAllRequestDto): Observable<UserReservationAllResponseDto> {
    return this.http.post<UserReservationAllResponseDto>(this.url + '/all/info', userReservationAllRequestDto);
  }

  public createNewUserReservation(userReservationNewRequestDto: UserReservationNewRequestDto): Observable<UserReservationNewResponseDto> {
    return this.http.post<UserReservationNewResponseDto>(this.url + '/create/new', userReservationNewRequestDto);
  }

  public getUserReservationDetailsInfo(userReservationDetailsInfoRequestDto: UserReservationDetailsInfoRequestDto): Observable<UserReservationDetailsInfoResponseDto> {
    return this.http.post<UserReservationDetailsInfoResponseDto>(this.url + '/details/info', userReservationDetailsInfoRequestDto);
  }

  public cancelUserReservation(reservationId: number): Observable<UserReservationCancellationResponseDto> {
    return this.http.delete<UserReservationCancellationResponseDto>(this.url + '/id/' + reservationId + '/cancel');
  }

  public toUserReservationInfoListMapper(userReservationAllResponseDto: UserReservationAllResponseDto): UserReservationInfo[] {
    return userReservationAllResponseDto.reservation_list.map(userReservationAllResponseDto => {
      return {
        id: userReservationAllResponseDto.id,
        transactionCode: userReservationAllResponseDto.transaction_code,
        roomType: userReservationAllResponseDto.room_type_name,
        checkIn: userReservationAllResponseDto.check_in,
        checkOut: userReservationAllResponseDto.check_out,
        capacity: userReservationAllResponseDto.capacity,
        roomCost: userReservationAllResponseDto.room_cost
      }
    });
  }

  public toUserReservationNewRequestDtoMapper(shoppingCartModel: ShoppingCartModel): UserReservationNewRequestDto {
    return {
      user_profile_id: shoppingCartModel.userProfileId,
      check_in: shoppingCartModel.checkIn,
      check_out: shoppingCartModel.checkOut,
      room_type_info: shoppingCartModel.roomTypeSummaryInfo.map(roomTypeSummary => {
        return {
          room_type_name: roomTypeSummary.roomTypeCardData.roomTypeName,
          selected_rooms: roomTypeSummary.roomTypeCardData.amount
        }
      }),
      flight_number: shoppingCartModel.flightNumber,
      cost: {
        total_without_tax: shoppingCartModel.totalWithoutTax,
        car_rent: shoppingCartModel.carRentCost,
        car_pick_up: shoppingCartModel.carPickUpCost,
        tax: shoppingCartModel.tax
      }
    };
  }

  public toUserReservationDetailsMapper(userReservationDetailsInfoResponseDto: UserReservationDetailsInfoResponseDto): UserReservationDetails {
    return {
      checkIn: userReservationDetailsInfoResponseDto.check_in,
      checkOut: userReservationDetailsInfoResponseDto.check_out,
      roomCost: userReservationDetailsInfoResponseDto.room_cost,
      flightNumber: userReservationDetailsInfoResponseDto.flight_number,
      roomType: this.roomTypeService.toRoomTypeMapper(userReservationDetailsInfoResponseDto),
      roomTypeOpinion: this.roomTypeService.toRoomTypeOpinionMapper(userReservationDetailsInfoResponseDto),
      room: this.roomService.toRoomMapper(userReservationDetailsInfoResponseDto),
      transaction: this.transactionService.toTransactionMapper(userReservationDetailsInfoResponseDto)
    }
  }
}
