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

  public loginbasurl(): Observable<Tokens> {
    var requestBody = {
      username: 'jared@robotweb.co.za',
      password: 'SfiJc001$$',
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
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //     document.cookie = 'token=' + data.token;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}

interface Tokens {
  token: string;
  refreshToken: string;
}
