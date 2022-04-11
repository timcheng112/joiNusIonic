import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';

@Component({
  selector: 'app-view-activity-booking-popup',
  templateUrl: './view-activity-booking-popup.page.html',
  styleUrls: ['./view-activity-booking-popup.page.scss'],
})
export class ViewActivityBookingPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  async closeModel() {
    await this.modalController.dismiss();
  }

}
