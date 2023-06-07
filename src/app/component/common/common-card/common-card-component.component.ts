import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../service/AuthService";

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card-component.component.html',
  styleUrls: ['./common-card-component.component.scss']
})
export class CommonCardComponentComponent {

  @Input()
  public title: string = '';

  @Input()
  public link: string = '';

  @Input()
  public button: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public routerGo() {
    this.authService.navigateByRole(this.link);
  }
}
