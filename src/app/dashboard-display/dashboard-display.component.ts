import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent implements OnInit,AfterViewInit,AfterContentChecked {
  DashboardId! : string |null;
  dashboardUrl!: string;
  dashboardUrlSafe!: SafeResourceUrl;
  baseUrl = environment.baseUrl;
  iFrameLoaded : boolean = false;
  ShowDashToolBar: boolean = false;
  constructor(public sanitizer: DomSanitizer,
    private activatedroute:ActivatedRoute,
    private cd :ChangeDetectorRef,
    private router: Router) { }


  ngOnInit() {

    if(history.state.dashboardid !== undefined)
    {
      this.DashboardId = history.state.dashboardid;
      this.ShowDashToolBar = history.state.showtoolbar;
      this.DisplayDashboardIframe();
      return;
    }
    this.router.navigate(['dashboards']);
  }

  ngAfterContentChecked(): void {
    this.checkIframeLoad();

    if(this.iFrameLoaded)
    {
     this.loadIFrameStyles();
    }
  }

ngAfterViewInit(): void {

}

  DisplayDashboardIframe()
  {
     this.dashboardUrl = `${this.baseUrl}/dashboard/${this.DashboardId}`;
     this.dashboardUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
  }

  loadIFrameStyles():void
  {
    const customStyles = `
    .tb-default mat-fab-toolbar.mat-primary .mat-fab-toolbar-background
    {
      background: rgba(40,105,104,0.6)  !important;
      color:brown !important;
      height:57px !important;
    }
    button.mat-focus-indicator.mat-tooltip-trigger.mat-fab.mat-button-base.mat-primary {
      background-color: rgba(40,105,104,0)  !important;
      box-shadow: 0 0 0 !important;
    }
    div.tb-dashboard-page section.tb-powered-by-footer {

      visibility: hidden;
    }
  `;

  const toolbarStyles = `
  div.tb-dashboard-page .tb-dashboard-container.tb-dashboard-toolbar-opened:not(.is-fullscreen)
  {
      margin-top: 0px !important;
  }

  div.tb-dashboard-page section.tb-dashboard-toolbar
  {
    display: none !important;
  }
  `;


   const iframedoc= (document.getElementById('tbiframe') as HTMLIFrameElement).contentDocument;
   if(iframedoc !== null)
        {
          const style = iframedoc?.createElement('style');
          style?.appendChild(iframedoc.createTextNode(customStyles));
          if(this.ShowDashToolBar)
          {
            style?.appendChild(iframedoc.createTextNode(toolbarStyles));
          }
          iframedoc.head.appendChild(style);
          var title =  iframedoc.title.includes('Thingsboard');
          console.log('The title contains: ' + title );
        }

  }

  public checkIframeLoad():void
  {
    var iframe = document.getElementById('tbiframe') as HTMLIFrameElement;
    var iframedocument = iframe.contentDocument;
    if(iframedocument?.title.includes('ThingsBoard'))
    {
      this.iFrameLoaded = true;
      this.cd.detectChanges();
      return ;
    }
    window.setTimeout(this.checkIframeLoad,100);
  }

}
