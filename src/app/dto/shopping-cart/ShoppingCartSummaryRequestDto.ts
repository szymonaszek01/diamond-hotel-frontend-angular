import {RoomTypeInfoDto} from "./RoomTypeInfoDto";

export interface ShoppingCartSummaryRequestDto {
  check_in: string;
  check_out: string;
  flight_number: string | undefined;
  car_pick_up_option: boolean;
  car_rent_option: boolean;
  room_type_info: RoomTypeInfoDto[];
}
