import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { ViewActivityPopupPage } from '../view-activity-popup/view-activity-popup.page';

@Component({
  selector: 'app-view-user-popup',
  templateUrl: './view-user-popup.page.html',
  styleUrls: ['./view-user-popup.page.scss'],
})
export class ViewUserPopupPage implements OnInit {
  @Input() userToView: NormalUserEntity
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("Interests: " + this.userToView.interests)
    console.log("Activities: " + this.userToView.activitiesOwned)
  }

  async openIonModal(activity: ActivityEntity) {
    const modal = await this.modalController.create({
      component: ViewActivityPopupPage,
      componentProps: {
        activityBeingViewed: activity
      },
    });
    return await modal.present();
  }


  async closeModel() {
    await this.modalController.dismiss();
  }

}
