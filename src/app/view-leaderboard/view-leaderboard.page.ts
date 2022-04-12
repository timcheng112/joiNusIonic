import { Component, OnInit } from '@angular/core';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-leaderboard',
  templateUrl: './view-leaderboard.page.html',
  styleUrls: ['./view-leaderboard.page.scss'],
})
export class ViewLeaderboardPage implements OnInit {
  leaderboard: NormalUserEntity[] | null;
  currentUser: NormalUserEntity | null;
  rank: number | -1;

  constructor(
    private normalUserService: NormalUserService,
    private sessionService: SessionService
  ) {
    this.leaderboard = new Array();
  }

  ngOnInit() {
    this.currentUser = this.sessionService.getCurrentNormalUser();

    this.normalUserService
      .retrieveNormalUserRank(this.currentUser.userId)
      .subscribe({
        next: (response) => {
          this.rank = response;
        },
        error: (error) => {
          console.log('view-leaderboard.ts + ' + error);
        },
      });

    this.normalUserService.retrieveLeaderboard().subscribe({
      next: (response) => {
        this.leaderboard = response;
      },
      error: (error) => {
        console.log('view-leaderboard.ts + ' + error);
      },
    });
    console.log('HELLO WORLD');
    console.log(
      'HELLO ERROR ' + this.currentUser + this.rank + this.leaderboard
    );
  }
}
