import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ThingsService } from './services/thingsboard/things.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { LoginService } from './services/login/login.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from './services/cookie/cookie.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { IconRegistryService } from './services/iconregistry/icon-registry.service';
import { MatMenuModule } from '@angular/material/menu';
import { CanactivateRouteGaurdService } from './services/Guards/canactivate-route-gaurd.service';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthServiceService } from './services/Authentication/auth-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DevicesComponent,
    HomeComponent,
    DeviceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule
  ],
  providers: [ThingsService, LoginService, CookieService, IconRegistryService, CanactivateRouteGaurdService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
