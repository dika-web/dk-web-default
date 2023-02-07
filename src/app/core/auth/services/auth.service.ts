import { Injectable } from '@angular/core';
import {
  SessionStorageService,
  UserCredentials,
  userKey,
} from 'src/app/shared';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { usersMockData } from '@core/mock/usersMockData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  public login(userInfo: UserCredentials): void {
    if (this.confirmUser(userInfo)) {
      this.sessionStorage.setItem(userKey, userInfo);
      this.router.navigate(['/home']);
    }
  }

  public logout(): void {
    this.sessionStorage.removeItem(userKey);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.sessionStorage.getItem(userKey));
  }

  private confirmUser(userInfo: UserCredentials): UserCredentials | undefined {
    return usersMockData.find((user: UserCredentials) => {
      return (
        user.username === userInfo.username &&
        user.password === userInfo.password
      );
    });
  }
}
