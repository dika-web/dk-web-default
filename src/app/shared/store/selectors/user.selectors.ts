import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '@core/store/state';

export class UserSelectors {
  public static selectUserState = createFeatureSelector<UserState>(
    UserState.featureKey
  );

  public static selectUsers = createSelector(
    UserSelectors.selectUserState,
    (state: UserState) => state.users
  );

  public static selectCurrentUser = createSelector(
    UserSelectors.selectUserState,
    (state: UserState) => state.currentUser
  );

  public static selectIsUsernameExist = createSelector(
    UserSelectors.selectUserState,
    (state: UserState) => state.isUsernameExist
  );

  public static selectIsUserAuthorized = createSelector(
    UserSelectors.selectUserState,
    (state: UserState) => state.isUserAuthorized
  );

  public static selectIsUserRegistered = createSelector(
    UserSelectors.selectUserState,
    (state: UserState) => state.isUserRegistered
  );
}
