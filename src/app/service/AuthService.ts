import {Injectable} from '@angular/core';
import {ErrorDto} from '../dto/ErrorDto';
import {UserProfile} from "../model/UserProfile";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public saveUserProfileDetailsResponseDtoInSessionStorage(jwt: string, userProfile: UserProfile): void {
    console.log('jwt: ' + jwt);
    sessionStorage.setItem('jwt', jwt);

    Object.entries(userProfile).forEach(([key, value]) => {
      console.log(key + ': ' + value);
      sessionStorage.setItem(key, value);
    });
  }

  public getItem(key: string) {
    return sessionStorage.getItem(key);
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
