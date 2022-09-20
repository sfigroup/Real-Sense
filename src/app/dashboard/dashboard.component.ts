import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {  ListOfDashBoards } from '../model/dashboardData';
import { ThingsService } from '../services/thingsboard/things.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,AfterViewInit{
  //table and paginator start
  @ViewChild(MatPaginator)
  Paginator!:MatPaginator;
  length = 10;
  pageSize = 1;
  pageSizeOptions: number[] = [1,5, 10, 25, 100];
    // MatPaginator Output
  pageEvent!: PageEvent;
  listOfDashBoards!: ListOfDashBoards[];
  displayedColumns: string[] = ['name', 'id', 'label','actions'];
  //table and paginator end
  NoDashError! :string ;

  displayDash : boolean = false;
  selectedDashId : string= ''

  constructor(private thingsService : ThingsService,
    public sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {
    this.displayDash=false;
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
      // var iframe= document.getElementById('tbiframe') as HTMLIFrameElement;
      // console.log('the frame viewinit: ' + iframe );
      // var iwindow = iframe?.contentDocument
      // if(iwindow !== null)
      // {
      //   var doc = iwindow
      //   var elem = doc.getElementById('username-input')?.id
      //    console.log("output elem: " + elem?.toString());
      // }
      this.listDashboards()
      this.Paginator.page.pipe(
        tap(() => this.listDashboards())
      ).subscribe();
  }

  displayDashboard(dashId:string)
  {
    this.displayDash =true;
    this.selectedDashId= dashId;
    this.router.navigate(['dashboarddisplay'],{state:{dashboardid:dashId}});
  }

  listDashboards(): void
  {
    this.thingsService.GetDashBoards(this.Paginator?.pageIndex ?? 0,
      this.Paginator?.pageSize ?? 10)
    .subscribe(res =>
     {
       if(res.data.length < 1)
       {
         this.NoDashError = "No DashBoards Available";
         return;
       }
       this.listOfDashBoards= res.data;
       this.length=res.totalElements;
      //  this.dashboardUrl = `${this.baseUrl}/dashboard/${res.data[0].id.id}`;
      //  this.dashboardUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);

     });
  }
  // getDashBoards () : void
  // {
  //  this.thingsService.GetDashBoards()
  //  .subscribe(res =>
  //   {
  //     if(res.data.length < 1)
  //     {
  //       this.NoDashError = "No DashBoards Available";
  //       return;
  //     }
  //     this.dashboardUrl = `${this.baseUrl}/dashboard/${res.data[0].id.id}`;
  //     this.dashboardUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
  //     console.log(this.dashboardUrl);
  //   });

  // }

  loginUrlSafe!: SafeResourceUrl;
  getLoginIframe () : void
  {


  //  this.thingsService.GetDashBoards()
  //  .subscribe(res =>
  //   {

  //     this.loginUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(`https://things.sfigroup.co.za/login`);
  //     console.log(this.loginUrlSafe);
  //   });

  }

  tryaccessIframe() :void{}

}
