import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardExtractComponent } from './components/card-extract/card-extract.component';
import { InputComponent } from './components/input/input.component';


@NgModule({
  declarations: [
    InputComponent,
    CardExtractComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    InputComponent,
    CardExtractComponent
  ]
})
export class SharedModule { }
