import {Injectable} from '@angular/core';
import {LoginRequestDto} from '../dto/user-profile/LoginRequestDto';
import {Observable} from 'rxjs';
import {UserProfileDetailsResponseDto} from '../dto/user-profile/UserProfileDetailsResponseDto';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestDto} from '../dto/user-profile/RegisterRequestDto';
import {UserProfile} from "../model/user-profile/UserProfile";
import {UserProfileDto} from "../dto/user-profile/UserProfileDto";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  // URL_PRODUCTION
  private url = 'https://diamond-hotel-backend.onrender.com/api/v1/user-profile';

  // URL_LOCALHOST
  // private url = 'http://localhost:5432/api/v1/user-profile';

  constructor(private http: HttpClient) {
  }

  public login(loginRequestDto: LoginRequestDto): Observable<UserProfileDetailsResponseDto> {
    return this.http.post<UserProfileDetailsResponseDto>(this.url + '/login', loginRequestDto);
  }

  public register(registerRequestDto: RegisterRequestDto): Observable<UserProfileDetailsResponseDto> {
    return this.http.post<UserProfileDetailsResponseDto>(this.url + '/register', registerRequestDto);
  }

  public getUserProfileDetailsInfo(userProfileId: number): Observable<UserProfileDto> {
    return this.http.get<UserProfileDto>(this.url + '/id/' + userProfileId + '/details/info');
  }

  public getUserProfileInfoList(): Observable<UserProfileDto[]> {
    return this.http.get<UserProfileDto[]>(this.url + '/all/info');
  }

  public toUserProfileMapper(userProfileDto: UserProfileDto): UserProfile {
    return {
      id: userProfileDto.id,
      email: userProfileDto.email,
      firstname: userProfileDto.firstname,
      lastname: userProfileDto.lastname,
      age: userProfileDto.age,
      country: userProfileDto.country,
      passportNumber: userProfileDto.passport_number,
      phoneNumber: userProfileDto.phone_number,
      city: userProfileDto.city,
      street: userProfileDto.street,
      postalCode: userProfileDto.postal_code,
      role: userProfileDto.role
    };
  }
}
