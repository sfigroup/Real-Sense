import { Component, OnInit } from '@angular/core';
import { Device, DeviceData } from '../services/models/device.model';
import { ThingsService } from '../services/things.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  DeviceData! :Device[];
  displayedColumns: string[] = ['createdTime', 'name', 'device', 'label'];

  constructor(private thingsService: ThingsService) { }

  ngOnInit(): void {
  }

  getDevices(): void
  {
    this.thingsService.GetDevicesForCustomer().subscribe(res => {
      this.DeviceData =res.data;
      console.log(this.DeviceData)
    });

  }



}
