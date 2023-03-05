import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpFormService, UserDataService } from '../../services';
import { SharedModule } from '@core/shared.module';
import { Observable, Subject } from 'rxjs';
import { UserSelectors } from '@core/store/selectors';
import { Store } from '@ngrx/store';
import { FormErrorEnum } from '../../enums';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  public isUserRegistered$: Observable<boolean | undefined> =
    this.store$.select(UserSelectors.selectIsUserRegistered);

  public formErrors = FormErrorEnum;

  private onDestroy$: Subject<any> = new Subject<any>();

  constructor(
    private userDataService: UserDataService,
    private signUpFormService: SignUpFormService,
    private store$: Store
  ) {}

  public ngOnInit(): void {
    this.form = this.signUpFormService.createForm();
  }

  public registerUser(): void {
    if (this.form.valid) {
      this.userDataService
        .createUser(this.form)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe();
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
