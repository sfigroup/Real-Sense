import { IfStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ThingsService } from '../services/things.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  dashboardUrl!: string;
  dashboardUrlSafe!: SafeResourceUrl;

  constructor(private thingsService : ThingsService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getDashBoards();
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    var iframe= document.getElementById('tbiframe') as HTMLIFrameElement;
    console.log('the frame contentcheck: ' + iframe );
    // var iwindow = iframe?.contentDocument
    // if(iwindow !== null)
    // {
    //   var doc = iwindow
    //   var elem = doc.getElementById('username-input')?.id
    //    console.log("output elem: " + elem?.toString());
    // }
  }
  ngAfterViewInit(): void {
      var iframe= document.getElementById('tbiframe') as HTMLIFrameElement;
      console.log('the frame viewinit: ' + iframe );
      // var iwindow = iframe?.contentDocument
      // if(iwindow !== null)
      // {
      //   var doc = iwindow
      //   var elem = doc.getElementById('username-input')?.id
      //    console.log("output elem: " + elem?.toString());
      // }
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

  loginUrlSafe!: SafeResourceUrl;
  getLoginIframe () : void
  {


   this.thingsService.GetDashBoards()
   .subscribe(res =>
    {

      this.loginUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(`https://things.sfigroup.co.za/login`);
      console.log(this.loginUrlSafe);
    });

  }

  tryaccessIframe() :void{}

}
