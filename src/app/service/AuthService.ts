import {Injectable} from '@angular/core';
import {ErrorDto} from '../dto/error/ErrorDto';
import {UserProfile} from "../model/user-profile/UserProfile";
import {ShoppingCartModel} from "../model/shopping-cart/ShoppingCartModel";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  public saveUserProfileDetailsResponseDtoInSessionStorage(jwt: string, userProfile: UserProfile): void {
    console.log('jwt: ' + jwt);
    sessionStorage.setItem('jwt', jwt);

    Object.entries(userProfile).forEach(([key, value]) => {
      console.log(key + ': ' + value);
      sessionStorage.setItem(key, value);
    });
  }

  public saveShoppingCartDetailsResponseDtoInSessionStorage(response: ShoppingCartModel) {
    console.log(response);
    response.userProfileId = Number.parseInt(sessionStorage.getItem("id") ?? "0");
    sessionStorage.setItem('shoppingCartModel', JSON.stringify(response));
  }

  public saveStripeTokenInSessionStorage(response: string) {
    console.log(response);
    sessionStorage.setItem('stripeToken', response);
  }

  public getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public logout(): void {
    sessionStorage.clear();
  }

  public onPageInit(pathOnSuccess: string | undefined, pathOnFailure: string | undefined): void {
    const token = this.getItem('jwt');
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      if (pathOnFailure) {
        this.navigateToPublicPage(pathOnFailure);
      }
    }

    if (pathOnSuccess) {
      this.navigateByRole(pathOnSuccess)
    }
  }

  public navigateByRole(path: string) {
    if (this.isUser()) {
      this.navigateToUserProfilePage(path);
    } else if (this.isAdmin()) {
      this.navigateToAdminProfilePage(path);
    } else {
      this.navigateToPublicPage(path)
    }
  }

  public isUser(): boolean {
    return this.getItem("role") === "USER";
  }

  public isAdmin(): boolean {
    return this.getItem("role") === "ADMIN";
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

  private navigateToPublicPage(path: string) {
    this.router.navigateByUrl(path);
  }

  private navigateToUserProfilePage(path: string): void {
    this.router.navigateByUrl("private/user/" + this.getItem("id") + path);
  }

  private navigateToAdminProfilePage(path: string): void {
    this.router.navigateByUrl("private/admin/" + this.getItem("id") + path);
  }
}
