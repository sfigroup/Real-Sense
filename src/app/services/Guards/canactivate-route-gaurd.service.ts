import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Authentication/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateRouteGaurdService implements CanActivate {

  constructor(private authService: AuthServiceService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.authService.isLoggedIn())
    {
      return true;
    }
    else
    {
      this.authService.logout()
      this.router.navigate(['login']);
      return false

    }
  }
}
