import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getUsers,
  getUsersFailure,
  getUsersSuccess,
} from '@core/store/actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserInfo } from '@core/interfaces';
import { UserDataService } from '../../../core/auth/services';

@Injectable()
export class MovieEffects {
  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.userDataService.getUsers().pipe(
          map((users: UserInfo[]) => getUsersSuccess({ users })),
          catchError(async (errors) => getUsersFailure({ errors }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userDataService: UserDataService
  ) {}
}
