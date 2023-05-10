import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {CommonFooterComponent} from "./component/common/common-footer/common-footer.component";

@NgModule({
  declarations: [
    AppComponent,
    CommonFooterComponent
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
