import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CreateNewActivityPage } from '../create-new-activity/create-new-activity.page';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';
import { ViewActivityPopupPage } from '../view-activity-popup/view-activity-popup.page';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-all-activities',
  templateUrl: './view-all-activities.page.html',
  styleUrls: ['./view-all-activities.page.scss'],
})
export class ViewAllActivitiesPage implements OnInit {
  activities: ActivityEntity[] | null;
  userId: number | null;
  modalData: any;

  constructor(
    private activityService: ActivityService,
    public modalController: ModalController,
    private sessionService: SessionService
  ) {
    this.activities = new Array();
  }

  ngOnInit() {
    this.userId = this.sessionService.getUserId();
    this.activityService.getActivitiesIP(this.userId).subscribe({
      next: (response) => {
        console.log('first response');
        console.log(response);
        response = response.filter((item) => (!item.activityOver));
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
        console.log('final response');
        console.log(response);

        console.log('distinctIds b4');
        const distinctIds = [...new Set(response.map(x => x.activityId))];
        console.log(distinctIds);
        const newResponse = new Array<ActivityEntity>();
        for (var i = 0; i < response.length; i++) {
          if (distinctIds.includes(response[i].activityId)) { // shd include, update distinct ids list
          newResponse.push(response[i]);
            for (var j = 0; j < distinctIds.length; j++) { // remove from distinct ids
              if (distinctIds[j] == response[i].activityId) {
                distinctIds.splice(j,1);
              }
            }
          } else { // remove from response
            // response.splice(i, 1);
          }
        }
        console.log('distinctIds after');
        console.log(distinctIds);

        console.log('unique response');
        console.log(newResponse);
        this.activities = newResponse;
      },
      error: (error) => {
        console.log('********** ViewAllActivitiesComponent.ts: ' + error);
      },
    });
  }

  ionViewWillEnter() {
    this.activityService.getActivitiesIP(this.userId).subscribe({
      next: (response) => {
        response = response.filter((item) => !item.activityOver);
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
        const distinctIds = [...new Set(response.map(x => x.activityId))];
        console.log(distinctIds);
        const newResponse = new Array<ActivityEntity>();
        for (var i = 0; i < response.length; i++) {
          if (distinctIds.includes(response[i].activityId)) { // shd include, update distinct ids list
          newResponse.push(response[i]);
            for (var j = 0; j < distinctIds.length; j++) { // remove from distinct ids
              if (distinctIds[j] == response[i].activityId) {
                distinctIds.splice(j,1);
              }
            }
          } else { // remove from response
            // response.splice(i, 1);
          }
        }
        console.log('distinctIds after');
        console.log(distinctIds);

        console.log('unique response');
        console.log(newResponse);
        this.activities = newResponse;
      },
      error: (error) => {
        console.log('********** ViewAllActivitiesComponent.ts: ' + error);
      },
    });
  }

  formatTime(activity: ActivityEntity) {
    let date: Date = activity.booking.timeSlot.timeSlotTime;
    let dateString: string = date.toString();

    let newDate: Date = new Date(
      parseInt(dateString.slice(0, 4)),
      parseInt(dateString.slice(5, 7)) - 1,
      parseInt(dateString.slice(8, 10)),
      parseInt(dateString.slice(11, 13)),
      parseInt(dateString.slice(14, 16)),
      parseInt(dateString.slice(17, 19))
    );
    console.log(newDate);

    return newDate.setUTCHours(newDate.getUTCHours() + 8);
  }

  isUserInActivity(activityBeingViewed: ActivityEntity) {
    if (
      activityBeingViewed.activityOwner.userId ===
      this.sessionService.getCurrentNormalUser().userId
    ) {
      console.log('user is in activity');
      return true;
    }
    for (let participant of activityBeingViewed.participants) {
      if (
        participant.userId === this.sessionService.getCurrentNormalUser().userId
      ) {
        console.log('user is in activity');
        return true;
      }
    }
    console.log('user is not in activity');
    return false;
  }

  async openIonModal(index: number) {
    console.log(this.activities[index]);
    let isUserInActivityBoolean = this.isUserInActivity(this.activities[index]);
    const modal = await this.modalController.create({
      component: ViewActivityPopupPage,
      componentProps: {
        activityBeingViewed: this.activities[index],
        isUserInActivity: isUserInActivityBoolean,
      },
    });
    modal.onDidDismiss().then((modalData) => {
      if (modalData !== null) {
        this.modalData = modalData.data;
        console.log('Modal Data : ' + modalData.data);
      }
    });
    return await modal.present();
  }
}
