import {UserProfileDto} from "./UserProfileDto";

export interface UserProfileDetailsResponseDto {
  jwt: string;
  user_profile: UserProfileDto;
}
