import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsMaterialModule } from '../../shared/app-material/components-material.module';
import { BalancePanelComponent } from './balance-panel/balance-panel.component';
import { FormTransferComponent } from './form-transfer/form-transfer.component';
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TransferPanelComponent } from './transfer-panel/transfer-panel.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    BalancePanelComponent,
    TransferPanelComponent,
    FormTransferComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsMaterialModule,
    SharedModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
