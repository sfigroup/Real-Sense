import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.baseUrl;
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
        })
      );
  }


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

