import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNewActivityPageRoutingModule } from './create-new-activity-routing.module';

import { CreateNewActivityPage } from './create-new-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewActivityPageRoutingModule,
  ],
  declarations: [CreateNewActivityPage],
})
export class CreateNewActivityPageModule {}
