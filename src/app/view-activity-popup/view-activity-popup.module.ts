import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivityPopupPageRoutingModule } from './view-activity-popup-routing.module';

import { ViewActivityPopupPage } from './view-activity-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivityPopupPageRoutingModule
  ],
  declarations: [ViewActivityPopupPage]
})
export class ViewActivityPopupPageModule {}
