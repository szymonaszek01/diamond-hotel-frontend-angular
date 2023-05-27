import {RoomTypeCardData} from "../room-type/RoomTypeCardData";

export interface RoomTypeSummaryInfo {
  roomTypeCardData: RoomTypeCardData;
  pricePerHotelNight: number;
  selectedRoomsCost: number;
  capacity: number;
}
