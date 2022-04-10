import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMyActivitiesPage } from './view-my-activities.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMyActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMyActivitiesPageRoutingModule {}
