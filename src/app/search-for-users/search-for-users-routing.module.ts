import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchForUsersPage } from './search-for-users.page';

const routes: Routes = [
  {
    path: '',
    component: SearchForUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchForUsersPageRoutingModule {}
