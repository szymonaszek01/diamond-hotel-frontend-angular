import {Component} from '@angular/core';
import {MessageDto} from "../../../dto/message/MessageDto";
import {ErrorDto} from "../../../dto/error/ErrorDto";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  messageDto: MessageDto;

  errorDto: ErrorDto;

  constructor() {
    this.errorDto = {result: true, message: ''};
    this.messageDto = {firstname: '', lastname: '', email: '', message: ''} as MessageDto;
  }

  ngOnInit(): void {
  }

  public onSendMessageClick(): void {
    if (!this.isMessageValid()) {
      this.errorDto = {result: false, message: 'Not all fields was field in'};
      return;
    }
  }

  public isMessageValid(): boolean {
    return Object.values(this.messageDto).every(value => value.length > 0);
  }

  public onInputChange(): void {
    if (!this.errorDto.result) {
      this.errorDto.result = true;
      this.errorDto.message = '';
    }
  }
}
