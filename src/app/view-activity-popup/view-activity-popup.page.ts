import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateGalleryPostPage } from '../create-gallery-post/create-gallery-post.page';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-view-activity-popup',
  templateUrl: './view-activity-popup.page.html',
  styleUrls: ['./view-activity-popup.page.scss'],
})
export class ViewActivityPopupPage implements OnInit {
  // @Input() activities: ActivityEntity[];
  // @Input() activityBeingViewedIndex: number;
  @Input() activityBeingViewed: ActivityEntity;
  @Input() isUserInActivity: Boolean;
  // activityBeingViewed: ActivityEntity;
  comment: string;
  type: string;

  constructor(
    private modalController: ModalController,
    private activityService: ActivityService,
    public alertController: AlertController
  ) {
    this.type = 'details';
  }

  ngOnInit() {
    this.getActivityByActivityId();
  }

  getActivityByActivityId() {
    console.log('getting activity by id');
    console.log(this.activityBeingViewed);
    this.activityService
      .getActivityByActivityId(this.activityBeingViewed.activityId)
      .subscribe({
        next: (response) => {
          console.log('getting activity by id success');
          if (response.booking != null) {
            let date: Date = response.booking.timeSlot.timeSlotTime;
            let dateString: string = date.toString();

            let newDate: Date = new Date(
              parseInt(dateString.slice(0, 4)),
              parseInt(dateString.slice(5, 7)) - 1,
              parseInt(dateString.slice(8, 10)),
              parseInt(dateString.slice(11, 13)),
              parseInt(dateString.slice(14, 16)),
              parseInt(dateString.slice(17, 19))
            );

            newDate.setUTCHours(newDate.getUTCHours() + 8);
            newDate.setUTCSeconds(0);
            response.booking.timeSlot.timeSlotTime = newDate;

            let date2: Date = response.booking.creationDate;
            let dateString2: string = date2.toString();

            let newDate2: Date = new Date(
              parseInt(dateString2.slice(0, 4)),
              parseInt(dateString2.slice(5, 7)) - 1,
              parseInt(dateString2.slice(8, 10)),
              parseInt(dateString2.slice(11, 13)),
              parseInt(dateString2.slice(14, 16)),
              parseInt(dateString2.slice(17, 19))
            );

            newDate2.setUTCHours(newDate2.getUTCHours() + 8);
            newDate2.setUTCSeconds(0);
            response.booking.creationDate = newDate2;

            for (var val of response.comments) {
              let date3: Date = val.commentDate;
              let dateString3: string = date3.toString();

              let newDate3: Date = new Date(
                parseInt(dateString3.slice(0, 4)),
                parseInt(dateString3.slice(5, 7)) - 1,
                parseInt(dateString3.slice(8, 10)),
                parseInt(dateString3.slice(11, 13)),
                parseInt(dateString3.slice(14, 16)),
                parseInt(dateString3.slice(17, 19))
              );

              newDate3.setUTCHours(newDate3.getUTCHours() + 8);
              newDate3.setUTCSeconds(0);
              val.commentDate = newDate3;
            }

            for (var image of response.gallery) {
              let date4: Date = image.datePosted;
              let dateString4: string = date4.toString();

              let newDate4: Date = new Date(
                parseInt(dateString4.slice(0, 4)),
                parseInt(dateString4.slice(5, 7)) - 1,
                parseInt(dateString4.slice(8, 10)),
                parseInt(dateString4.slice(11, 13)),
                parseInt(dateString4.slice(14, 16)),
                parseInt(dateString4.slice(17, 19))
              );

              newDate4.setUTCHours(newDate4.getUTCHours() + 8);
              newDate4.setUTCSeconds(0);
              image.datePosted = newDate4;
            }
          }
          this.activityBeingViewed = response;
        },
        error: (error) => {
          console.log('********** ViewActivityPopupComponent.ts: ' + error);
        },
      });
  }

  async openIonModal() {
    const modal = await this.modalController.create({
      component: CreateGalleryPostPage,
      componentProps: {
        activityBeingViewed: this.activityBeingViewed,
      },
    });
    modal.onDidDismiss().then(() => {
      this.getActivityByActivityId();
    });
    return await modal.present();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed to ' + ev.target.value);
    this.type = ev.target.value;
  }

  signUpForActivity() {
    this.activityService
      .signUpForActivity(this.activityBeingViewed.activityId)
      .subscribe({
        next: (response) => {
          if (response.booking != null) {
            let date: Date = response.booking.timeSlot.timeSlotTime;
            let dateString: string = date.toString();

            let newDate: Date = new Date(
              parseInt(dateString.slice(0, 4)),
              parseInt(dateString.slice(5, 7)) - 1,
              parseInt(dateString.slice(8, 10)),
              parseInt(dateString.slice(11, 13)),
              parseInt(dateString.slice(14, 16)),
              parseInt(dateString.slice(17, 19))
            );

            newDate.setUTCHours(newDate.getUTCHours() + 8);
            newDate.setUTCSeconds(0);
            response.booking.timeSlot.timeSlotTime = newDate;

            let date2: Date = response.booking.creationDate;
            let dateString2: string = date2.toString();

            let newDate2: Date = new Date(
              parseInt(dateString2.slice(0, 4)),
              parseInt(dateString2.slice(5, 7)) - 1,
              parseInt(dateString2.slice(8, 10)),
              parseInt(dateString2.slice(11, 13)),
              parseInt(dateString2.slice(14, 16)),
              parseInt(dateString2.slice(17, 19))
            );

            newDate2.setUTCHours(newDate2.getUTCHours() + 8);
            newDate2.setUTCSeconds(0);
            response.booking.creationDate = newDate2;

            for (var val of response.comments) {
              let date3: Date = val.commentDate;
              let dateString3: string = date3.toString();

              let newDate3: Date = new Date(
                parseInt(dateString3.slice(0, 4)),
                parseInt(dateString3.slice(5, 7)) - 1,
                parseInt(dateString3.slice(8, 10)),
                parseInt(dateString3.slice(11, 13)),
                parseInt(dateString3.slice(14, 16)),
                parseInt(dateString3.slice(17, 19))
              );

              newDate3.setUTCHours(newDate3.getUTCHours() + 8);
              newDate3.setUTCSeconds(0);
              val.commentDate = newDate3;
            }
          }
          this.activityBeingViewed = response;
          this.isUserInActivity = true;
          console.log('successful sign up');
        },
        error: (error) => {
          this.presentWarning(error);
          console.log('********** ViewActivityPopupComponent.ts: ' + error);
        },
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'It will cost 2 Booking Tokens to join.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.signUpForActivity();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async closeModel() {
    await this.modalController.dismiss();
  }

  async presentWarning(error) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'You have already signed up, the activity is already full, or you have insufficient tokens!',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  create(addCommentForm: NgForm) {
    console.log(this.comment);
    if (this.comment != '') {
      this.activityService
        .addComment(this.comment, this.activityBeingViewed.activityId)
        .subscribe({
          next: (response) => {
            console.log('add comment successful');
            // this.activityBeingViewed = response;
            addCommentForm.reset();
            this.getActivityByActivityId();
          },
          error: (error) => {
            console.log('********** CreateNewActivityPage: ' + error);
          },
        });
    }
  }
}
