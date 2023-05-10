import {UserProfile} from '../model/UserProfile';

export interface UserProfileDetailsResponseDto {
  jwt: string;

  userProfile: UserProfile;
}
