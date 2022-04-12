import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivityParticipatingPopupPageRoutingModule } from './view-activity-participating-popup-routing.module';

import { ViewActivityParticipatingPopupPage } from './view-activity-participating-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivityParticipatingPopupPageRoutingModule
  ],
  declarations: [ViewActivityParticipatingPopupPage]
})
export class ViewActivityParticipatingPopupPageModule {}
