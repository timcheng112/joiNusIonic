import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLeaderboardPage } from './view-leaderboard.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLeaderboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLeaderboardPageRoutingModule {}
