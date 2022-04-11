import { Component, OnInit } from '@angular/core';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';
import { ModalController } from '@ionic/angular';
import { ViewActivityPopupPage } from '../view-activity-popup/view-activity-popup.page';
import { SessionService } from '../services/session.service';
import { ViewActivityParticipantsPopupPage } from '../view-activity-participants-popup/view-activity-participants-popup.page';
import { ViewActivityBookingPopupPage } from '../view-activity-booking-popup/view-activity-booking-popup.page';

@Component({
  selector: 'app-view-my-activities',
  templateUrl: './view-my-activities.page.html',
  styleUrls: ['./view-my-activities.page.scss'],
})
export class ViewMyActivitiesPage implements OnInit {
  activities: ActivityEntity[] | null;
  userId: number | null;
  type: string = 'all';
  modalData: any;

  constructor(private activityService: ActivityService,
    public modalController: ModalController,
    private sessionService: SessionService) {
    this.activities = new Array();
  }

  ngOnInit() {
    this.activityService.getActivities().subscribe({
      next: (response) => {
        this.activities = response;
      },
      error: (error) => {
        console.log('********** ViewMyActivitiesComponent.ts: ' + error);
      },
    });

    this.userId = 2;
    // this.userId = this.sessionService.getUserId();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed to ' + ev.target.value);
    this.type = ev.target.value;
  }

  async openIonModal(activity: ActivityEntity, task: number) {
    if (task == 1) {
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
    } else if (task == 2) {
      const modal = await this.modalController.create({
        component: ViewActivityParticipantsPopupPage,
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
    } else {
      const modal = await this.modalController.create({
        component: ViewActivityBookingPopupPage,
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

}

