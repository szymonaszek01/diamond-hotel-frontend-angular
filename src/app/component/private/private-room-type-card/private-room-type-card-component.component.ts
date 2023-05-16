import {Component, Input} from '@angular/core';
import {AvailableRoomType} from "../../../model/AvailableRoomType";

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

  public selectedRooms: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onButtonPlus(): void {
    this.selectedRooms = this.selectedRooms + 1;
  }

  public onButtonMinus(): void {
    if (this.selectedRooms - 1 >= 0) {
      this.selectedRooms = this.selectedRooms - 1;
    }
  }
}
