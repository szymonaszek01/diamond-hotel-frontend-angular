import {HttpClient} from "@angular/common/http";

export class RoomTypeService {

  // URL_PRODUCTION
  // private url = 'https://diamond-hotel-backend.onrender.com/api/v1/reservation';

  // URL_LOCALHOST
  private url = 'http://localhost:5432/api/v1/reservation';

  constructor(private http: HttpClient) {
  }
}
