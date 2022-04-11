import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';
import { NormalUserEntity } from '../models/normal-user-entity';

@Component({
  selector: 'app-view-activity-participants-popup',
  templateUrl: './view-activity-participants-popup.page.html',
  styleUrls: ['./view-activity-participants-popup.page.scss'],
})
export class ViewActivityParticipantsPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  participants: NormalUserEntity[];
  absentIds: number[];
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.participants = this.activityBeingViewed.participants;
  }
  async closeModel() {
    await this.modalController.dismiss();
  }

  
}
