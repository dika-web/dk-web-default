import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private API_URL = 'https://my-json-server.typicode.com/dika-web/db';
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this.API_URL}/users`);
  }

  public createUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(
      `${this.API_URL}/users/${userInfo.username}`,
      {
        userInfo,
      }
    );
  }

  public updateUser(user: UserInfo): void {}

  public deleteUser(user: UserInfo): void {}
}
