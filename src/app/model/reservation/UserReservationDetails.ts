import {RoomType} from "../room-type/RoomType";
import {RoomTypeOpinion} from "../room-type/RoomTypeOpinion";
import {Room} from "../room/Room";
import {Transaction} from "../transaction/Transaction";

export interface UserReservationDetails {
  checkIn: string;
  checkOut: string;
  roomCost: number;
  flightNumber: string;
  email: string;
  roomType: RoomType;
  roomTypeOpinion: RoomTypeOpinion;
  room: Room;
  transaction: Transaction;
}
