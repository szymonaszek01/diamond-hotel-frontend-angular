export interface AvailableRoomTypeListRequestDto {
  check_in: string;

  check_out: string;

  room_type_name: string | undefined;

  capacity: string | undefined;
}
