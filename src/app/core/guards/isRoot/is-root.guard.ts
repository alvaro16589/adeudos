import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class IsRootGuard implements CanActivate {
  sw = false;
  constructor(
    private userService: UsersService
  ) {
    this.userService.currentUserData.subscribe(
      {
        next: (value) => {
          if (value[0].type === 'root') {
            this.sw = true;
          }
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
