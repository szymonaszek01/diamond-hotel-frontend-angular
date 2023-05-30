import {AvailableRoomTypeListRequestDto} from "../room-type/AvailableRoomTypeListRequestDto";

export interface UserReservationAllRequestDto extends AvailableRoomTypeListRequestDto {
  user_profile_id: number;
}
