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
    this.authService.onPageInit(undefined, "/login-page")

    this.reservationsLink = '/reservation/all';
    this.accountLink = '/details/info';
  }
}
