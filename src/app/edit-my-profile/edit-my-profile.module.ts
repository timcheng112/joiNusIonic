import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMyProfilePageRoutingModule } from './edit-my-profile-routing.module';

import { EditMyProfilePage } from './edit-my-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMyProfilePageRoutingModule
  ],
  declarations: [EditMyProfilePage]
})
export class EditMyProfilePageModule {}
