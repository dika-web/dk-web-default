import { UserState } from '../state';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getCurrentUser,
  getIsUsernameExists,
  getUsersSuccess,
  isUserAuthorized,
  isUserRegistered,
} from '@core/store/actions';

const initialState = UserState.initialState;

const reducer = createReducer(
  initialState,
  on(getUsersSuccess, (state) => state),
  on(getCurrentUser, (state, { user }) => ({ ...state, currentUser: user })),

  on(getIsUsernameExists, (state, { isUsernameExist }) => {
    return { ...state, isUsernameExist };
  }),
  on(isUserAuthorized, (state, { isUserAuthorized }) => ({
    ...state,
    isUserAuthorized,
  })),

  on(isUserRegistered, (state, { isUserRegistered }) => ({
    ...state,
    isUserRegistered,
  }))
);

export function userReducer(state: UserState, action: Action): UserState {
  return reducer(state, action);
}
