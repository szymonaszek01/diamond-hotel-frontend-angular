import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-common-toast',
  templateUrl: './common-toast-component.component.html',
  styleUrls: ['./common-toast-component.component.scss']
})
export class CommonToastComponentComponent {

  @Input()
  public message: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }
}
