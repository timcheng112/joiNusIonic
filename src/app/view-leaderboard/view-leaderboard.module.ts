import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLeaderboardPageRoutingModule } from './view-leaderboard-routing.module';

import { ViewLeaderboardPage } from './view-leaderboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLeaderboardPageRoutingModule
  ],
  declarations: [ViewLeaderboardPage]
})
export class ViewLeaderboardPageModule {}
