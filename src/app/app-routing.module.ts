import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { HomeComponent } from './home/home.component';
import { CanactivateRouteGaurdService } from './services/Guards/canactivate-route-gaurd.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' }
  },
  {
    path: '',
    component: HomeComponent,
    canActivate:[CanactivateRouteGaurdService],
    data: { breadcrumb: 'Home' },
    children: [
      { path: 'dashboards', component: DashboardComponent ,data: { breadcrumb: 'DashBoards' }},
      { path: 'devices', component: DevicesComponent,data: { breadcrumb: 'Devices' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
