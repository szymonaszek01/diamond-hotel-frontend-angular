import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomTypeConfigurationResponseDto} from "../dto/RoomTypeConfigurationResponseDto";
import {AvailableRoomTypeListResponseDto} from "../dto/AvailableRoomTypeListResponseDto";
import {AvailableRoomTypeListRequestDto} from "../dto/AvailableRoomTypeListRequestDto";
import {AvailableRoomType} from "../model/AvailableRoomType";
import {AvailableRoomTypeDto} from "../dto/AvailableRoomTypeDto";

@Injectable({
  providedIn: 'root'
})

export class RoomTypeService {

  // URL_PRODUCTION
  private url = 'https://diamond-hotel-backend.onrender.com/api/v1/room-type';

  // URL_LOCALHOST
  // private url = 'http://localhost:5432/api/v1/room-type';

  constructor(private http: HttpClient) {
  }

  public getRoomTypeConfigurationInfo(): Observable<RoomTypeConfigurationResponseDto> {
    return this.http.get<RoomTypeConfigurationResponseDto>(this.url + '/configuration/info');
  }

  public getAvailableRoomTypeList(availableRoomTypeListRequestDto: AvailableRoomTypeListRequestDto): Observable<AvailableRoomTypeListResponseDto> {
    return this.http.post<AvailableRoomTypeListResponseDto>(this.url + '/available/info', availableRoomTypeListRequestDto);
  }

  public toAvailableRoomTypeMapper(response: AvailableRoomTypeDto): AvailableRoomType {
    return {
      roomType: {
        id: response.id,
        name: response.name,
        capacity: response.capacity,
        pricePerHotelNight: response.price_per_hotel_night,
        equipmentList: response.equipment_list,
        image: response.image
      },
      roomTypeOpinion: {
        amount: response.opinion.opinion_amount,
        rate: Number.parseFloat(response.opinion.opinion_summary_rate.toFixed(1)),
        text: response.opinion.opinion_summary_text
      },
      available: response.available
    };
  }
}
