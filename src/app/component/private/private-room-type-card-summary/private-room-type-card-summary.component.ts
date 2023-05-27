import {Component, Input} from '@angular/core';
import {RoomTypeSummaryInfo} from "../../../model/shopping-cart/RoomTypeSummaryInfo";

@Component({
  selector: 'app-private-room-type-card-summary',
  templateUrl: './private-room-type-card-summary.component.html',
  styleUrls: ['./private-room-type-card-summary.component.scss']
})
export class PrivateRoomTypeCardSummaryComponent {

  @Input()
  public roomTypeSummaryInfo: RoomTypeSummaryInfo = {} as RoomTypeSummaryInfo;

  constructor() {
  }

  ngOnInit(): void {
  }
}
