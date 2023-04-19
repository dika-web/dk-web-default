import { FormGroup } from '@angular/forms';
import { UserInfo } from '@shared/interfaces';

export function mapUserFormToObject(form: FormGroup): UserInfo {
  const username = form.get('username')?.value ?? '';
  const password = form.get('password')?.value ?? '';
  const email = form.get('email')?.value ?? '';

  return { username, password, email };
}
