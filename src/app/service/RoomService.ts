import {Injectable} from "@angular/core";
import {UserReservationDetailsInfoResponseDto} from "../dto/reservation/UserReservationDetailsInfoResponseDto";
import {Room} from "../model/room/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() {
  }

  public toRoomMapper(userReservationDetailsInfoResponseDto: UserReservationDetailsInfoResponseDto): Room {
    return {
      roomNumber: userReservationDetailsInfoResponseDto.room.room_number,
      floor: userReservationDetailsInfoResponseDto.room.floor
    };
  }
}
