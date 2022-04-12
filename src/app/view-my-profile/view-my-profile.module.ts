import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMyProfilePageRoutingModule } from './view-my-profile-routing.module';

import { ViewMyProfilePage } from './view-my-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMyProfilePageRoutingModule
  ],
  declarations: [ViewMyProfilePage]
})
export class ViewMyProfilePageModule {}
