import {RoomTypeOpinionDto} from "./RoomTypeOpinionDto";

export interface AvailableRoomTypeDto {
  id: number;
  name: string;
  capacity: number;
  price_per_hotel_night: number;
  equipment_list: string[];
  image: string;
  opinion: RoomTypeOpinionDto;
  available: number;
}
