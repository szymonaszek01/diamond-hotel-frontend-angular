import {Component} from '@angular/core';
import {Table} from "../../../../model/common/Table";
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/AuthService";
import {UserProfileService} from "../../../../service/UserProfileService";
import {UserProfile} from "../../../../model/user-profile/UserProfile";
import {Row} from "../../../../model/common/Row";

@Component({
  selector: 'app-user-profile-all-page',
  templateUrl: './user-profile-all-page.component.html',
  styleUrls: ['./user-profile-all-page.component.scss']
})
export class UserProfileAllPageComponent {

  busy: boolean = false;

  tableData: Table = {} as Table;

  userProfileList: UserProfile[] = [];

  constructor(private router: Router, private authService: AuthService, private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.authService.onPageInit(undefined, "/login-page");
    this.busy = true;
    this.getUserProfileInfoList();
  }

  public filterUserProfileListByValue(value: string): void {
    if (value.length < 1) {
      this.tableData.rowList = this.initTable().rowList;
      return;
    }

    this.tableData.rowList = this.initTable().rowList.filter(row => {
      return row.cellList.filter(cell => cell.toUpperCase().includes(value.toUpperCase())).length > 0;
    });
  }

  private initTable(): Table {
    return {
      detailsBaseLink: "/user-profile/",
      headerList: ["No", "Email", "Firstname", "Lastname", "Age", "Phone number", "Passport number", "Country"],
      rowList: this.toRowListMapper()
    };
  }

  private toRowListMapper(): Row[] {
    let counter: number = 1;
    let rowList: Row[] = [];
    this.userProfileList.forEach(userProfile => {
      let cellList: string[] = [
        userProfile.email,
        userProfile.firstname,
        userProfile.lastname,
        userProfile.age.toString(),
        userProfile.phoneNumber,
        userProfile.passportNumber,
        userProfile.country
      ];

      rowList.push({
        id: userProfile.id,
        no: counter,
        cellList: cellList
      });
      counter++;
    });
    return rowList;
  }

  private async getUserProfileInfoList() {
    this.userProfileService.getUserProfileInfoList().subscribe(response => {
      response.forEach(userProfileDto => this.userProfileList.push(this.userProfileService.toUserProfileMapper(userProfileDto)));
      this.tableData = this.initTable();
      this.busy = false;
    }, () => this.busy = false);
  }
}
