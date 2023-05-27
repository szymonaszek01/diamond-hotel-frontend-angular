import {CostDto} from "./CostDto";
import {RoomTypeSummaryDto} from "./RoomTypeSummaryDto";

export interface ShoppingCartSummaryResponseDto {
  check_in: string;
  check_out: string;
  cost_summary: CostDto;
  room_type_summary: RoomTypeSummaryDto[];
}
