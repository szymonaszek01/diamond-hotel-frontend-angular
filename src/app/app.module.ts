import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {CommonFooterComponent} from "./component/common/common-footer/common-footer.component";
import {PublicNavBarComponent} from "./component/public/public-nav-bar/public-nav-bar.component";
import {
  PublicAnimatedBackgroundComponent
} from "./component/public/public-animated-background/public-animated-background.component";

@NgModule({
  declarations: [
    AppComponent,
    CommonFooterComponent,
    PublicNavBarComponent,
    PublicAnimatedBackgroundComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
