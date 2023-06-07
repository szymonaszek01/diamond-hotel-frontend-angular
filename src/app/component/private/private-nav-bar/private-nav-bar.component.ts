import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/AuthService';

@Component({
  selector: 'app-private-nav-bar',
  templateUrl: './private-nav-bar.component.html',
  styleUrls: ['./private-nav-bar.component.scss']
})
export class PrivateNavBarComponent implements OnInit {

  isMenuOpen: boolean;

  email: string;

  homeLink: string;

  accountLink: string;

  reservationLink: string;

  userProfilesLink: string;

  constructor(private authService: AuthService) {
    this.authService.onPageInit(undefined, "/login-page");

    this.homeLink = '/dashboard-page';
    this.accountLink = '/details/info';
    this.reservationLink = '/reservation/new/step/first';
    this.userProfilesLink = '/user-profile/all';

    this.email = sessionStorage.getItem('email') ?? '';
    this.isMenuOpen = true;
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public routerGo(path: string): void {
    this.authService.navigateByRole(path);
  }

  public isUser(): boolean {
    return this.authService.isUser();
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public async signOut(): Promise<void> {
    this.authService.logout();
    this.authService.navigateByRole("/");
    await new Promise(f => setTimeout(f, 100));
    window.location.reload();
  }
}
