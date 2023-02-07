import { Component, OnInit } from '@angular/core';
import { LoginFormService } from '../../services';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services';
import { SharedModule, UserCredentials } from 'src/app/shared';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public isAuthenticated: boolean = this.authService.isAuthenticated();

  constructor(
    private loginFormService: LoginFormService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.form = this.loginFormService.createForm();
  }

  public login(): void {
    const userData: UserCredentials = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
    };

    this.authService.login(userData);
  }
}
