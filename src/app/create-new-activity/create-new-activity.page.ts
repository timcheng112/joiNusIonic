import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';
import { CategoryEntity } from '../models/category-entity';
import { FacilityEntity } from '../models/facility-entity';
import { TimeSlotEntity } from '../models/time-slot-entity';
import { ActivityService } from '../services/activity.service';
import { CategoryService } from '../services/category.service';
import { FacilityService } from '../services/facility.service';
import { TimeSlotService } from '../services/time-slot.service';

@Component({
  selector: 'app-create-new-activity',
  templateUrl: './create-new-activity.page.html',
  styleUrls: ['./create-new-activity.page.scss'],
})
export class CreateNewActivityPage implements OnInit {
  facilityId: number;
  facilities: FacilityEntity[];
  categoryId: number;
  categories: CategoryEntity[];
  // tags: string[];
  message: string | undefined;
  minDate: Date;
  minDateString: string;
  maxDate: Date;
  maxDateString: string;
  timeSlots: TimeSlotEntity[];
  availTimeSlots: Date[];
  timeSlotId: number | null;
  newActivity: ActivityEntity;
  submitted: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  location: string;

  constructor(
    private activityService: ActivityService,
    private facilityService: FacilityService,
    private categoryService: CategoryService,
    private timeSlotService: TimeSlotService,
    public alertController: AlertController
  ) {
    this.timeSlotId = null;
    this.newActivity = new ActivityEntity();
    this.newActivity.tags = new Array();
    this.availTimeSlots = new Array();
    this.minDate = new Date(new Date().setDate(new Date().getDate() + 7));
    this.maxDate = new Date(new Date().setDate(this.minDate.getDate() + 7));
    this.minDateString = this.formatDate(this.minDate);
    this.maxDateString = this.formatDate(this.maxDate);
    this.submitted = false;
    this.resultSuccess = false;
    this.resultError = false;
    this.location = '';
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
    this.timeSlotService.getAllAvailTimeSlots().subscribe({
      next: (response) => {
        this.timeSlots = response;
      },
      error: (error) => {
        console.log('********** CreateNewActivityComponent.ts: ' + error);
      },
    });
  }

  clear() {
    this.submitted = false;
    this.newActivity = new ActivityEntity();
  }

  getAvailTimeSlotsByDate(datePicked: Date) {
    this.availTimeSlots = new Array();
    for (let timeSlot of this.timeSlots) {
      let tempDate = timeSlot.timeSlotTime;
      let tempDateString =
        tempDate[0] +
        tempDate[1] +
        tempDate[2] +
        tempDate[3] +
        tempDate[4] +
        tempDate[5] +
        tempDate[6] +
        tempDate[7] +
        tempDate[8] +
        tempDate[9];
      let datePickedString =
        datePicked[0] +
        datePicked[1] +
        datePicked[2] +
        datePicked[3] +
        datePicked[4] +
        datePicked[5] +
        datePicked[6] +
        datePicked[7] +
        datePicked[8] +
        datePicked[9];
      let tempDateTimeString = tempDate[11] + tempDate[12];
      console.log(tempDate);
      console.log(tempDateString);
      console.log(datePickedString);
      if (tempDateString === datePickedString) {
        let year =
          tempDateString[0] +
          tempDateString[1] +
          tempDateString[2] +
          tempDateString[3];
        let month = tempDateString[5] + tempDateString[6];
        let day = tempDateString[8] + tempDateString[9];
        let hour: number = +tempDateTimeString + 8;
        this.availTimeSlots.push(new Date(year, month, day, hour, 0, 0, 0));
      }
    }
    for (let availTimeSlot of this.availTimeSlots) {
      console.log(availTimeSlot);
    }
  }

  selectTimeslot(timeSlotPicked: number) {
    console.log(timeSlotPicked);
    for (let timeSlot of this.timeSlots) {
      let tempHour: number =
        +(timeSlot.timeSlotTime[11] + timeSlot.timeSlotTime[12]) + 8;
      console.log(tempHour);
      if (timeSlotPicked === tempHour) {
        console.log('same time');
        this.timeSlotId = timeSlot.timeSlotId;
        break;
      }
    }
    console.log(this.timeSlotId);
  }

  formatDate(date) {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  create(createActivityForm: NgForm, datePicked: Date) {
    if (!(this.location === '')) {
      this.newActivity.activityDescription =
        this.newActivity.activityDescription + '; Location: ' + this.location;
    }

    console.log('Activity Name: ' + this.newActivity.activityName);
    console.log(
      'Activity Description: ' + this.newActivity.activityDescription
    );
    console.log(
      'Activity Max Participants: ' + this.newActivity.maxParticipants
    );
    console.log('Activity Tags: ' + this.newActivity.tags);
    console.log('Activity Category ID: ' + this.categoryId);
    console.log('Activity Facility ID: ' + this.facilityId);
    console.log('Activity Timeslot ID: ' + this.timeSlotId);
    console.log('Activity Entity: ' + this.newActivity);

    let year: number;
    let month: number;
    let day: number;
    let hour: number;
    let minute: number;
    if (datePicked != null || datePicked != undefined) {
      let yearDateTimeString =
        datePicked.toLocaleString()[0] +
        datePicked.toLocaleString()[1] +
        datePicked.toLocaleString()[2] +
        datePicked.toLocaleString()[3];
      year = +yearDateTimeString;
      let monthDateTimeString =
        datePicked.toLocaleString()[5] + datePicked.toLocaleString()[6];
      month = +monthDateTimeString;
      let dayDateTimeString =
        datePicked.toLocaleString()[8] + datePicked.toLocaleString()[9];
      day = +dayDateTimeString;
      let hourDateTimeString =
        datePicked.toLocaleString()[11] + datePicked.toLocaleString()[12];
      hour = +hourDateTimeString;
      let minuteDateTimeString =
        datePicked.toLocaleString()[14] + datePicked.toLocaleString()[15];
      minute = +minuteDateTimeString;
    }

    this.submitted = true;

    if (createActivityForm.valid) {
      if (this.timeSlotId != null) {
        this.activityService
          .createNewActivity(
            this.newActivity.activityName,
            this.newActivity.activityDescription,
            this.newActivity.maxParticipants,
            this.newActivity.tags,
            this.categoryId,
            this.timeSlotId
          )
          .subscribe({
            next: (response) => {
              let newActivityId: number = response;
              this.resultSuccess = true;
              this.resultError = false;
              this.message =
                'New activity ' + newActivityId + ' created successfully';
              this.presentSuccess();
              this.newActivity = new ActivityEntity();
              this.categoryId = undefined;
              this.timeSlotId = undefined;
              this.availTimeSlots = new Array();
              this.submitted = false;
              createActivityForm.reset();
            },
            error: (error) => {
              this.resultError = true;
              this.resultSuccess = false;
              this.message =
                'An error has occurred while creating the new activity: ' +
                error;

              console.log('********** CreateNewActivityPage: ' + error);
              this.presentWarning();
            },
          });
      } else {
        this.activityService
          .createNewNoFacilityActivity(
            this.newActivity.activityName,
            this.newActivity.activityDescription,
            this.newActivity.maxParticipants,
            this.newActivity.tags,
            this.categoryId,
            this.timeSlotId,
            year,
            month,
            day,
            hour,
            minute
          )
          .subscribe({
            next: (response) => {
              let newActivityId: number = response;
              this.resultSuccess = true;
              this.resultError = false;
              this.message =
                'New activity ' + newActivityId + ' created successfully';
              this.presentSuccess();
              this.newActivity = new ActivityEntity();
              this.categoryId = undefined;
              this.timeSlotId = undefined;
              this.availTimeSlots = new Array();
              this.submitted = false;
              createActivityForm.reset();
            },
            error: (error) => {
              this.resultError = true;
              this.resultSuccess = false;
              this.message =
                'An error has occurred while creating the new activity: ' +
                error;

              console.log('********** CreateNewActivityPage: ' + error);
              this.presentWarning();
            },
          });
      }
    }
    this.presentWarning();
  }

  async presentWarning() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error with fields, please try again',
      message: this.message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  addTag(tag: string) {
    console.log(tag);
    console.log(this.minDateString);
    console.log(this.maxDateString);
    if (tag != '') {
      this.newActivity.tags.push(tag);
    }
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: this.message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
