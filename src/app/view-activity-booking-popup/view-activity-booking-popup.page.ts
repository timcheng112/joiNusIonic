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
  path:string | null;

  constructor(private modalController: ModalController) { }

  ngOnInit() { 
    
    const tempPath = this.activityBeingViewed.booking.timeSlot.facility.facilityImage.imagePath;
    console.log(tempPath);
    console.log("../../assets/images/" + tempPath.slice(15));
    this.path = "../assets/images/" + tempPath.slice(15);
  }
  async closeModel() {
    await this.modalController.dismiss();
  }

  // getImagePath() : string {
  //   let path:string = this.activityBeingViewed.booking.timeSlot.facility.facilityImage.imagePath;
  //   console.log(path);
  //   console.log(path.slice(15,path.length));

  //   return this.activityBeingViewed.booking.timeSlot.facility.facilityImage.imagePath;
  // }

}
