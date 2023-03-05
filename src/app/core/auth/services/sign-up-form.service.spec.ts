import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormValidatorService } from '../validators';

import { SignUpFormService } from './sign-up-form.service';

describe('SignUpFormService', () => {
  let service: SignUpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FormBuilder, useValue: {} },
        { provide: FormValidatorService, useValue: {} },
      ],
    });
    service = TestBed.inject(SignUpFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
