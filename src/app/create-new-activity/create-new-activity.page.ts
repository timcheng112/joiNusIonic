import { Component, OnInit } from '@angular/core';
import { ActivityEntity } from '../models/activity-entity';
import { CategoryEntity } from '../models/category-entity';
import { FacilityEntity } from '../models/facility-entity';
import { ActivityService } from '../services/activity.service';
import { CategoryService } from '../services/category.service';
import { FacilityService } from '../services/facility.service';

@Component({
  selector: 'app-create-new-activity',
  templateUrl: './create-new-activity.page.html',
  styleUrls: ['./create-new-activity.page.scss'],
})
export class CreateNewActivityPage implements OnInit {
  activity: ActivityEntity;
  facilityName: string;
  facilities: FacilityEntity[];
  categoryName: string;
  categories: CategoryEntity[];
  message: string | undefined;

  constructor(
    private activityService: ActivityService,
    private facilityService: FacilityService,
    private categoryService: CategoryService
  ) {
    this.activity = new ActivityEntity();
  }

  ngOnInit() {
    this.facilityService.getFacilities().subscribe({
      next: (response) => {
        this.facilities = response;
      },
      error: (error) => {
        console.log('********** CreateNewActivityComponent.ts: ' + error);
      },
    });
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log('********** CreateNewActivityComponent.ts: ' + error);
      },
    });
  }

  createActivity() {
    this.activityService
      .createNewActivity(this.activity, this.facilityName)
      .subscribe({
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
