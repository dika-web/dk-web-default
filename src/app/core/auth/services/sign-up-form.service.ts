import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      username: new FormControl('', [
        Validators.min(4),
        this.formValidator.validateUsername,
      ]),
      password: new FormControl('', [
        Validators.min(6),
        matchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl('', [matchValidator('password')]),
      email: new FormControl('', [Validators.email]),
    });
  }
}
