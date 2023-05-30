export interface UserReservationAllResponseDto {

  user_profile_id: number;
  reservation_list: {
    id: number;
    code: string;
    room_type_name: string;
    check_in: string;
    check_out: string;
    capacity: number;
    cost: number;
  }[];
}
