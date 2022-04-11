import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivityParticipantsPopupPage } from './view-activity-participants-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActivityParticipantsPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivityParticipantsPopupPageRoutingModule {}
