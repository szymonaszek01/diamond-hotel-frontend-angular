import {Component, Input} from '@angular/core';
import {Table} from "../../../model/common/Table";
import {Row} from "../../../model/common/Row";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/AuthService";

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent {

  @Input()
  table: Table = {} as Table;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public onRowClicked(row: Row) {
    this.authService.navigateByRole(this.table.detailsBaseLink + row.id + '/details/info');
  }
}
