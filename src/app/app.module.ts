import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CommonFooterComponent} from "./component/common/common-footer/common-footer.component";
import {PublicNavBarComponent} from "./component/public/public-nav-bar/public-nav-bar.component";
import {
  PublicAnimatedBackgroundComponent
} from "./component/public/public-animated-background/public-animated-background.component";
import {HomePageComponent} from "./page/public/home-page/home-page.component";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptor/AuthInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    CommonFooterComponent,
    PublicNavBarComponent,
    PublicAnimatedBackgroundComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
