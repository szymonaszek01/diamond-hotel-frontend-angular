import {Component, Input} from '@angular/core';

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

  private selectedOption: string = 'Any'

  constructor() {
  }

  ngOnInit(): void {
  }

  public onOptionSelected(event: MouseEvent): void {
    this.selectedOption = (event.target as HTMLInputElement).id;
  }

  public getSelectedOption(): string {
    return this.selectedOption;
  }
}
