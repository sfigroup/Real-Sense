import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeviceData } from '../models/device.model';
import { environment } from 'src/environments/environment';
import { DashboardData } from 'src/app/model/dashboardData';
import { HomeDashBoard } from 'src/app/model/home-dashboard';

@Injectable({
  providedIn: 'root',
})
export class ThingsService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public GetUser(): void {
    var baseUrl = `${this.baseUrl}/api/auth/user`;
    var token = localStorage.getItem("id_token");
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };

    this.httpClient.get<UserDetails>(baseUrl, httpOptions).subscribe((data) => {
      localStorage.setItem('customerId',data.customerId.id);
    });
  }

  public GetDevicesForCustomer(pageIndex:number,pageSize:number): Observable<DeviceData> {
    var token = localStorage.getItem("id_token");
    var customerId = localStorage.getItem('customerId');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };
    var baseUrl = `${this.baseUrl}/api/customer/${customerId}/devices?pageSize=${pageSize}&page=${pageIndex}`;

    return this.httpClient.get<DeviceData>(baseUrl, httpOptions);
  }

  public GetDashBoards(pageIndex:number,pageSize:number): Observable<DashboardData> {
    var token = localStorage.getItem("id_token");
    var customerId = localStorage.getItem('customerId');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };

    var baseUrl = `${this.baseUrl}/api/customer/${customerId}/dashboards?pageSize=${pageSize}&page=${pageIndex}`;
    return this.httpClient.get<DashboardData>(baseUrl, httpOptions);
  }

  public GetHomeDashBoard(): Observable<HomeDashBoard>
  {
    var token = localStorage.getItem("id_token");
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };

    var baseUrl = `${this.baseUrl}/api/dashboard/home`;
    return this.httpClient.get<HomeDashBoard>(baseUrl, httpOptions);
  }

}

interface UserDetails {
  customerId: CustomerId;
}

interface CustomerId {
  entityType: string;
  id: string;
}
