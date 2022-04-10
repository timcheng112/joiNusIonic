import { Component, OnInit } from '@angular/core';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-create-new-activity',
  templateUrl: './create-new-activity.page.html',
  styleUrls: ['./create-new-activity.page.scss'],
})
export class CreateNewActivityPage implements OnInit {
  activity: ActivityEntity;
  message: string | undefined;

  constructor(private activityService: ActivityService) {
    this.activity = new ActivityEntity();
  }

  ngOnInit() {}

  createActivity() {
    this.activityService.createNewActivity(this.activity).subscribe({
      next: (response) => {
        let newActivityId: number = response;
        this.message =
          'New activity ' + newActivityId + ' created successfully';
      },
      error: (error) => {
        this.message =
          'An error has occurred while creating the new activity: ' + error;

        console.log('********** CreateNewActivityComponent.ts: ' + error);
      },
    });
  }
}
