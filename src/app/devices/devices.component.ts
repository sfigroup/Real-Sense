import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Device } from '../services/models/device.model';
import { ThingsService } from '../services/thingsboard/things.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit,AfterViewInit {

  DeviceData! :Device[];
  displayedColumns: string[] = ['createdTime', 'name', 'device', 'label'];

  constructor(private thingsService: ThingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getDevices();
  }

  getDevices(): void
  {
    this.thingsService.GetDevicesForCustomer().subscribe(res => {
      this.DeviceData =res.data;
      console.log(this.DeviceData)
    });

  }



}
