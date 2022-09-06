import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, DeviceData } from '../models/device.model';
import { environment } from 'src/environments/environment';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class ThingsService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient,private cookieService:CookieService) {}

  public GetUser(): void {
    var baseUrl = `${this.baseUrl}/api/auth/user`;
    var token = this.cookieService.getCookie('token');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };

    this.httpClient.get<UserDetails>(baseUrl, httpOptions).subscribe((data) => {
      this.cookieService.setCookie('customerId',data.customerId.id);
    });
  }

  public GetDevicesForCustomer(): Observable<DeviceData> {
    var page = 0;
    var token = this.cookieService.getCookie('token');
    var customerId = this.cookieService.getCookie('customerId');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };
    var baseUrl = `${this.baseUrl}/api/customer/${customerId}/devices?pageSize=10&page=${page}`;

    return this.httpClient.get<DeviceData>(baseUrl, httpOptions);
  }

  public GetDashBoards(): Observable<DashBoardDetails> {
    var token = this.cookieService.getCookie('token');
    var customerId = this.cookieService.getCookie('customerId');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };

    var baseUrl = `${this.baseUrl}/api/customer/${customerId}/dashboards?pageSize=1&page=1`;
    return this.httpClient.get<DashBoardDetails>(baseUrl, httpOptions);
  }
  // .subscribe(res =>
  //   {
  //     console.log(JSON.stringify(res.data));
  //     var dashboardId =res.data[0].id.id;
  //     dashboardUrl = `https://things.sfigroup.co.za/dashboard/${dashboardId}?publicId=acce3a10-8d3d-11eb-8b94-d3036aa8a588`;

  //     console.log("URL: " + JSON.stringify(dashboardUrl));

  //   });

}

interface UserDetails {
  customerId: CustomerId;
}

interface CustomerId {
  entityType: string;
  id: string;
}

interface DashBoardDetails {
  data: Array<DashboardID>;
}

interface DashboardID {
  id: specificDashBoardId;
}

interface specificDashBoardId {
  id: string;
  entityType: string;
}
