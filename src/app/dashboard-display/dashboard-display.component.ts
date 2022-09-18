import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.css']
})
export class DashboardDisplayComponent implements OnInit {
  @Input() DashboardId! : string;
  dashboardUrl!: string;
  dashboardUrlSafe!: SafeResourceUrl;
  baseUrl = environment.baseUrl;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.DisplayDashboardIframe();
  }

  DisplayDashboardIframe()
  {
     this.dashboardUrl = `${this.baseUrl}/dashboard/${this.DashboardId}`;
     this.dashboardUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
  }

}
