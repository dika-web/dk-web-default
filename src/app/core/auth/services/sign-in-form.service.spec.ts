import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { SignInFormService } from './sign-in-form.service';

describe('SingInFormService', () => {
  let service: SignInFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    });
    service = TestBed.inject(SignInFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
