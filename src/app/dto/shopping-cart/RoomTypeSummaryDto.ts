import {RoomTypeInfoDto} from "./RoomTypeInfoDto";

export interface RoomTypeSummaryDto {
  roomTypeInfo: RoomTypeInfoDto;
  price_per_hotel_night: number;
  selected_rooms_cost: number;
  capacity: number;
}
