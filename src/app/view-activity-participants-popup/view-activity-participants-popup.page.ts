import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';

@Component({
  selector: 'app-view-activity-participants-popup',
  templateUrl: './view-activity-participants-popup.page.html',
  styleUrls: ['./view-activity-participants-popup.page.scss'],
})
export class ViewActivityParticipantsPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  async closeModel() {
    await this.modalController.dismiss();
  }

  addComment(comment: string) {
    console.log(comment);
  }
}
