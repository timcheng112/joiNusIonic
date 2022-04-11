import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivityFacilityPopupPage } from './view-activity-facility-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActivityFacilityPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivityFacilityPopupPageRoutingModule {}
