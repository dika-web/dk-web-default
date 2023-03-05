import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireDatabase, useValue: {} }],
    });
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
