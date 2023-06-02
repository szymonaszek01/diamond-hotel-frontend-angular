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
import {PrivateNavBarComponent} from "./component/private/private-nav-bar/private-nav-bar.component";
import {UserDashboardPageComponent} from "./page/private/user/user-dashboard-page/user-dashboard-page.component";
import {SignupPageComponent} from "./page/public/signup-page/signup-page/signup-page.component";
import {LoginPageComponent} from "./page/public/login-page/login-page.component";
import {CommonCardComponentComponent} from './component/common/common-card/common-card-component.component';
import {
  CommonInputSearchComponentComponent
} from './component/common/common-input-search/common-input-search-component.component';
import {
  UserReservationNewStepFirstPageComponent
} from './page/private/user/user-reservation-new-step-first-page/user-reservation-new-step-first-page.component';
import {PrivateSelectComponentComponent} from './component/private/private-select/private-select-component.component';
import {
  PrivateRoomTypeCardComponentComponent
} from './component/private/private-room-type-card/private-room-type-card-component.component';
import {CommonToastComponentComponent} from './component/common/common-toast/common-toast-component.component';
import {
  CommonLoadingDataWindowComponnetComponent
} from './component/common/common-loading-data-window/common-loading-data-window-componnet.component';
import {
  UserReservationNewStepSecondPageComponent
} from './page/private/user/user-reservation-new-step-second-page/user-reservation-new-step-second-page.component';
import {
  PrivateRoomTypeCardSummaryComponent
} from './component/private/private-room-type-card-summary/private-room-type-card-summary.component';
import {
  UserReservationAllPageComponent
} from './page/private/user/user-reservation-all-page/user-reservation-all-page.component';
import { UserReservationDetailsPageComponent } from './page/private/user/user-reservation-details-page/user-reservation-details-page.component';
import { CommonTableComponent } from './component/common/common-table/common-table.component';
import { CommonDetailsComponent } from './component/common/common-details/common-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonFooterComponent,
    PublicNavBarComponent,
    PublicAnimatedBackgroundComponent,
    HomePageComponent,
    PrivateNavBarComponent,
    UserDashboardPageComponent,
    SignupPageComponent,
    LoginPageComponent,
    CommonCardComponentComponent,
    CommonInputSearchComponentComponent,
    UserReservationNewStepFirstPageComponent,
    PrivateSelectComponentComponent,
    PrivateRoomTypeCardComponentComponent,
    CommonToastComponentComponent,
    CommonLoadingDataWindowComponnetComponent,
    UserReservationNewStepSecondPageComponent,
    PrivateRoomTypeCardSummaryComponent,
    UserReservationAllPageComponent,
    UserReservationDetailsPageComponent,
    CommonTableComponent,
    CommonDetailsComponent
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
