import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/services';
import { APP_ROUTES } from '@core/constants';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: APP_ROUTES.home,
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./core/components/home').then((m) => m.HomeComponent),
  },
  {
    path: APP_ROUTES.sign_in,
    loadComponent: () =>
      import('./core/auth').then((mod) => mod.SignInComponent),
  },

  {
    path: APP_ROUTES.sign_up,
    loadComponent: () => import('./core/auth').then((m) => m.SignUpComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
