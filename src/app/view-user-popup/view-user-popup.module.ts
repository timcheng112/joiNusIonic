import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUserPopupPageRoutingModule } from './view-user-popup-routing.module';

import { ViewUserPopupPage } from './view-user-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUserPopupPageRoutingModule
  ],
  declarations: [ViewUserPopupPage]
})
export class ViewUserPopupPageModule {}
