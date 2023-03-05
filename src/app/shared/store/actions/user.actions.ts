import { createAction, props } from '@ngrx/store';
import { UserInfo } from '@core/interfaces';

export const getUsers = createAction('[Users] get users list');

export const getCurrentUser = createAction(
  '[Users] get current user',
  props<{ user: UserInfo }>()
);

export const getIsUsernameExists = createAction(
  '[Users] get is username exists',
  props<{ isUsernameExist: boolean }>()
);

export const getUsersSuccess = createAction(
  '[Users] get users list success',
  props<{ users: UserInfo[] }>()
);

export const getUsersFailure = createAction(
  '[Users] get users list failure',
  props<{ errors: any }>()
);

export const isUserAuthorized = createAction(
  '[Users] get user authorization status',
  props<{ isUserAuthorized: boolean }>()
);

export const isUserRegistered = createAction(
  '[Users] get users list',
  props<{ isUserRegistered: boolean }>()
);
