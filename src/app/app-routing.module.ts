import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { HomeComponent } from './home/home.component';
import { CanactivateRouteGaurdService } from './services/Guards/canactivate-route-gaurd.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[CanactivateRouteGaurdService],
    children: [
      { path: 'dashboards', component: DashboardComponent },
      { path: 'devices', component: DevicesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
