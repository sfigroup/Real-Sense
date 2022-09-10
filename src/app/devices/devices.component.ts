import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Device } from '../services/models/device.model';
import { ThingsService } from '../services/thingsboard/things.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator)
  Paginator!:MatPaginator;
  length = 10;
  pageSize = 1;
  pageSizeOptions: number[] = [1,5, 10, 25, 100];
    // MatPaginator Output
  pageEvent!: PageEvent;
  DeviceData! :Device[];
  displayedColumns: string[] = ['createdTime', 'name', 'device', 'label'];

  constructor(private thingsService: ThingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getDevices();
    this.Paginator.page.pipe(
      tap(() => this.getDevices())
    ).subscribe();
    console.log('STORAGE:' + localStorage.getItem("jwt_token"));
  }

  getDevices(): void
  {
    this.thingsService.GetDevicesForCustomer(this.Paginator?.pageIndex ?? 0,
      this.Paginator?.pageSize ?? 10)
    .subscribe(res => {
      this.DeviceData =res.data;
      this.length=res.totalElements;
        console.log(this.DeviceData)
    });

  }



}
