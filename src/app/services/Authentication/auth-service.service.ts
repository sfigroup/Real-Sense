import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import isBefore from 'date-fns/isBefore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  login(email: string, password: string) {

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
    return this.http.post<Tokens>(baseLoginUrl, requestBody,httpOptions)
      .pipe(
        tap(res => {
          this.setSession(res);
        }),
        catchError((err) => {
          return throwError(() => new Error(`${err.error.message}`));

        }));


  }

  private setSession(authResult :Tokens) {
    var decoded =this.DecodeToken(authResult.token);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(decoded.exp));
    localStorage.setItem("customerId", decoded.customerId ? decoded.customerId:'');
    localStorage.setItem("firstName", decoded.firstName ? decoded.firstName:'');
    localStorage.setItem("lastName", decoded.lastName ? decoded.lastName: '');
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.clear();
  }

  public isLoggedIn() : boolean {
    return isBefore(Math.floor(Date.now() / 1000),this.getExpiration());

  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt =  expiration ? JSON.parse(expiration):0;
    return expiresAt;
  }

   DecodeToken(token: string): JwtT {
    return jwt_decode<JwtT>(token);
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

export interface JwtT {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  customerId?:string;
  tenantId?:string;
  userId?:string;
  firstName?: string;
  lastName?: string;
}
