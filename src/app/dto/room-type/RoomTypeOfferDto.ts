import {RoomTypeOpinionDto} from "./RoomTypeOpinionDto";

export interface RoomTypeOfferDto {
  room_type_list: {
    id: number;
    name: string;
    capacity: number;
    price_per_hotel_night: number;
    equipment_list: string[];
    image: string;
    opinion: RoomTypeOpinionDto;
  }[];
}
