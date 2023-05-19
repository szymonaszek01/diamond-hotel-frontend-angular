import {Component, OnInit} from '@angular/core';
import {RegisterRequestDto} from '../../../../dto/RegisterRequestDto';
import {ErrorDto} from '../../../../dto/ErrorDto';
import {Router} from '@angular/router';
import {AuthService} from '../../../../service/AuthService';
import {UserProfileService} from '../../../../service/UserProfileService';
import {UserProfileDetailsResponseDto} from "../../../../dto/UserProfileDetailsResponseDto";

@Component({
  selector: 'app-signup-page', templateUrl: './signup-page.component.html', styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  registerRequestDto: RegisterRequestDto = {} as RegisterRequestDto;

  errorDto: ErrorDto = {} as ErrorDto;

  isUsernameIconHidden: boolean = true;

  isNewPasswordPadlockIconHidden: boolean = true;

  isRepeatedNewPasswordPadlockIconHidden: boolean = true;

  isButtonSubmitVisible: boolean = false;

  isButtonPreviousVisible: boolean = false;

  isButtonNextVisible: boolean = true;

  step: number = 0;

  busy: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userProfileService: UserProfileService) {
    this.errorDto.result = true;
  }

  ngOnInit(): void {
  }

  public nextStep(): void {
    switch (this.step) {
      case 2:
        this.stepTwo();
        break;
      case 1:
        this.stepOne();
        break;
      default:
        this.stepZero();
    }

    if (this.errorDto.result) {
      this.step++;
    }
  }

  public previousStep(): void {
    if (this.step > 0) {
      this.step--;
      this.errorDto.result = true;
    }

    if (this.step === 0) {
      this.isButtonPreviousVisible = false;
      this.isButtonSubmitVisible = false;
    }

    if (this.step === 1 || this.step === 2) {
      this.isButtonPreviousVisible = true;
      this.isButtonNextVisible = true;
      this.isButtonSubmitVisible = false;
    }
  }

  public toggleUsernameIconVisibility(): void {
    this.errorDto.result = true;
    const inputEmail = document.getElementById('email') as HTMLInputElement;
    this.isUsernameIconHidden = !this.isUsernameIconHidden && inputEmail.value.length === 0;
  }

  public toggleNewPasswordPadlockIconVisibility(): void {
    this.errorDto.result = true;
    const inputNewPassword = document.getElementById('new-password') as HTMLInputElement;
    this.isNewPasswordPadlockIconHidden = !this.isNewPasswordPadlockIconHidden && inputNewPassword.value.length === 0;
  }

  public toggleRepeatedNewPasswordPadlockIconVisibility(): void {
    this.errorDto.result = true;
    const inputRepeatedNewPassword = document.getElementById('repeated-new-password') as HTMLInputElement;
    this.isRepeatedNewPasswordPadlockIconHidden = !this.isRepeatedNewPasswordPadlockIconHidden
      && inputRepeatedNewPassword.value.length === 0;
  }

  private stepZero(): void {
    if (!this.registerRequestDto.email || !this.registerRequestDto.password || !this.registerRequestDto.repeated_password) {
      this.errorDto.result = false;
      this.errorDto.message = 'You must input all values';
      return;
    }

    if (!this.errorDto.result || this.registerRequestDto.password !== this.registerRequestDto.repeated_password) {
      this.errorDto.result = false;
      this.errorDto.message = 'Password is not equaled repeated password';
      return;
    }

    this.errorDto = this.authService.isValidPassword(this.registerRequestDto.password);
    this.isButtonPreviousVisible = true;
  }

  private stepOne(): void {
    if (!this.registerRequestDto.firstname || !this.registerRequestDto.lastname || !this.registerRequestDto.age) {
      this.errorDto.result = false;
      this.errorDto.message = 'You must input all values';
      return;
    }

    if (this.registerRequestDto.age < 18) {
      this.errorDto.result = false;
      this.errorDto.message = 'You are not an adult';
      return;
    }

    this.errorDto.result = true;
  }

  private stepTwo(): void {
    if (!this.registerRequestDto.country || !this.registerRequestDto.passport_number || !this.registerRequestDto.phone_number) {
      this.errorDto.result = false;
      this.errorDto.message = 'You must input all values';
      return;
    }

    this.errorDto.result = true;
    this.isButtonNextVisible = false;
    this.isButtonSubmitVisible = true;
  }

  public register() {
    this.busy = true;

    if (!this.registerRequestDto.city || !this.registerRequestDto.street || !this.registerRequestDto.postal_code) {
      this.busy = false;
      this.errorDto.result = false;
      this.errorDto.message = 'You must input all values';
      return;
    }

    this.isButtonSubmitVisible = false;
    this.userProfileService.register(this.registerRequestDto).subscribe(response => this.onResponse(response), () => {
      this.busy = false;
      this.errorDto.result = false;
      this.errorDto.message = 'User with this email or password exists';
      this.step = 0;
      this.isButtonPreviousVisible = false;
      this.isButtonNextVisible = true;
    });
  }

  private onResponse(response: UserProfileDetailsResponseDto): void {
    this.busy = false;
    this.errorDto.result = true;
    this.authService.saveUserProfileDetailsResponseDtoInSessionStorage(response.jwt, this.userProfileService.toUserProfileMapper(response));
    this.router.navigateByUrl('private/user/dashboard-page');
  }
}
