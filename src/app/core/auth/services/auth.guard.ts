import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { userKey } from '@core/constants';
import { SessionStorageService } from '@core/services';
import { UserInfo } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isAuthenticated = this.sessionStorage.getItem<UserInfo>(userKey);

    if (!isAuthenticated) this.router.navigate(['sign-in']);

    return Boolean(isAuthenticated);
  }
}
