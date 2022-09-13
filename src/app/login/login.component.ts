import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../services/Authentication/auth-service.service';
import { CookieService } from '../services/cookie/cookie.service';
import { IconRegistryService } from '../services/iconregistry/icon-registry.service';
import { ThingsService } from '../services/thingsboard/things.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit ,AfterViewInit{
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  baseUrl = environment.baseUrl;
  errorMessage!: string;
  loginUrlSafe!: SafeResourceUrl;
  loginSucces = false;
  iframeLoaded =false;
  private email! :string;
  private password! :string;

  constructor(
    private thingsService: ThingsService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private cookieService: CookieService,
    private svgRegistry: IconRegistryService,
    private cd :ChangeDetectorRef,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {

    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['']);
      return;
    }
    this.bringUpIFrame();
  }

  ngAfterViewInit(): void {
    this.checkIframeLoad();
  }

  login(): void {
    var email = this.form.controls['username'].value;
    var password = this.form.controls['password'].value;
    // do error check here for when they return null values
    this.authService.login(email,password);
    this.loginThingsBoardIframe(email,password);
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.email= email;
        this.password=password;
        this.loginSucces= true;
        this.thingsService.GetUser();
        this.router.navigate(['']);
        console.log(res);
      },
      error: (error) => {
        var x = error;
        console.log(error.message);
        this.errorMessage = error.message;
        return;
      }
    });
  }

  getUser(): void {
    this.thingsService.GetUser();
  }
  public bringUpIFrame()
  {
    this.loginUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}`);
  };

  public loginThingsBoardIframe(email: string, password: string): void {

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
      var button = iframedocument.querySelectorAll('button[type=submit]')[0] as HTMLButtonElement;
      button.click();
    }
  }

  public checkIframeLoad():void
  {
    var iframe = document.getElementById('tbiframe') as HTMLIFrameElement;
    var iframedocument = iframe.contentDocument;
    if(iframedocument?.readyState === 'complete')
    {
      this.iframeLoaded = true;
      this.cd.detectChanges();
      return
    }
    window.setTimeout(this.checkIframeLoad,100);
  }
}
