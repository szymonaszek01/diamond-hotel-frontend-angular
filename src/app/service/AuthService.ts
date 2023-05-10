import {Injectable} from '@angular/core';
import {UserProfileDetailsResponseDto} from '../dto/UserProfileDetailsResponseDto';
import {ErrorDto} from '../dto/ErrorDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public saveUserProfileDetailsResponseDtoInSessionStorage(loginResponseDto: UserProfileDetailsResponseDto): void {
    console.log('jwt: ' + loginResponseDto.jwt);
    sessionStorage.setItem('jwt', loginResponseDto.jwt);

    Object.entries(loginResponseDto.userProfile).forEach(([key, value]) => {
      console.log(key + ': ' + value);
      sessionStorage.setItem(key, value);
    });
  }

  public logout(): void {
    sessionStorage.clear();
  }

  public isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 < Date.now();
  }

  public isValidPassword(password: string): ErrorDto {
    if (!new RegExp('.{8,}').test(password)) {
      return {result: false, message: 'Your password must be between 8-15 characters'};
    }

    if (!new RegExp('(?=.*?[A-Z])').test(password)) {
      return {result: false, message: 'Your password must contain at least 1 capital letter'};
    }

    if (!new RegExp('(?=.*?[a-z])').test(password)) {
      return {result: false, message: 'Your password must contain at least 1 lowercase letter'};
    }

    if (!new RegExp('(?=.*?[0-9])').test(password)) {
      return {result: false, message: 'Your password must contain at least 1 number'};
    }

    if (!new RegExp('(?=.*[#$@!%&*?])').test(password)) {
      return {result: false, message: 'Your password must contain at least 1 special sign'};
    }

    return {result: true};
  }
}
