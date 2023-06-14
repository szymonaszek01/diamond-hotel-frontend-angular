import {Component} from '@angular/core';
import {RoomTypeService} from "../../../service/RoomTypeService";
import {RoomTypeOfferDto} from "../../../dto/room-type/RoomTypeOfferDto";

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss']
})
export class OfferPageComponent {

  busy: boolean = false;

  roomTypeOfferDto: RoomTypeOfferDto = {} as RoomTypeOfferDto;

  index: number = 0;

  constructor(private roomTypeService: RoomTypeService) {
  }

  ngOnInit(): void {
    this.getRoomTypeInfoList();
  }

  public onArrowRightClick(): void {
    if (this.index < this.roomTypeOfferDto.room_type_list.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  public onArrowLeftClick(): void {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.roomTypeOfferDto.room_type_list.length - 1;
    }
  }

  private async getRoomTypeInfoList() {
    this.busy = true;
    this.roomTypeService.getRoomTypeInfoList().subscribe(response => {
      this.roomTypeOfferDto = response;
      this.busy = false;
    }, () => {
      this.busy = false;
    });
  }
}
