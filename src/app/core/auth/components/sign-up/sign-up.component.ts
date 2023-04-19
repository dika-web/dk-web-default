import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthService,
  SignUpFormService,
  UserDataService,
} from '../../services';
import { SharedModule } from '@core/shared.module';
import { Observable } from 'rxjs';
import { UserSelectors } from '@core/store/selectors';
import { Store } from '@ngrx/store';
import { FormError } from '../../enums';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { mapUserFormToObject } from '../../../utils';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
  public form!: FormGroup;

  public isUserRegistered$: Observable<boolean | undefined> =
    this.store$.select(UserSelectors.selectIsUserRegistered);

  public formErrors = FormError;

  constructor(
    private userDataService: UserDataService,
    private signUpFormService: SignUpFormService,
    private authService: AuthService,
    private store$: Store
  ) {}

  public ngOnInit(): void {
    this.form = this.signUpFormService.createForm();
  }

  public registerUser(): void {
    const userInfo = mapUserFormToObject(this.form);

    if (!this.form.valid) {
      return;
    }

    this.userDataService
      .createUser(userInfo)
      .pipe(take(1))
      .subscribe(() =>
        this.authService.storeUserInfoAndRedirectToHomePage(userInfo)
      );
  }
}
