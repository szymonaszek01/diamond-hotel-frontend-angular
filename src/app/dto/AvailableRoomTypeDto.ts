export interface AvailableRoomTypeDto {
  id: number

  name: string;

  capacity: number;

  price_per_hotel_night: number;

  equipment_list: string[];

  image: string;

  opinion: {
    opinion_amount: number;

    opinion_summary_rate: number;

    opinion_summary_text: string;
  }

  available: number;
}
