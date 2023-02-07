import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor(private fb: FormBuilder) {}

  public createForm(): FormGroup {
    return this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
