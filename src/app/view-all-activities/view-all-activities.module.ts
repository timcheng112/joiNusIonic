import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllActivitiesPageRoutingModule } from './view-all-activities-routing.module';

import { ViewAllActivitiesPage } from './view-all-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAllActivitiesPageRoutingModule
  ],
  declarations: [ViewAllActivitiesPage]
})
export class ViewAllActivitiesPageModule {}
