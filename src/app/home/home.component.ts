import { CookieService } from './../services/cookie/cookie.service';
import { IconRegistryService } from './../services/iconregistry/icon-registry.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThingsService } from '../services/thingsboard/things.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuHeader: any= [];
  appitemsTravel!:any;
  UserName :string = 'Unknown';
  menuitems = [
    {
      label:`Home`,
      icon:`home_icon`,
      link:``
    },
    {
      label:`Assets`,
      icon:`assets_icon`,
      link:``
    },
    {
      label:`Devices`,
      icon:`devices_icon`,
      link:`devices`
    },
    {
      label:`Entity Views`,
      icon:`entity_icon`,
      link:``
    },
    {
      label:`Dashboards`,
      icon:`dashboard_icon`,
      link:`dashboards`
    },
  ];
  constructor(iconservice:IconRegistryService,
    private cookieService:CookieService,
    private router: Router,
    private loginService:LoginService) {

   }

  ngOnInit(): void {
    this.appitemsTravel = this.menuitems;
    this.menuHeader.push(this.appitemsTravel[0]);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var firstName=this.cookieService.getCookie('firstName');
    var lastName=this.cookieService.getCookie('lastName');
    if(firstName.length ===0 && lastName.length ===0)
    {
      this.UserName='Unkown';
    }else
    {
      this.UserName= `${firstName} ${lastName}`;
    }
  }
  breadCrumbMain() {
    this.appitemsTravel = this.menuitems;
    this.menuHeader  = [];
  }

  breadCrumb(menu: any, index: any) {
    console.log('sub breadCrumb');
    this.menuHeader.splice(index + 1, this.menuHeader.length - 1);
    if (menu[index] && menu[index].items && menu[index].items.length) {
      this.appitemsTravel = menu[index].items;
    }
  }

  menuChange(menuChange :any) {
    this.menuHeader= []
    this.menuHeader.push(menuChange);
  }

  logOut()
  {
    this.cookieService.clearAllCookie();
    this.loginService.Authenticated=false;
    localStorage.clear();
    this.router.navigate(['login']);
    //https://things.sfigroup.co.za/api/auth/logout
  }
}
