import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-common-input-search',
  templateUrl: './common-input-search-component.component.html',
  styleUrls: ['./common-input-search-component.component.scss']
})
export class CommonInputSearchComponentComponent {

  @Input()
  public placeholder: string = 'Type something...';

  @Output()
  public valueChanged: EventEmitter<string> = new EventEmitter<string>();

  public isIconSearchActive: boolean = true;

  public inputValue: string = '';

  constructor() {
  }

  ngOnInit(): void {

  }

  public changeStateOnInput(): void {
    if (this.isIconSearchActive || this.inputValue.length === 0) {
      this.isIconSearchActive = !this.isIconSearchActive;
    }

    this.valueChanged.emit(this.inputValue);
  }

  public changeStateOnClick(): void {
    if (!this.isIconSearchActive && this.inputValue.length > 0) {
      this.isIconSearchActive = !this.isIconSearchActive;
      this.inputValue = '';

      this.valueChanged.emit(this.inputValue);
    }
  }

}
