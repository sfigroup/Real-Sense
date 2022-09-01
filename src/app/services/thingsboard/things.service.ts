import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, DeviceData } from '../models/device.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThingsService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //  public login() : void
  //  {
  //       var requestBody =
  //       {
  //         // 'username': 'jared@robotweb.co.za',
  //         // 'password': 'SfiJc001$'
  //         'username': 'sysadmin@thingsboard.co.za',
  //         'password': 'sysadmin'
  //       }
  //       var httpOptions =
  //       {
  //         headers:  new HttpHeaders( {
  //           'Content-Type' : 'application/json',
  //           'Accept': 'application/json'
  //         })
  //       }

  //       var baseLoginUrl = `${this.baseUrl}/api/auth/login`;
  //        this.httpClient
  //       .post<Tokens>(baseLoginUrl,JSON.stringify(requestBody),httpOptions)
  //       .subscribe(
  //       data => {console.log(data)
  //       document.cookie = "token=" + data.token},
  //       err =>
  //       {
  //         console.log(err);
  //       });
  // }

  public GetUser(): void {
    var baseUrl = `${this.baseUrl}/api/auth/user`;
    var token = this.getCookie('token');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };

    this.httpClient.get<UserDetails>(baseUrl, httpOptions).subscribe((data) => {
      document.cookie = 'customerId=' + data.customerId.id;
      console.log('UserData: ' + data.customerId.id);
    });
  }

  public GetDevicesForCustomer(): Observable<DeviceData> {
    var page = 0;
    var token = this.getCookie('token');
    var customerId = this.getCookie('customerId');
    var httpOptions = {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + token,
      }),
    };
    var baseUrl = `${this.baseUrl}/api/customer/${customerId}/devices?pageSize=10&page=${page}`;

    return this.httpClient.get<DeviceData>(baseUrl, httpOptions);
  }

  public GetDashBoards(): Observable<DashBoardDetails> {
    var token = this.getCookie('token');
    var customerId = this.getCookie('customerId');
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

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    console.log(document.cookie);
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
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
