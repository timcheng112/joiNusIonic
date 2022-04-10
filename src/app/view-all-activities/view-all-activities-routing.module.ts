import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllActivitiesPage } from './view-all-activities.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllActivitiesPageRoutingModule {}
