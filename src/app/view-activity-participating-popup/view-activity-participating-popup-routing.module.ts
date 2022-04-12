import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivityParticipatingPopupPage } from './view-activity-participating-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActivityParticipatingPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivityParticipatingPopupPageRoutingModule {}
