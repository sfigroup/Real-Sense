import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Device, DeviceData } from './models/device.model';



@Injectable({
  providedIn: 'root'
})
export class ThingsService {

  constructor(private httpClient:HttpClient) { }



 public login() : void
 {
      var requestBody =
      {
        // 'username': 'jared@robotweb.co.za',
        // 'password': 'SfiJc001$'
        'username': 'sysadmin@thingsboard.co.za',
        'password': 'sysadmin'
      }
      var httpOptions =
      {
        headers:  new HttpHeaders( {
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      }

      var baseLoginUrl = "https://things.robotweb.co.za/api/auth/login";
       this.httpClient
      .post<Tokens>(baseLoginUrl,JSON.stringify(requestBody),httpOptions)
      .subscribe(
      data => {console.log(data)
      document.cookie = "token=" + data.token},
      err =>
      {
        console.log(err);
      });
}

public loginbasurl() : void
{
     var requestBody =
     {
       'username': 'jared@robotweb.co.za',
       'password': 'SfiJc001$'

     }
     var httpOptions =
     {
       headers:  new HttpHeaders( {
         'Content-Type' : 'application/json',
         'Accept': 'application/json'
       })
     }

     var baseLoginUrl = "https://things.sfigroup.co.za/api/auth/login";
      this.httpClient
     .post<Tokens>(baseLoginUrl,JSON.stringify(requestBody),httpOptions)
     .subscribe(
     data => {console.log(data)
     document.cookie = "token=" + data.token},
     err =>
     {
       console.log(err);
     });
}

public GetUser(): void
{
  var baseUrl =  "https://things.sfigroup.co.za/api/auth/user";
  var token = this.getCookie("token");
  var httpOptions =
  {
    headers:  new HttpHeaders( {
      'X-Authorization' : "Bearer " + token
    })
  }

  this.httpClient.get<UserDetails>(baseUrl,httpOptions).subscribe(data =>
    {
      document.cookie = "customerId=" + data.customerId.id
       console.log("UserData: "+ data.customerId.id );
    });
}

public GetDevicesForCustomer () : Observable<DeviceData>
{
  var page =0;
  var token = this.getCookie("token");
  var customerId = this.getCookie("customerId");
  var httpOptions =
  {
    headers:  new HttpHeaders( {
      'X-Authorization' : "Bearer " + token
    })
  }
  var baseUrl = `https://things.sfigroup.co.za/api/customer/${customerId}/devices?pageSize=10&page=${page}`;

   return this.httpClient.get<DeviceData>(baseUrl,httpOptions);

}
public  GetDashBoards() : Observable<DashBoardDetails>
{
  var token = this.getCookie("token");
  var customerId = this.getCookie("customerId");
  var httpOptions =
  {
    headers:  new HttpHeaders( {
      'X-Authorization' : "Bearer " + token
    })
  }

  var baseUrl = `https://things.sfigroup.co.za/api/customer/${customerId}/dashboards?pageSize=1&page=1`;
  return this.httpClient.get<DashBoardDetails>(baseUrl,httpOptions);
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

interface Tokens
{
  token: string;
  refreshToken: string;
}

interface UserDetails
{
  "customerId": CustomerId;

}

interface CustomerId
{
  "entityType": string;
  "id": string;
}

interface DashBoardDetails
{
  data : Array<DashboardID>;
}

interface DashboardID
{
  "id" :specificDashBoardId;
}

interface specificDashBoardId
{
  "id" : string;
  "entityType": string;
}

//DEVICES////////////////


//  interface UserDetails {
//   "id":{
//      "entityType":"USER",
//      "id":"6595d700-0f03-11ec-82fb-bdc7c85e36dd"
//   },
//   "createdTime":1630926780528,
//   "additionalInfo":{
//      "description":"",
//      "defaultDashboardId":null,
//      "defaultDashboardFullscreen":false,
//      "homeDashboardId":null,
//      "homeDashboardHideToolbar":true,
//      "userPasswordHistory":{
//         "1630926813339":"$2a$10$ZHQuA5PdvhRSVzZzsk7ylegGf3txh.B9FwMMHbMggQOPSPKDWHzVW",
//         "1630926813346":"$2a$10$ZHQuA5PdvhRSVzZzsk7ylegGf3txh.B9FwMMHbMggQOPSPKDWHzVW"
//      },
//      "userCredentialsEnabled":true,
//      "failedLoginAttempts":0,
//      "lastLoginTs":1661011280464
//   },
//   "tenantId":{
//      "entityType":"TENANT",
//      "id":"217bb4f0-8c80-11eb-8d19-0debe1a471fa"
//   },
//   "customerId":{
//      "entityType":"CUSTOMER",
//      "id":"feacc9f0-8c93-11eb-8b94-d3036aa8a588"
//   },
//   "email":"jared@robotweb.co.za",
//   "authority":"CUSTOMER_USER",
//   "firstName":"Jared",
//   "lastName":"Christians",
//   "name":"jared@robotweb.co.za"
// }
