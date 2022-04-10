import { Component, OnInit } from '@angular/core';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-view-my-activities',
  templateUrl: './view-my-activities.page.html',
  styleUrls: ['./view-my-activities.page.scss'],
})
export class ViewMyActivitiesPage implements OnInit {
  activities: ActivityEntity[] | null;

  constructor(private activityService: ActivityService) {
    this.activities = new Array();
  }

  ngOnInit() {
    this.activityService.getMyActivities().subscribe({
      next: (response) => {
        this.activities = response;
      },
      error: (error) => {
        console.log('********** ViewAllActivitiesComponent.ts: ' + error);
      },
    });
  }
}
