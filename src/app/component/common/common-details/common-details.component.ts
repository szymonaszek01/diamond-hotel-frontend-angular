import {Component, Input} from '@angular/core';
import {Detail} from "../../../model/common/Detail";
import {Router} from "@angular/router";

@Component({
  selector: 'app-common-details',
  templateUrl: './common-details.component.html',
  styleUrls: ['./common-details.component.scss']
})
export class CommonDetailsComponent {

  @Input()
  title: string = "";

  @Input()
  detailList: Detail[] = {} as Detail[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onRowClick(): void {
    this.router.navigateByUrl("");
  }
}
