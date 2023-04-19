import { Component, OnInit } from '@angular/core';
import { AuthService, SignInFormService } from '../../services';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserSelectors } from '@core/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { mapUserFormToObject } from '../../../utils';
import { FormError } from '../../enums';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./sign-in.component.less'],
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;

  public userNotExist: boolean = false;

  public isUserAuthorized$: Observable<boolean | undefined> =
    this.store$.select(UserSelectors.selectIsUserAuthorized);

  public formError = FormError;

  constructor(
    private loginFormService: SignInFormService,
    private store$: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.form = this.loginFormService.createForm();
  }

  public login(): void {
    if (this.form.valid) {
      this.authService
        .checkIfUserMatches(this.form)
        .pipe(take(1))
        .subscribe((isMatching) => {
          const userInfo = mapUserFormToObject(this.form);
          if (!isMatching) {
            this.userNotExist = true;

            return;
          }

          this.authService.storeUserInfoAndRedirectToHomePage(userInfo);
        });
    }
  }

  public navigateToSignUp(): void {
    this.router.navigate(['sign-up']);
  }
}
