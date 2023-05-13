export interface UserProfileDetailsResponseDto {
  jwt: string;

  user_profile: { id: number; email: string; firstname: string; lastname: string; age: number; country: string;
    passport_number: string; phone_number: string; city: string; street: string; postal_code: string; role: string; };
}
