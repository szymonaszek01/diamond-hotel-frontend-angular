import {Component} from '@angular/core';
import {ErrorDto} from "../../../../dto/error/ErrorDto";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {Detail} from "../../../../model/common/Detail";
import {UserProfileService} from "../../../../service/UserProfileService";
import {UserProfile} from "../../../../model/user-profile/UserProfile";

@Component({
  selector: 'app-user-profile-details-page',
  templateUrl: './user-profile-details-page.component.html',
  styleUrls: ['./user-profile-details-page.component.scss']
})
export class UserProfileDetailsPageComponent {

  busy: boolean = false;

  userProfileDetails: UserProfile = {} as UserProfile;

  errorDto: ErrorDto = {} as ErrorDto;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.busy = true;
    this.authService.onPageInit(undefined, "/login-page");

    this.errorDto.result = true;
    this.errorDto.message = "";
    let userProfileId: number = Number.parseInt(this.authService.getItem("id") ?? "0");
    this.activatedRoute.params.subscribe(params => {
      if (params["user-profile-id"] && this.authService.isAdmin()) {
        userProfileId = params["user-profile-id"];
      }
    });

    this.getUserProfileDetails(userProfileId);
  }

  private async getUserProfileDetails(userProfileId: number) {
    this.userProfileService.getUserProfileDetailsInfo(userProfileId).subscribe(response => {
      this.userProfileDetails = this.userProfileService.toUserProfileMapper(response);
      this.errorDto.result = true;
      this.busy = false;
    }, () => {
      this.errorDto.result = false;
      this.errorDto.message = "User profile not found";
      this.busy = false;
    });
  }

  public createAccountDetailList(): Detail[] {
    return [
      {
        label: "Email",
        value: this.userProfileDetails.email,
        visibility: true
      },
      {
        label: "Role",
        value: this.userProfileDetails.role,
        visibility: true
      }
    ];
  }

  public createPersonalDetailList(): Detail[] {
    return [
      {
        label: "Firstname",
        value: this.userProfileDetails.firstname,
        visibility: true
      },
      {
        label: "Lastname",
        value: this.userProfileDetails.lastname,
        visibility: true
      },
      {
        label: "Age",
        value: this.userProfileDetails.age.toString(),
        visibility: true
      },
      {
        label: "Phone number",
        value: this.userProfileDetails.phoneNumber,
        visibility: true
      },
      {
        label: "Passport number",
        value: this.userProfileDetails.passportNumber,
        visibility: true
      }
    ];
  }

  public createResidenceDetailList(): Detail[] {
    return [
      {
        label: "City",
        value: this.userProfileDetails.city,
        visibility: true
      },
      {
        label: "Street",
        value: this.userProfileDetails.street,
        visibility: true
      },
      {
        label: "Postal code",
        value: this.userProfileDetails.postalCode,
        visibility: true
      },
      {
        label: "Country",
        value: this.userProfileDetails.country,
        visibility: true
      }
    ];
  }
}
