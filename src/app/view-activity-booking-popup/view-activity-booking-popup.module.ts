import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivityBookingPopupPageRoutingModule } from './view-activity-booking-popup-routing.module';

import { ViewActivityBookingPopupPage } from './view-activity-booking-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivityBookingPopupPageRoutingModule
  ],
  declarations: [ViewActivityBookingPopupPage]
})
export class ViewActivityBookingPopupPageModule {}
