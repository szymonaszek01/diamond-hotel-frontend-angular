import {RoomTypeSummaryInfo} from "./RoomTypeSummaryInfo";

export interface ShoppingCartModel {
  userProfileId: number;
  checkIn: string;
  checkOut: string;
  totalWithoutTax: number;
  flightNumber: string;
  carRentCost: number;
  carPickUpCost: number;
  tax: number;
  roomTypeSummaryInfo: RoomTypeSummaryInfo[]
}
