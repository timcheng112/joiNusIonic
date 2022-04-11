import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivityFacilityPopupPageRoutingModule } from './view-activity-facility-popup-routing.module';

import { ViewActivityFacilityPopupPage } from './view-activity-facility-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivityFacilityPopupPageRoutingModule
  ],
  declarations: [ViewActivityFacilityPopupPage]
})
export class ViewActivityFacilityPopupPageModule {}
