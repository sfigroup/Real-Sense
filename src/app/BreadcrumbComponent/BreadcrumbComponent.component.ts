import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../model/breadcrumb.model';
import { BreadcrumbService } from '../services/BreadCrumb/Breadcrumb.service';

@Component({
  selector: 'app-BreadcrumbComponent',
  templateUrl: './BreadcrumbComponent.component.html',
  styleUrls: ['./BreadcrumbComponent.component.css']
})
export class BreadcrumbComponentComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;
  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit() {
  }

}
