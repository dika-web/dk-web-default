import { UserInfo } from '@core/interfaces';

export class UserState {
  public static readonly featureKey = 'userState';

  public static readonly initialState = new UserState();

  public currentUser: UserInfo = {
    username: '',
    password: '',
    email: '',
  };

  public users: UserInfo[] = [{ username: '', password: '', email: '' }];

  public isUsernameExist?: boolean;

  public isUserAuthorized?: boolean;

  public isUserRegistered?: boolean;
}
