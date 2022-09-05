import { Injectable } from '@angular/core';
import jwt_decode,{JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  public getCookie(name: string) {
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

  public setCookie(key:string,val:string):void
  {
    document.cookie = `${key}=` + val;
  }

  public clearAllCookie():void
  {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }


  }

  public decodeToken(token:string) : void
  {
    var decoded = jwt_decode<DecodedToken>(token);
    console.log(decoded.firstName);
    this.setCookie('firstName',decoded.firstName);
    this.setCookie('lastName',decoded.lastName);
  }
}

export interface DecodedToken {
  sub: string
  scopes: string[]
  userId: string
  firstName: string
  lastName: string
  enabled: boolean
  isPublic: boolean
  tenantId: string
  customerId: string
  iss: string
  iat: number
  exp: number
}
