import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomTypeConfigurationResponseDto} from "../dto/room-type/RoomTypeConfigurationResponseDto";
import {AvailableRoomTypeListResponseDto} from "../dto/room-type/AvailableRoomTypeListResponseDto";
import {AvailableRoomTypeListRequestDto} from "../dto/room-type/AvailableRoomTypeListRequestDto";
import {AvailableRoomType} from "../model/room-type/AvailableRoomType";
import {AvailableRoomTypeDto} from "../dto/room-type/AvailableRoomTypeDto";
import {ShoppingCartSummaryRequestDto} from "../dto/shopping-cart/ShoppingCartSummaryRequestDto";
import {ShoppingCartSummaryResponseDto} from "../dto/shopping-cart/ShoppingCartSummaryResponseDto";
import {ShoppingCartModel} from "../model/shopping-cart/ShoppingCartModel";
import {RoomTypeCardData} from "../model/room-type/RoomTypeCardData";
import {CarDto} from "../dto/shopping-cart/CarDto";
import {CostDto} from "../dto/shopping-cart/CostDto";

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

  public getShoppingCartSummary(shoppingCartSummaryRequestDto: ShoppingCartSummaryRequestDto): Observable<ShoppingCartSummaryResponseDto> {
    return this.http.post<ShoppingCartSummaryResponseDto>(this.url + '/summary/shopping/cart', shoppingCartSummaryRequestDto);
  }

  public getShoppingCartSummaryCostWithCar(carDto: CarDto): Observable<CostDto> {
    return this.http.post<CostDto>(this.url + '/summary/shopping/cart/cost/with/car', carDto);
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

  public toShoppingCartSummaryRequestDtoMapper(checkIn: string, checkOut: string, roomTypeCardDataList: RoomTypeCardData[],
                                               carRentOption: boolean, carPickUpOption: boolean, flightNumber?: string): ShoppingCartSummaryRequestDto {
    return {
      check_in: checkIn,
      check_out: checkOut,
      flight_number: flightNumber,
      car_pick_up_option: carPickUpOption,
      car_rent_option: carRentOption,
      room_type_info: roomTypeCardDataList.map(roomTypeCardData => {
        return {
          room_type_name: roomTypeCardData.roomTypeName,
          selected_rooms: roomTypeCardData.amount
        }
      })
    };
  }

  public toShoppingCartModelMapper(response: ShoppingCartSummaryResponseDto): ShoppingCartModel {
    return {
      checkIn: response.check_in,
      checkOut: response.check_out,
      totalWithoutTax: response.cost_summary.total_without_tax,
      carRentCost: response.cost_summary.car_rent,
      carPickUpCost: response.cost_summary.car_pick_up,
      tax: response.cost_summary.tax,
      roomTypeSummaryInfo: response.room_type_summary.map(roomTypeSummary => {
        return {
          roomTypeCardData: {
            roomTypeName: roomTypeSummary.roomTypeInfo.room_type_name,
            amount: roomTypeSummary.roomTypeInfo.selected_rooms
          },
          pricePerHotelNight: roomTypeSummary.price_per_hotel_night,
          selectedRoomsCost: roomTypeSummary.selected_rooms_cost,
          capacity: roomTypeSummary.capacity
        }
      })
    };
  }
}
