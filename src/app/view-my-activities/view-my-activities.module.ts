import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMyActivitiesPageRoutingModule } from './view-my-activities-routing.module';

import { ViewMyActivitiesPage } from './view-my-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMyActivitiesPageRoutingModule
  ],
  declarations: [ViewMyActivitiesPage]
})
export class ViewMyActivitiesPageModule {}
