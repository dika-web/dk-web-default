import { Component } from '@angular/core';
import { SharedModule } from '@core/shared.module';
import { UserSelectors } from '@core/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserInfo } from '@core/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [SharedModule, CommonModule],
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  public currentUser$: Observable<UserInfo> = this.store$.select(
    UserSelectors.selectCurrentUser
  );

  constructor(private store$: Store) {}
}
