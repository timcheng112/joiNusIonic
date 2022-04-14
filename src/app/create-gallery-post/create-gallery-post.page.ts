import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';
import { ActivityService } from '../services/activity.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-create-gallery-post',
  templateUrl: './create-gallery-post.page.html',
  styleUrls: ['./create-gallery-post.page.scss'],
})
export class CreateGalleryPostPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  // imagePath: string;
  // imageDescription: string;
  submitted: boolean;
  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  constructor(
    private modalController: ModalController,
    private sessionService: SessionService,
    private activityService: ActivityService
  ) {}

  ngOnInit() {}

  async closeModel() {
    await this.modalController.dismiss();
  }

  clear() {
    this.submitted = false;
    // this.imagePath = '';
    // this.imageDescription = '';
  }

  create(
    createGalleryPostForm: NgForm,
    imagePath: string,
    imageDescription: string
  ) {
    this.submitted = true;

    if (createGalleryPostForm.valid) {
      this.activityService
        .createGalleryPost(
          imagePath,
          imageDescription,
          new Date(),
          this.sessionService.getCurrentNormalUser(),
          this.activityBeingViewed.activityId
        )
        .subscribe({
          next: (response) => {
            let newGalleryPostId: number = response;
            this.resultSuccess = true;
            this.resultError = false;
            this.message =
              'New gallery post ' + newGalleryPostId + ' created successfully';
            this.submitted = false;
            createGalleryPostForm.reset();
            // this.presentSuccess();
          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message =
              'An error has occurred while creating the new activity: ' + error;

            console.log('********** CreateNewActivityPage: ' + error);
            // this.presentWarning();
          },
        });
    }
  }
}
