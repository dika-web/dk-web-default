import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/services';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './core/home';
import { LoginComponent } from './core/auth/components';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    SharedModule,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
