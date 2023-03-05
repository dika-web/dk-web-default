import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {
  AuthService,
  SignInFormService,
  UserDataService,
} from '../../services';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent, CommonModule, BrowserAnimationsModule],
      providers: [
        { provide: SignInFormService },
        { provide: AuthService },
        { provide: FormBuilder },
        { provide: AngularFireDatabase, useValue: { AngularFireDatabase } },
        { provide: UserDataService },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
