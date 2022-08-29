import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ThingsService } from '../services/things.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dashboardUrl!: string;
  dashboardUrlSafe!: SafeResourceUrl;

  constructor(private thingsService: ThingsService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

 login() : void
  {
     this.thingsService.loginbasurl();

  }

getUser() :void
{
  this.thingsService.GetUser();
}

getDevice(): void
{
  this.thingsService.GetDevicesForCustomer();
}

 getDashBoards () : void
{


 this.thingsService.GetDashBoards()
 .subscribe(res =>
  {
    this.dashboardUrl = `https://things.sfigroup.co.za/dashboard/${res.data[0].id.id}`;
    this.dashboardUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
    console.log(this.dashboardUrl);
  });

}

}
