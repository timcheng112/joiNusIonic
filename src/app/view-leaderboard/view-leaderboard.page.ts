import { Component, OnInit } from '@angular/core';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';

@Component({
  selector: 'app-view-leaderboard',
  templateUrl: './view-leaderboard.page.html',
  styleUrls: ['./view-leaderboard.page.scss'],
})
export class ViewLeaderboardPage implements OnInit {
  leaderboard: NormalUserEntity[] | null;
  you: NormalUserEntity | null;

  constructor(private normalUserService: NormalUserService) {
    this.leaderboard = new Array();
  }

  ngOnInit() {
    this.normalUserService.getLeaderboard().subscribe({
      next: (response) => {
        this.leaderboard = response;
      },
      error: (error) => {
        console.log('view-leaderboard.ts + ' + error);
      },
    });
  }
}
