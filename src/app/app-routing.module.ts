import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./page/public/home-page/home-page.component";
import {UserDashboardPageComponent} from "./page/private/user/user-dashboard-page/user-dashboard-page.component";
import {SignupPageComponent} from "./page/public/signup-page/signup-page/signup-page.component";
import {LoginPageComponent} from "./page/public/login-page/login-page.component";
import {
  UserReservationNewStepFirstPageComponent
} from "./page/private/user/user-reservation-new-step-first-page/user-reservation-new-step-first-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'signup-page', component: SignupPageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'private/user/dashboard-page', component: UserDashboardPageComponent},
  {path: 'private/user/reservation/new/step/first', component: UserReservationNewStepFirstPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
