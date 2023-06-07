import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./page/public/home-page/home-page.component";
import {UserDashboardPageComponent} from "./page/private/user/user-dashboard-page/user-dashboard-page.component";
import {SignupPageComponent} from "./page/public/signup-page/signup-page/signup-page.component";
import {LoginPageComponent} from "./page/public/login-page/login-page.component";
import {
  UserReservationNewStepFirstPageComponent
} from "./page/private/user/user-reservation-new-step-first-page/user-reservation-new-step-first-page.component";
import {
  UserReservationNewStepSecondPageComponent
} from "./page/private/user/user-reservation-new-step-second-page/user-reservation-new-step-second-page.component";
import {
  UserReservationAllPageComponent
} from "./page/private/user/user-reservation-all-page/user-reservation-all-page.component";
import {
  UserReservationDetailsPageComponent
} from "./page/private/user/user-reservation-details-page/user-reservation-details-page.component";
import {
  UserProfileDetailsPageComponent
} from "./page/private/user/user-profile-details-page/user-profile-details-page.component";
import {UserProfileAllPageComponent} from "./page/private/user/user-profile-all-page/user-profile-all-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'signup-page', component: SignupPageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'private/user/:user-id/dashboard-page', component: UserDashboardPageComponent},
  {path: 'private/user/:user-id/details/info', component: UserProfileDetailsPageComponent},
  {path: 'private/user/:user-id/reservation/new/step/first', component: UserReservationNewStepFirstPageComponent},
  {path: 'private/user/:user-id/reservation/new/step/second', component: UserReservationNewStepSecondPageComponent},
  {path: 'private/user/:user-id/reservation/all', component: UserReservationAllPageComponent},
  {path: 'private/user/:user-id/reservation/:reservation-id/details/info', component: UserReservationDetailsPageComponent},
  {path: 'private/admin/:admin-id/dashboard-page', component: UserDashboardPageComponent},
  {path: 'private/admin/:admin-id/details/info', component: UserProfileDetailsPageComponent},
  {path: 'private/admin/:admin-id/user-profile/all', component: UserProfileAllPageComponent},
  {path: 'private/admin/:admin-id/user-profile/:user-profile-id/details/info', component: UserProfileDetailsPageComponent},
  {path: 'private/admin/:admin-id/reservation/all', component: UserReservationAllPageComponent},
  {path: 'private/admin/:admin-id/reservation/:reservation-id/details/info', component: UserReservationDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
