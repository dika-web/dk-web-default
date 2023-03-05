import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInfo } from '@core/interfaces';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { setUserEmailError } from '../../validators';
import { FormGroup } from '@angular/forms';
import { mapUserFormToObject, UserUtil } from '../../../utils';
import { usersListMock } from '@core/mock';
import { UserData } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private db: AngularFireDatabase) {}

  public getUsers(): Observable<UserInfo[]> {
    return of(usersListMock);
  }

  public createUser(userForm: FormGroup): Observable<UserInfo[]> {
    const userInfo = mapUserFormToObject(userForm);

    return this.getUsers().pipe(
      map((users: UserInfo[]) => {
        return users.map((user) => {
          const isEmailTaken = UserUtil.isDataMatch(
            user[UserData.email]!,
            userInfo[UserData.email]!
          );

          const isUsernameExists = UserUtil.isDataMatch(
            user[UserData.username],
            userInfo[UserData.username]
          );

          if (isEmailTaken) setUserEmailError(userForm);
          if (!isEmailTaken && !isUsernameExists)
            this.db.list('users').push(user);

          return user;
        });
      })
    );
  }

  public updateUser(user: UserInfo): void {}

  public deleteUser(user: UserInfo): void {}
}
