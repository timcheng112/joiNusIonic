import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CreateNewActivityPage } from '../create-new-activity/create-new-activity.page';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';
import { ViewActivityPopupPage } from '../view-activity-popup/view-activity-popup.page';

@Component({
  selector: 'app-view-all-activities',
  templateUrl: './view-all-activities.page.html',
  styleUrls: ['./view-all-activities.page.scss'],
})
export class ViewAllActivitiesPage implements OnInit {
  activities: ActivityEntity[] | null;
  modalData: any;

  constructor(
    private activityService: ActivityService,
    public modalController: ModalController
  ) {
    this.activities = new Array();
  }

  ngOnInit() {
    this.activityService.getActivities().subscribe({
      next: (response) => {
        response = response.filter(item => !item.activityOver)
        this.activities = response;
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

  async openIonModal(activity: ActivityEntity) {
    const modal = await this.modalController.create({
      component: ViewActivityPopupPage,
      componentProps: {
        activityBeingViewed: activity,
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
