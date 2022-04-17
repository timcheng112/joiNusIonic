import { Component, OnInit } from '@angular/core';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';
import { partition } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  leaderboard: NormalUserEntity[] | null;
  userId: number | null;
  rank: number | null;
  currUser: NormalUserEntity | null;
  activities: ActivityEntity[] | null;
  type: string = 'all';

  constructor(
    private normalUserService: NormalUserService,
    private sessionService: SessionService,
    private activityService: ActivityService
  ) {
    this.leaderboard = new Array();
    this.activities = new Array();
  }

  ngOnInit() {
    console.log('On Init');
    this.refreshUser();

    this.userId = this.sessionService.getUserId();
    const tempId: number = this.sessionService.getUserId();
    // console.log(this.userId);
    this.currUser = this.sessionService.getCurrentNormalUser();

    this.normalUserService.retrieveNormalUserRank(tempId).subscribe({
      next: (response) => {
        console.log('response is ' + response);
        this.rank = response;
      },
      error: (error) => {
        console.log('view-leaderboard.ts + ' + error);
      },
    });

    this.activityService.getActivities().subscribe({
      next: (response) => {
        for (var val of response) {
          let date: Date = val.booking.timeSlot.timeSlotTime;
          let dateString: string = date.toString();

          let newDate: Date = new Date(
            parseInt(dateString.slice(0, 4)),
            parseInt(dateString.slice(5, 7)) - 1,
            parseInt(dateString.slice(8, 10)),
            parseInt(dateString.slice(11, 13)),
            parseInt(dateString.slice(14, 16)),
            parseInt(dateString.slice(17, 19))
          );

          newDate.setUTCHours(newDate.getUTCHours() + 8);
          newDate.setUTCSeconds(0);
          val.booking.timeSlot.timeSlotTime = newDate;

          let date2: Date = val.booking.creationDate;
          let dateString2: string = date2.toString();

          let newDate2: Date = new Date(
            parseInt(dateString2.slice(0, 4)),
            parseInt(dateString2.slice(5, 7)) - 1,
            parseInt(dateString2.slice(8, 10)),
            parseInt(dateString2.slice(11, 13)),
            parseInt(dateString2.slice(14, 16)),
            parseInt(dateString2.slice(17, 19))
          );

          newDate2.setUTCHours(newDate2.getUTCHours() + 8);
          newDate2.setUTCSeconds(0);
          val.booking.creationDate = newDate2;
        }
        console.log('filter over');
        response = response.filter((item) => (!item.activityOver));
        console.log(response);
        console.log('filter user');
        const finalResponse = new Array<ActivityEntity>();
        var thisUser : NormalUserEntity = this.sessionService.getCurrentNormalUser();
        for (var val of response) {
          console.log('val is ');
          console.log(val);
          if (val.activityOwner.userId == thisUser.userId) {
            console.log('user is host');
            finalResponse.push(val);
          } else {
            for (var val2 of val.participants) {
              if (val2.userId == thisUser.userId) {
                console.log('user is participating');
                finalResponse.push(val);
                break;
              } else {
                console.log("this user does not need to see " + val.activityName);
                console.log(val.participants);
                console.log(thisUser);
              }
            }
          }
        }
        // response = response.filter((item) => item.participants.includes(this.sessionService.getCurrentNormalUser()) || item.activityOwner == this.sessionService.getCurrentNormalUser());
        console.log(finalResponse);
        this.activities = finalResponse;
      },
      error: (error) => {
        console.log('********** ViewMyActivitiesComponent.ts: ' + error);
      },
    });

    // console.log(this.rank);

    // this.normalUserService.retrieveNormalUserById(tempId).subscribe({
    //   next: (response) => {
    //     console.log('response is ' + response);
    //     this.currUser = response;
    //   },
    //   error: (error) => {
    //     console.log('view-leaderboard.ts + ' + error);
    //   },
    // });

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
  refreshUser() {
    //refresh currentNormalUser
    this.normalUserService
      .normalUserLogin(
        this.sessionService.getUsername(),
        this.sessionService.getPassword()
      )
      .subscribe({
        next: (response) => {
          let normalUser: NormalUserEntity = response;
          this.sessionService.setCurrentNormalUser(normalUser);
          console.log(
            'Refresh for name: ' +
              this.sessionService.getCurrentNormalUser().name
          );
        },
      });
  }

  getDateFormat(date: Date): string {
    let returnValue = '' + date.getDate() + ' ';

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const m = date.getMonth();
    let month = months[m];

    returnValue = returnValue + month + ' ';

    const y = date.getFullYear();

    returnValue = returnValue + y + ' ';

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = date.getDay();
    let day = days[d];

    returnValue = returnValue + day;

    return returnValue;
  }

  checkUserParticipating(activity: ActivityEntity): boolean {
    let participants: NormalUserEntity[] = activity.participants;

    for (var val of participants) {
      if (
        val.userId == this.userId &&
        activity.booking.timeSlot.timeSlotTime >= new Date()
      ) {
        return true;
      }
    }
    return false;
  }
}
