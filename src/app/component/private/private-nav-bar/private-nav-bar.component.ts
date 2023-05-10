import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-private-nav-bar',
  templateUrl: './private-nav-bar.component.html',
  styleUrls: ['./private-nav-bar.component.scss']
})
export class PrivateNavBarComponent implements OnInit {

  isMenuOpen: boolean;

  email: string;

  constructor(private router: Router, private authService: AuthService) {
    const token = sessionStorage.getItem('jwt');
    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigateByUrl('login-page');
    }

    this.email = sessionStorage.getItem('email') ?? '';
    this.isMenuOpen = true;
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public async signOut(): Promise<void> {
    this.authService.logout();
    await this.router.navigateByUrl('/');
    await new Promise(f => setTimeout(f, 100));
    window.location.reload();
  }
}
