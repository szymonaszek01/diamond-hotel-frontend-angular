import {RoomTypeSummaryInfo} from "./RoomTypeSummaryInfo";

export interface ShoppingCartModel {
  checkIn: string;
  checkOut: string;
  totalWithoutTax: number;
  carRentCost: number;
  carPickUpCost: number;
  tax: number;
  roomTypeSummaryInfo: RoomTypeSummaryInfo[]
}
