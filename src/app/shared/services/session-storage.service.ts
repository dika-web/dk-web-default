import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE_TOKEN } from '../../core/tokens';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(@Inject(SESSION_STORAGE_TOKEN) private sessionStorage: Storage) {}

  public getItem<T>(key: string): T | undefined {
    const data: string | null = this.sessionStorage.getItem(key);

    return JSON.parse(data as string);
  }

  public setItem<T>(key: string, data: T): void {
    this.sessionStorage.setItem(key, JSON.stringify(data));
  }

  public removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
  }
}
