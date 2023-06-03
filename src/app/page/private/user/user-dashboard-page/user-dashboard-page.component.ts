import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../service/AuthService';

@Component({
  selector: 'app-user-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss']
})
export class UserDashboardPageComponent implements OnInit {

  reservationsLink: string = '';

  accountLink: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('jwt');
    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    }

    this.reservationsLink = '/private/user/' + this.authService.getItem("id") + '/reservation/all';
    this.accountLink = '/private/user/' + this.authService.getItem("id") + '/details/info';
  }

}
