import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class LoginComponent implements OnInit ,AfterContentChecked{
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

   sleep = async (milliseconds : number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

  constructor(
    private thingsService: ThingsService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private cookieService: CookieService,
    private svgRegistry: IconRegistryService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {

    if(this.authService.isLoggedIn())
    {
      this.router.navigate(['']);
      return;
    }
    else if(!this.authService.isLoggedIn())
    {
      this.authService.logout();
      this.bringUpIFrame();
    }

  }

  ngAfterContentChecked(): void {
    this.checkIframeLoad();
  }


  async login(): Promise<void> {
    var email = this.form.controls['username'].value;
    var password = this.form.controls['password'].value;
    // do error check here for when they return null values

    this.authService.login(email, password).subscribe({
      next: async (res) => {
        this.email= email;
        this.password=password;

        await this.loginThingsBoardIframe(email,password);

        this.loginSucces= true;
        this.thingsService.GetUser();
        this.router.navigate(['']);
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

  public async loginThingsBoardIframe(email: string, password: string): Promise<void>{

    var iframe = document.getElementById('tbiframe') as HTMLIFrameElement;
    var iframedocument = iframe.contentDocument;
    if (this.iframeLoaded && iframedocument !== undefined && iframedocument !== null) {
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
      await this.sleep(5000);
    }
  }
  public checkIframeLoad():void
  {
    var iframe = document.getElementById('tbiframe') as HTMLIFrameElement;
    var iframedocument = iframe.contentDocument;
    if(iframedocument?.title.includes('Login'))
    {
      this.iframeLoaded = true;
      return;
    }
    window.setTimeout(this.checkIframeLoad,100);
  }


}
