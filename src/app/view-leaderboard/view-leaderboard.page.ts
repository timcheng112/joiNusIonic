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
  userId: number | null;
  rank: number | null;
  currUser: NormalUserEntity | null;

  constructor(
    private normalUserService: NormalUserService,
    private sessionService: SessionService
  ) {
    this.leaderboard = new Array();
  }

  ngOnInit() {
    console.log('On Init');

    this.userId = this.sessionService.getUserId() | 2;
    const tempId: number = this.sessionService.getUserId() | 2;
    // console.log(this.userId);

    this.normalUserService.retrieveNormalUserRank(tempId).subscribe({
      next: (response) => {
        console.log('response is ' + response);
        this.rank = response;
      },
      error: (error) => {
        console.log('view-leaderboard.ts + ' + error);
      },
    });
    // console.log(this.rank);

    this.normalUserService.retrieveNormalUserById(tempId).subscribe({
      next: (response) => {
        console.log('response is ' + response);
        this.currUser = response;
      },
      error: (error) => {
        console.log('view-leaderboard.ts + ' + error);
      },
    });

    this.normalUserService.retrieveLeaderboard().subscribe({
      next: (response) => {
        this.leaderboard = response;
        console.log(response);
      },
      error: (error) => {
        console.log('view-leaderboard.ts + ' + error);
      },
    });
    // console.log(this.leaderboard);
  }
}
