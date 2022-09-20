import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent implements OnInit,AfterViewInit {
  DashboardId! : string |null;
  dashboardUrl!: string;
  dashboardUrlSafe!: SafeResourceUrl;
  baseUrl = environment.baseUrl;
  constructor(public sanitizer: DomSanitizer,private activatedroute:ActivatedRoute) { }


  ngOnInit() {

        this.DashboardId = history.state.dashboardid;

    this.DisplayDashboardIframe();
  }

  ngAfterViewInit(): void {
    const customStyles = `
    .tb-default.mat-toolbar.mat-primary
    {
      background: green !important;
      color:brown !important;
    }
  `;
    const iframedoc= (document.getElementById('tbiframe') as HTMLIFrameElement).contentDocument;

    if(iframedoc !== null)
    {
      const style = iframedoc?.createElement('style');
      style?.appendChild(iframedoc.createTextNode(customStyles));

      iframedoc.head.appendChild(style);
    }

  }
  DisplayDashboardIframe()
  {
     this.dashboardUrl = `${this.baseUrl}/dashboard/${this.DashboardId}`;
     this.dashboardUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
  }

}
