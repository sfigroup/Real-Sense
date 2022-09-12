import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import * as moment from "moment";
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

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
          console.log('in tap');
          this.setSession(res);
        })).subscribe();

  }

  private setSession(authResult :Tokens) {
    var decoded =this.DecodeToken(authResult.token);

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(decoded.exp));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration? expiration: '');
    return moment(expiresAt);
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
}
