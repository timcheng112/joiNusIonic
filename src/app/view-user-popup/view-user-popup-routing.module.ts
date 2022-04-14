import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserPopupPage } from './view-user-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUserPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUserPopupPageRoutingModule {}
