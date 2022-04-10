import { Component, OnInit } from '@angular/core';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-view-all-activities',
  templateUrl: './view-all-activities.page.html',
  styleUrls: ['./view-all-activities.page.scss'],
})
export class ViewAllActivitiesPage implements OnInit {
  activities: ActivityEntity[] | null;

  constructor(private activityService: ActivityService) {
    this.activities = new Array();
  }

  ngOnInit() {
    this.activityService.getActivities().subscribe({
      next: (response) => {
        this.activities = response;
      },
      error: (error) => {
        console.log('********** ViewAllActivitiesComponent.ts: ' + error);
      },
    });
  }
}
