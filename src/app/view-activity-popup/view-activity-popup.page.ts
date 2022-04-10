import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';

@Component({
  selector: 'app-view-activity-popup',
  templateUrl: './view-activity-popup.page.html',
  styleUrls: ['./view-activity-popup.page.scss'],
})
export class ViewActivityPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  constructor(private modalController: ModalController) {}
  ngOnInit() {}
  async closeModel() {
    await this.modalController.dismiss();
  }
}
