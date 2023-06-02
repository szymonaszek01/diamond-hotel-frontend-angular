import {Component, Input} from '@angular/core';
import {Table} from "../../../model/common/Table";
import {Row} from "../../../model/common/Row";
import {Router} from "@angular/router";

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent {

  @Input()
  table: Table = {} as Table;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onRowClicked(row: Row) {
    this.router.navigateByUrl('/private/user/reservation/' + row.id + '/details/info');
  }
}
