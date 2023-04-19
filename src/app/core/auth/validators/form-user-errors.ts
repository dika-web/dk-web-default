import { FormGroup } from '@angular/forms';

export function setUserPasswordError(userForm: FormGroup): void {
  (userForm?.controls as any)['password'].setErrors({
    isPasswordInvalid: true,
  });
}

export function setUserNameIsNotExistError(userForm: FormGroup): void {
  (userForm?.controls as any)['username'].setErrors({
    usernameIsNotExists: true,
  });
}
