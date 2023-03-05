import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SignInFormService {
  constructor(private fb: FormBuilder) {}

  public createForm(): FormGroup {
    return this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
