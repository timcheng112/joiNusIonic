import { Component, OnInit } from '@angular/core';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';
import { ModalController } from '@ionic/angular';
import { ViewActivityPopupPage } from '../view-activity-popup/view-activity-popup.page';
import { SessionService } from '../services/session.service';
import { ViewActivityParticipantsPopupPage } from '../view-activity-participants-popup/view-activity-participants-popup.page';
import { ViewActivityBookingPopupPage } from '../view-activity-booking-popup/view-activity-booking-popup.page';
import { NormalUserEntity } from '../models/normal-user-entity';
import { ViewActivityParticipatingPopupPage } from '../view-activity-participating-popup/view-activity-participating-popup.page';

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

    // this.userId = 2; need to change
    this.userId = this.sessionService.getUserId() | 2;
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
    } else if (task == 3) {
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
    } else if (task == 4) {
      const modal = await this.modalController.create({
        component: ViewActivityParticipatingPopupPage,
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

  checkUserHostUpcoming(activity : ActivityEntity) : boolean {
    if (activity.activityOwner.userId == this.userId) {
      if (!activity.activityOver) {
        return true;
      }
    }
    return false;
  }

  checkUserParticipating(activity : ActivityEntity) : boolean {
    let participants :NormalUserEntity[] = activity.participants;
    let date:Date = activity.booking.timeSlot.timeSlotTime;
    let dateString:string = date.toString();

    let newDate:Date = new Date(parseInt(dateString.slice(0,4)), parseInt(dateString.slice(5,7)) - 1, parseInt(dateString.slice(8,10)), parseInt(dateString.slice(11,13)), parseInt(dateString.slice(14,16)), parseInt(dateString.slice(17,19)));
    
    newDate.setUTCHours(newDate.getUTCHours()+8);

    for (var val of participants) {
      if (val.userId == this.userId && newDate >= new Date()) {
        return true;
      }
    }
    return false;
  }

  checkUserPast(activity : ActivityEntity) : boolean {
    let participants :NormalUserEntity[] = activity.participants;
    let date:Date = activity.booking.timeSlot.timeSlotTime;
    let dateString:string = date.toString();

    // let year:string = date.toString().;
    // let month:string = date.toString().slice(5,7);
    // let dateOf:string = date.toString().slice(8,10);
    // let hour:string = date.toString().slice(11,13);
    // let min:string = date.toString().slice(14,16);
    // let sec:string = date.toString().slice(17,19);
    let newDate:Date = new Date(parseInt(dateString.slice(0,4)), parseInt(dateString.slice(5,7)) - 1, parseInt(dateString.slice(8,10)), parseInt(dateString.slice(11,13)), parseInt(dateString.slice(14,16)), parseInt(dateString.slice(17,19)));
    
    newDate.setUTCHours(newDate.getUTCHours()+8);
    // console.log(newDate);
    // console.log(new Date());
    // console.log(newDate < new Date());

    for (var val of participants) {
      if (val.userId == this.userId && newDate < new Date()) {
        return true;
      }
    }
    return false;
  }


}

