import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivityPopupPage } from './view-activity-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActivityPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivityPopupPageRoutingModule {}
