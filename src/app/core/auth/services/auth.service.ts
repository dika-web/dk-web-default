import { Injectable } from '@angular/core';
import { SessionStorageService, UserInfo, userKey } from 'src/app/shared';
import { combineLatest, Observable } from 'rxjs';
import { UserDataService } from './data';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getCurrentUser, getIsUsernameExists } from '@core/store/actions';
import { FormGroup } from '@angular/forms';
import { mapUserFormToObject, UserUtil } from '../../utils';
import { setUserPasswordError } from '../validators';
import { UserData } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private sessionStorage: SessionStorageService,
    private userDataService: UserDataService,
    private store$: Store
  ) {}

  public checkIfUserExists(userForm: FormGroup): Observable<boolean> {
    return combineLatest([this.userDataService.getUsers()]).pipe(
      map(([users]: [users: UserInfo[]]) =>
        users.some((user: UserInfo) => {
          const userData = mapUserFormToObject(userForm);

          const isUsernameExists = UserUtil.isDataMatch(
            user[UserData.username],
            userData[UserData.username]
          );

          const isPasswordMatches = UserUtil.isDataMatch(
            user[UserData.password],
            userData[UserData.password]
          );

          const isUserExist = isUsernameExists && isPasswordMatches;

          if (isUsernameExists && !isPasswordMatches) {
            this.store$.dispatch(
              getIsUsernameExists({ isUsernameExist: true })
            );
            setUserPasswordError(userForm);
          }
          if (isUserExist) {
            this.store$.dispatch(getCurrentUser({ user }));
          }

          return isUserExist;
        })
      )
    );
  }

  public checkIfUsernameExists(username: string): Observable<boolean> {
    return combineLatest([this.userDataService.getUsers()]).pipe(
      map(([users]: [users: UserInfo[]]) =>
        users.some((user: UserInfo) => user.username === username)
      )
    );
  }

  public logout(): void {
    this.sessionStorage.removeItem(userKey);
  }
}
