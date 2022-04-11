import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivityBookingPopupPage } from './view-activity-booking-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActivityBookingPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivityBookingPopupPageRoutingModule {}
