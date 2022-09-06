import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from '../services/cookie/cookie.service';
import { IconRegistryService } from '../services/iconregistry/icon-registry.service';
import { LoginService } from '../services/login/login.service';
import { ThingsService } from '../services/thingsboard/things.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  baseUrl = environment.baseUrl;
  errorMessage!: string;
  loginUrlSafe!: SafeResourceUrl;

  constructor(
    private thingsService: ThingsService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService,
    private svgRegistry: IconRegistryService
  ) {}

  ngOnInit(): void {
    if(this.loginService.Authenticated)
    {
      this.router.navigate(['home']);
    }
  }

  login(): void {
    var email = this.form.controls['username'].value;
    var password = this.form.controls['password'].value;
    this.loginService.loginbasurl(email, password).subscribe({
      next: (res) => {
        this.cookieService.decodeToken(res.token);
        this.cookieService.setCookie('token', res.token);
        this.loginThingsBoardIframe(email, password);
        this.loginService.Authenticated=true;
        this.thingsService.GetUser();
        this.router.navigate(['home']);
        console.log(res);
      },
      error: (error) => {
        var x = error;
        console.log(error.message);
        this.errorMessage = error.message;
        this.loginService.Authenticated=false;
        return;
      }
    });
  }

  getUser(): void {
    this.thingsService.GetUser();
  }

  private loginThingsBoardIframe(email: string, password: string): void {
    this.loginUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.baseUrl}`
    );
    var iframe = document.getElementById('tbiframe') as HTMLIFrameElement;
    var iframedocument = iframe.contentDocument;
    //var iframewindowdocument = iframe.contentWindow?.document;
    if (iframedocument !== null) {
      console.log('set from document');
      var userName = iframedocument.getElementById(
        'username-input'
      ) as HTMLInputElement;
      var passWord = iframedocument?.getElementById(
        'password-input'
      ) as HTMLInputElement;
      userName.value = email;
      passWord.value = password;
      userName.dispatchEvent(new Event('input'));
      passWord.dispatchEvent(new Event('input'));
    }
  }
}
