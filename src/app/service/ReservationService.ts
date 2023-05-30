import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserReservationAllResponseDto} from "../dto/reservation/UserReservationAllResponseDto";
import {UserReservationAllRequestDto} from "../dto/reservation/UserReservationAllRequestDto";
import {UserReservationInfo} from "../model/reservation/UserReservationInfo";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // URL_PRODUCTION
  private url = 'https://diamond-hotel-backend.onrender.com/api/v1/reservation';

  // URL_LOCALHOST
  // private url = 'http://localhost:5432/api/v1/reservation';

  constructor(private http: HttpClient) {
  }

  public getUserReservationInfoList(userReservationAllRequestDto: UserReservationAllRequestDto): Observable<UserReservationAllResponseDto> {
    return this.http.post<UserReservationAllResponseDto>(this.url + '/all/info', userReservationAllRequestDto);
  }

  public toUserReservationInfoListMapper(userReservationAllResponseDto: UserReservationAllResponseDto): UserReservationInfo[] {
    return userReservationAllResponseDto.reservation_list.map(userReservationAllResponseDto => {
      return {
        id: userReservationAllResponseDto.id,
        code: userReservationAllResponseDto.code,
        roomType: userReservationAllResponseDto.room_type_name,
        checkIn: userReservationAllResponseDto.check_in,
        checkOut: userReservationAllResponseDto.check_out,
        capacity: userReservationAllResponseDto.capacity,
        cost: userReservationAllResponseDto.cost
      }
    });
  }
}
