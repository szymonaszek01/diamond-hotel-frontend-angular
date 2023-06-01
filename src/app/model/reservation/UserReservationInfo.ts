export interface UserReservationInfo {
  id: number;
  transactionCode: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  capacity: number;
  roomCost: number;
}
