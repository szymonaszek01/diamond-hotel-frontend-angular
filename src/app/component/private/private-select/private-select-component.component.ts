import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-private-select',
  templateUrl: './private-select-component.component.html',
  styleUrls: ['./private-select-component.component.scss']
})
export class PrivateSelectComponentComponent {

  @Input()
  public id: number = 0;

  @Input()
  public option_list: string[] = [];

  @Input()
  public placeholder: string = ''

  @Output()
  public selectChanged: EventEmitter<string> = new EventEmitter<string>();

  private selectedOption: string = 'Any'

  constructor() {
  }

  ngOnInit(): void {
  }

  public onOptionSelected(event: MouseEvent): void {
    this.selectedOption = (event.target as HTMLInputElement).id;
    this.selectChanged.emit(this.selectedOption);
  }

  public getSelectedOption(): string {
    return this.selectedOption;
  }
}
