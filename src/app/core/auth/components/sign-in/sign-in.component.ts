import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, SignInFormService } from '../../services';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionStorageService, SharedModule, userKey } from '@core/index';
import { Observable, Subject } from 'rxjs';
import { UserSelectors } from '@core/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { isUserAuthorized } from '@core/store/actions';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { mapUserFormToObject } from '../../../utils';
import { FormErrorEnum } from '../../enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./sign-in.component.less'],
})
export class SignInComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  public isUserAuthorized$: Observable<boolean | undefined> =
    this.store$.select(UserSelectors.selectIsUserAuthorized);

  public formError = FormErrorEnum;

  private isUsernameExists$: Observable<boolean | undefined> =
    this.store$.select(UserSelectors.selectIsUsernameExist);

  private readonly onDestroy$: Subject<any> = new Subject<any>();

  constructor(
    private loginFormService: SignInFormService,
    private authService: AuthService,
    private store$: Store,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}

  public ngOnInit(): void {
    this.form = this.loginFormService.createForm();
  }

  public login(): void {
    this.authService
      .checkIfUserExists(this.form)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isUserDataMatching: boolean) => {
        isUserDataMatching
          ? this.redirectToHomePage(this.form)
          : this.redirectToSignUpPage();
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private redirectToHomePage(userData: FormGroup): void {
    const userInfo = mapUserFormToObject(userData);
    this.sessionStorage.setItem(userKey, userInfo);
    this.store$.dispatch(isUserAuthorized({ isUserAuthorized: true }));
    this.router.navigate(['home']);
  }

  private redirectToSignUpPage(): void {
    this.isUsernameExists$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isUserExists?: boolean) => {
        if (!isUserExists) {
          this.router.navigate(['sign-up']);
        }
      });
  }
}
