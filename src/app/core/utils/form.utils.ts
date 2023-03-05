import { FormGroup } from '@angular/forms';
import { UserInfo } from '@shared/interfaces';

export function mapUserFormToObject(form: FormGroup): UserInfo {
  return {
    username: form.controls['username'].value,
    password: form.controls['password'].value,
  };
}
