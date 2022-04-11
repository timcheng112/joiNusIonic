import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';

@Component({
  selector: 'app-view-activity-facility-popup',
  templateUrl: './view-activity-facility-popup.page.html',
  styleUrls: ['./view-activity-facility-popup.page.scss'],
})
export class ViewActivityFacilityPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  async closeModel() {
    await this.modalController.dismiss();
  }

}
