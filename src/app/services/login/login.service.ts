import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.baseUrl;
  Authenticated:boolean= false;
  constructor(private httpClient: HttpClient) {}

  public loginbasurl(email:string,password:string): Observable<Tokens> {
    var requestBody = {
      username: email,
      password: password,
    };
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    var baseLoginUrl = `${this.baseUrl}/api/auth/login`;
    return this.httpClient
      .post<Tokens>(baseLoginUrl, JSON.stringify(requestBody), httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(() => new Error(`${err.error.message}`));
          this.Authenticated = false;
        })
      );
  }

  // public logOut():void
  // {
  //   var httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     }),
  //   };
  //   var baseLoginUrl = `${this.baseUrl}/api/auth/logout`;
  //    this.httpClient.post(baseLoginUrl,{},httpOptions);
  //    this.httpClient.post("http://iot.robotweb.co.za/api/noauth/oauth2Clients?platform=WEB",{},httpOptions);
  //    //http://iot.robotweb.co.za/api/noauth/oauth2Clients?platform=WEB
  // }

}

interface Tokens {
  token: string;
  refreshToken: string;
}

interface UserDetails {
  customerId: CustomerId;
}

interface CustomerId {
  entityType: string;
  id: string;
}

