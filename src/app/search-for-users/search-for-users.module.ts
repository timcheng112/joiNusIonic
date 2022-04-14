import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchForUsersPageRoutingModule } from './search-for-users-routing.module';

import { SearchForUsersPage } from './search-for-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchForUsersPageRoutingModule
  ],
  declarations: [SearchForUsersPage]
})
export class SearchForUsersPageModule {}
