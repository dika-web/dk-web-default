import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor(private authService: AuthService) {}

  public validateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.checkIfUsernameExists(control.value).pipe(
        take(1),
        map((data: boolean) => (data ? { usernameIsTaken: true } : null))
      );
    };
  }

  public validateEmail(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.checkIfEmailExists(control.value).pipe(
        take(1),
        map((data: boolean) => (data ? { emailIsTaken: true } : null))
      );
    };
  }
}
