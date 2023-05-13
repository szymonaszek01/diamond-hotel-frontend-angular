import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public routerGo() {
    this.router.navigate([this.link]);
  }
}
