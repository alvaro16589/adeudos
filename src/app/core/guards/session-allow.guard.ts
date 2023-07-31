import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class SessionAllowGuard implements CanActivate {
  sw=false;

  constructor(
    private userService:UsersService
  ){
    this.userService.currentUserLoginOn.subscribe(
      {
        next:(value)=>{
          this.sw=value
        }
      }
    );

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sw;
  }
  
}
