import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports:[
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ComponentsMaterialModule { }
