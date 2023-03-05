import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService implements OnDestroy {
  private readonly onDestroy$: Subject<any> = new Subject<any>();
  constructor(private authService: AuthService) {}

  public validateUsername(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return this.authService
          .checkIfUsernameExists(control.value)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((data: boolean) => {
            data ? control.setErrors({ alreadyExist: true }) : null;
          });
      }

      return null;
    };
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
