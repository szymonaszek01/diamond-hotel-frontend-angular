import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";

@Component({
  selector: 'app-user-reservation-new-step-first-page',
  templateUrl: './user-reservation-new-step-first-page.component.html',
  styleUrls: ['./user-reservation-new-step-first-page.component.scss']
})
export class UserReservationNewStepFirstPageComponent {

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
