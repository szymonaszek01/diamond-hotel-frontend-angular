import {RoomTypeOpinionDto} from "../room-type/RoomTypeOpinionDto";

export interface UserReservationDetailsInfoResponseDto {
  check_in: string;
  check_out: string;
  room_cost: number;
  flight_number: string;
  room_type: {
    id: number;
    name: string;
    capacity: number;
    price_per_hotel_night: number;
    equipment_list: string[];
    image: string;
    opinion: RoomTypeOpinionDto;
  };
  room: {
    room_number: number;
    floor: number;
  };
  transaction: {
    code: string;
    total_without_tax: number;
    tax: number;
    car_rent: number;
    car_pick_up: number;
    status: string;
  };
}
