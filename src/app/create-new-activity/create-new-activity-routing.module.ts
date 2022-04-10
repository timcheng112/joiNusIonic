import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewActivityPage } from './create-new-activity.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewActivityPageRoutingModule {}
