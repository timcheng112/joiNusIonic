import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivityParticipantsPopupPageRoutingModule } from './view-activity-participants-popup-routing.module';

import { ViewActivityParticipantsPopupPage } from './view-activity-participants-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivityParticipantsPopupPageRoutingModule
  ],
  declarations: [ViewActivityParticipantsPopupPage]
})
export class ViewActivityParticipantsPopupPageModule {}
