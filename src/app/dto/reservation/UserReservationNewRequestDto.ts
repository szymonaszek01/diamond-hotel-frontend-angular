import {RoomTypeInfoDto} from "../shopping-cart/RoomTypeInfoDto";
import {CostDto} from "../shopping-cart/CostDto";

export interface UserReservationNewRequestDto {
  user_profile_id: number;
  check_in: string;
  check_out: string;
  room_type_info: RoomTypeInfoDto[];
  flight_number: string;
  cost: CostDto;
}
