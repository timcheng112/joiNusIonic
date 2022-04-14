import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMyProfilePage } from './edit-my-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditMyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMyProfilePageRoutingModule {}
