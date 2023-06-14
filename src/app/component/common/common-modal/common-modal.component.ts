import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent {

  @Input()
  public active: boolean = false;

  @Input()
  public title: string = "";

  @Input()
  public body: string = "";

  @Output()
  public result: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onButtonYesClick(): void {
    this.result.emit("Yes");
  }

  onButtonNoClick(): void {
    this.result.emit("No");
  }
}
