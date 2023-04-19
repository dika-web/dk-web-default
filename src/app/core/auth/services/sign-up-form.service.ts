import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService, matchValidator } from '../validators';

@Injectable({
  providedIn: 'root',
})
export class SignUpFormService {
  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidatorService
  ) {}

  public createForm(): FormGroup {
    return this.fb.group({
      username: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: [this.formValidator.validateUsername()],
        },
      ],
      password: [
        null,
        {
          validators: [
            Validators.required,
            Validators.min(6),
            matchValidator('confirmPassword', true),
          ],
        },
      ],
      confirmPassword: [
        null,
        {
          validators: [
            Validators.required,
            Validators.min(6),
            matchValidator('password'),
          ],
        },
      ],
      email: [
        null,
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.formValidator.validateEmail()],
        },
      ],
    });
  }
}
