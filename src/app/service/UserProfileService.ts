import {Injectable} from '@angular/core';
import {LoginRequestDto} from '../dto/LoginRequestDto';
import {Observable} from 'rxjs';
import {UserProfileDetailsResponseDto} from '../dto/UserProfileDetailsResponseDto';
import {HttpClient} from '@angular/common/http';
import {RegisterRequestDto} from '../dto/RegisterRequestDto';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  private url = 'http://localhost:5432/api/v1/user-profile';

  constructor(private http: HttpClient) {
  }

  login(loginRequestDto: LoginRequestDto): Observable<UserProfileDetailsResponseDto> {
    return this.http.post<UserProfileDetailsResponseDto>(this.url + '/login', loginRequestDto);
  }

  register(registerRequestDto: RegisterRequestDto): Observable<UserProfileDetailsResponseDto> {
    return this.http.post<UserProfileDetailsResponseDto>(this.url + '/register', registerRequestDto);
  }

}
