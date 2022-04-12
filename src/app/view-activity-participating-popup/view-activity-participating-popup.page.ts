import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { ActivityEntity } from '../models/activity-entity';
import { NormalUserEntity } from '../models/normal-user-entity';

@Component({
  selector: 'app-view-activity-participating-popup',
  templateUrl: './view-activity-participating-popup.page.html',
  styleUrls: ['./view-activity-participating-popup.page.scss'],
})
export class ViewActivityParticipatingPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  participants: NormalUserEntity[]; // temp list of users
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.participants = this.activityBeingViewed.participants;
  }

  async closeModel() {
    await this.modalController.dismiss();
  }
}
