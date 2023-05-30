import {Injectable} from "@angular/core";
import {RoomTypeService} from "../service/RoomTypeService";
import {FilterModel} from "../model/room-type/FilterModel";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeConfigurationUtil {

  constructor(private roomTypeService: RoomTypeService) {
  }

  public getRoomTypeConfigurationInfo(): Promise<FilterModel> {
    return new Promise<FilterModel>((resolve, reject) => {
      let filterModel: FilterModel = {
        numberOfPeopleList: ["Any"],
        roomTypeList: ["Any"],
        errorDto: {
          result: true,
          message: ""
        }
      };

      this.roomTypeService.getRoomTypeConfigurationInfo().subscribe(response => {
        response.capacity_list.forEach(capacity => filterModel.numberOfPeopleList.push(capacity));
        response.room_type_list.forEach(room_type => filterModel.roomTypeList.push(room_type));
        resolve(filterModel);
      }, () => reject(filterModel));
    });
  }
}
