import { Injectable } from '@angular/core';
import { SessionStorageService, UserInfo, userKey } from 'src/app/shared';
import { Observable } from 'rxjs';
import { UserDataService } from './data';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { isUserAuthorized } from '@core/store/actions';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { mapUserFormToObject } from '../../utils';
import {
  setUserNameIsNotExistError,
  setUserPasswordError,
} from '../validators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private sessionStorage: SessionStorageService,
    private userDataService: UserDataService,
    private store$: Store,
    private router: Router
  ) {}

  public checkIfUserMatches(userData: FormGroup): Observable<boolean> {
    const userInfo = mapUserFormToObject(userData);

    return this.userDataService.getUsers().pipe(
      map((users: UserInfo[]) => {
        const isUserExists = users.some(
          (user: UserInfo) => user.username === userInfo.username
        );
        const isPasswordMatches = users.some(
          (user: UserInfo) => user.password === userInfo.password
        );

        if (!isUserExists) {
          setUserNameIsNotExistError(userData);
        }

        if (!isPasswordMatches) {
          setUserPasswordError(userData);
        }

        return isUserExists && isPasswordMatches;
      })
    );
  }

  public checkIfUsernameExists(username: string): Observable<boolean> {
    return this.userDataService
      .getUsers()
      .pipe(
        map((users: UserInfo[]) =>
          users.some((user: UserInfo) => user.username === username)
        )
      );
  }

  public checkIfEmailExists(email: string): Observable<boolean> {
    return this.userDataService
      .getUsers()
      .pipe(
        map((users: UserInfo[]) =>
          users.some((user: UserInfo) => user.email === email)
        )
      );
  }

  public logout(): void {
    this.sessionStorage.removeItem(userKey);
  }

  public storeUserInfoAndRedirectToHomePage(userData: UserInfo): void {
    this.sessionStorage.setItem(userKey, userData);
    this.store$.dispatch(isUserAuthorized({ isUserAuthorized: true }));
    this.router.navigate(['home']);
  }
}
