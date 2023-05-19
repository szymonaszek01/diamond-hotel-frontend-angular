import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AvailableRoomType} from "../../../model/AvailableRoomType";
import {RoomTypeCardData} from "../../../model/RoomTypeCardData";

@Component({
  selector: 'app-private-room-type-card',
  templateUrl: './private-room-type-card-component.component.html',
  styleUrls: ['./private-room-type-card-component.component.scss']
})
export class PrivateRoomTypeCardComponentComponent {

  @Input()
  public availableRoomType: AvailableRoomType = {
    roomType: {
      id: 0,
      name: "",
      capacity: 0,
      pricePerHotelNight: 0,
      equipmentList: [],
      image: ""
    },
    roomTypeOpinion: {
      amount: 0,
      rate: 0,
      text: ""
    },
    available: 0
  };

  @Output()
  public cardChanged = new EventEmitter<RoomTypeCardData>();

  selectedRoomAmount: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onButtonPlus(): void {
    if (this.availableRoomType.available < 1) {
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
    if (this.selectedRoomAmount < 1) {
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
