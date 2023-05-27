import {Injectable} from '@angular/core';
import {LoginRequestDto} from '../dto/auth/LoginRequestDto';
import {Observable} from 'rxjs';
import {UserProfileDetailsResponseDto} from '../dto/auth/UserProfileDetailsResponseDto';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestDto} from '../dto/auth/RegisterRequestDto';
import {UserProfile} from "../model/auth/UserProfile";

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  // URL_PRODUCTION
  // private url = 'https://diamond-hotel-backend.onrender.com/api/v1/user-profile';

  // URL_LOCALHOST
  private url = 'http://localhost:5432/api/v1/user-profile';

  constructor(private http: HttpClient) {
  }

  public login(loginRequestDto: LoginRequestDto): Observable<UserProfileDetailsResponseDto> {
    return this.http.post<UserProfileDetailsResponseDto>(this.url + '/login', loginRequestDto);
  }

  public register(registerRequestDto: RegisterRequestDto): Observable<UserProfileDetailsResponseDto> {
    return this.http.post<UserProfileDetailsResponseDto>(this.url + '/register', registerRequestDto);
  }

  public toUserProfileMapper(response: UserProfileDetailsResponseDto): UserProfile {
    return {
      id: response.user_profile.id,
      email: response.user_profile.email,
      firstname: response.user_profile.firstname,
      lastname: response.user_profile.lastname,
      age: response.user_profile.age,
      country: response.user_profile.country,
      passportNumber: response.user_profile.passport_number,
      phoneNumber: response.user_profile.phone_number,
      city: response.user_profile.city,
      street: response.user_profile.street,
      postalCode: response.user_profile.postal_code,
      role: response.user_profile.role
    };
  }
}
