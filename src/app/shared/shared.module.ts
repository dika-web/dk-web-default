import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
})
export class SharedModule {}
