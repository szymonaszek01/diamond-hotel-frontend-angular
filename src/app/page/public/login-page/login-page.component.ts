import {Component, OnInit} from '@angular/core';
import {LoginRequestDto} from '../../../dto/LoginRequestDto';
import {UserProfileService} from '../../../service/UserProfileService';
import {AuthService} from '../../../service/AuthService';
import {Router} from '@angular/router';
import {ErrorDto} from '../../../dto/ErrorDto';
import {UserProfileDetailsResponseDto} from "../../../dto/UserProfileDetailsResponseDto";

@Component({
  selector: 'app-login-page', templateUrl: './login-page.component.html', styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginRequestDto: LoginRequestDto = {} as LoginRequestDto;

  errorDto: ErrorDto = {} as ErrorDto;

  isUsernameIconHidden: boolean = true;

  isPadlockIconHidden: boolean = true;

  busy: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userProfileService: UserProfileService) {
    this.errorDto.result = true;
  }

  ngOnInit(): void {
    const token = this.authService.getItem('jwt');
    if (token) {
      if (this.authService.isTokenExpired(token)) {
        this.authService.logout();
        this.router.navigateByUrl('login-page');
      } else {
        this.router.navigateByUrl('private/user/dashboard-page').then(() => window.location.reload());
      }
    }
  }

  public async login(): Promise<void> {
    this.busy = true;

    this.errorDto = this.authService.isValidPassword(this.loginRequestDto.password);
    if (!this.errorDto.result) {
      this.busy = false;
      return;
    }

    this.userProfileService.login(this.loginRequestDto).subscribe(response => this.onResponse(response), () => {
      this.busy = false;
      this.errorDto.result = false;
      this.errorDto.message = 'Incorrect email or password';
    });
  }

  public toggleUsernameIconVisibility(): void {
    this.errorDto.result = true;
    const inputEmail = document.getElementById('email') as HTMLInputElement;
    this.isUsernameIconHidden = !this.isUsernameIconHidden && inputEmail.value.length === 0;
  }

  public togglePadlockIconVisibility(): void {
    this.errorDto.result = true;
    const inputPassword = document.getElementById('password') as HTMLInputElement;
    this.isPadlockIconHidden = !this.isPadlockIconHidden && inputPassword.value.length === 0;
  }

  private onResponse(response: UserProfileDetailsResponseDto): void {
    this.busy = false;
    this.errorDto.result = true;
    this.authService.saveUserProfileDetailsResponseDtoInSessionStorage(response.jwt, this.userProfileService.toUserProfileMapper(response));
    this.router.navigateByUrl('private/user/dashboard-page');
  }
}
