import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-common-loading-data-window',
  templateUrl: './common-loading-data-window-componnet.component.html',
  styleUrls: ['./common-loading-data-window-componnet.component.scss']
})
export class CommonLoadingDataWindowComponnetComponent {

  @Input()
  message: string = "";

  @Input()
  visibility: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
