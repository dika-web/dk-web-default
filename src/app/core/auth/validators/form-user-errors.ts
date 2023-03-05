import { FormGroup } from '@angular/forms';

export function setUserPasswordError(userForm: FormGroup): void {
  (userForm?.controls as any)['password'].setErrors({
    isPasswordInvalid: true,
  });
}

export function setUserEmailError(userForm: FormGroup): void {
  (userForm?.controls as any)['email'].setErrors({
    isEmailExisting: true,
  });
}
