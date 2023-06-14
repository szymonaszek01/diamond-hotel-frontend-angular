import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AvailableRoomType} from "../../../model/room-type/AvailableRoomType";
import {RoomTypeCardData} from "../../../model/room-type/RoomTypeCardData";

@Component({
  selector: 'app-private-room-type-card',
  templateUrl: './private-room-type-card-component.component.html',
  styleUrls: ['./private-room-type-card-component.component.scss']
})
export class PrivateRoomTypeCardComponentComponent {

  @Input()
  public availableRoomType: AvailableRoomType = {} as AvailableRoomType;

  @Input()
  public readonly: boolean = true;

  @Output()
  public cardChanged = new EventEmitter<RoomTypeCardData>();

  selectedRoomAmount: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onButtonPlus(): void {
    if (!this.availableRoomType.available || this.availableRoomType.available < 1) {
      return;
    }

    this.selectedRoomAmount = this.selectedRoomAmount + 1;
    this.availableRoomType.available -= 1;
    this.cardChanged.emit({
      roomTypeName: this.availableRoomType.roomType.name,
      amount: 1
    });
  }

  public onButtonMinus(): void {
    if (!this.availableRoomType.available || this.selectedRoomAmount < 1) {
      return;
    }

    this.selectedRoomAmount = this.selectedRoomAmount - 1;
    this.availableRoomType.available += 1;
    this.cardChanged.emit({
      roomTypeName: this.availableRoomType.roomType.name,
      amount: -1
    });
  }
}
