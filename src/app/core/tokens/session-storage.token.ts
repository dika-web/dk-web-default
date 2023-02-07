import { inject, InjectionToken } from '@angular/core';
import { WINDOW_TOKEN } from './window.token';

export const SESSION_STORAGE_TOKEN = new InjectionToken<Storage>(
  'An abstraction over window.sessionStorage object',
  {
    factory: (): Storage => (inject(WINDOW_TOKEN) as Window).sessionStorage,
  },
);
