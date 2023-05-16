import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {AvailableRoomType} from "../../../../model/AvailableRoomType";

@Component({
  selector: 'app-user-reservation-new-step-first-page',
  templateUrl: './user-reservation-new-step-first-page.component.html',
  styleUrls: ['./user-reservation-new-step-first-page.component.scss']
})
export class UserReservationNewStepFirstPageComponent {

  public roomTypeList: string[] = ['Deluxe Suite', 'Family Room', 'Standard Double Room'];

  public numberOfPeopleList: string[] = ['2', '4'];

  public availableRoomTypeList: AvailableRoomType[] = [
    {
      roomType: {
        id: 1,
        name: "Deluxe Suite",
        capacity: 2,
        pricePerHotelNight: 123,
        equipmentList: ["King size bed", "Sofa bed", "Coffee maker", "Minibar", "Balcony"],
        image: "https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906"
      },
      roomTypeOpinion: {
        amount: 15,
        rate: 7.8,
        text: "Good"
      },
      available: 4
    },
    {
      roomType: {
        id: 1,
        name: "Deluxe Suite",
        capacity: 2,
        pricePerHotelNight: 123,
        equipmentList: ["King size bed", "Sofa bed", "Coffee maker", "Minibar", "Balcony"],
        image: "https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906"
      },
      roomTypeOpinion: {
        amount: 15,
        rate: 7.8,
        text: "Good"
      },
      available: 4
    },
    {
      roomType: {
        id: 1,
        name: "Deluxe Suite",
        capacity: 2,
        pricePerHotelNight: 123,
        equipmentList: ["King size bed", "Sofa bed", "Coffee maker", "Minibar", "Balcony"],
        image: "https://publish.purewow.net/wp-content/uploads/sites/2/2019/08/grand-velas.jpeg?fit=1360%2C906"
      },
      roomTypeOpinion: {
        amount: 15,
        rate: 7.8,
        text: "Good"
      },
      available: 4
    }
  ];

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    const token = this.authService.getItem('jwt');
    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    }
  }

}
