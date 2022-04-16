import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { ActivityEntity } from '../models/activity-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { ActivityService } from '../services/activity.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-activity-participants-popup',
  templateUrl: './view-activity-participants-popup.page.html',
  styleUrls: ['./view-activity-participants-popup.page.scss'],
})
export class ViewActivityParticipantsPopupPage implements OnInit {
  @Input() activityBeingViewed: ActivityEntity;
  participants: NormalUserEntity[]; // temp list of users
  preCheck: boolean[]; // starting list for checked
  absentUsers: number[]; // temp list of absent user ids
  absentIds: number[]; // new list of absent ids for pushing to db

  resultSuccess: boolean;
  resultError: boolean;
  message: string;


  constructor(private modalController: ModalController, private activityService: ActivityService, public alertController: AlertController) {
    this.resultSuccess = false;
    this.resultError = false;
    this.absentIds = new Array<number>();
  }

  ngOnInit() {
    this.participants = this.activityBeingViewed.participants;
    // this.absentUsers = this.activityBeingViewed.absentIds;
    this.absentUsers = new Array<number>();
    for (var val of this.activityBeingViewed.absentIds) {
      this.absentUsers.push(val);
    }
    
    console.log(this.absentUsers);
    var preList = new Array<boolean>();
    for (var i = 0; i < this.participants.length; i++) {
      console.log("i is : " + i);
      if (this.absentUsers.includes(this.participants[i].userId)) {
        console.log("set as true");
        preList[i] = (true);
      } else {
        console.log("set as false");
        preList[i] = (false);
        console.log(preList[i]);
      }
    }
    this.preCheck = preList;
    console.log("precheck is " + this.preCheck);
  }

  async closeModel() {
    await this.modalController.dismiss();
  }

  fireEvent(i: number, ev: any) {
    console.log('id selected is: ' + i);

    if (this.absentUsers.includes(i)) { // if user alr in list, remove 
      console.log("includes");
      this.absentUsers.forEach((element, index) => {
        if (element == i) this.absentUsers.splice(index, 1);
      });
    } else { // if user not in list, add to list
      console.log("no include");
      this.absentUsers.push(i);
    }

    for (var val of this.activityBeingViewed.absentIds) { // existing banned ppl
      if (!this.absentUsers.includes(val)) { // make sure u cant remove already punished ppl
        this.absentUsers.push(val); // add back if they gt removed
      }
    }
    console.log("absentUsers : " + this.absentUsers);
  }

  punishUser() {
    console.log("Punish User Method called");
    console.log("Absent Users are " + this.absentUsers);
    console.log("Absent Ids are " + this.absentIds);
    console.log("Activity Absent Ids are ");
    console.log(this.activityBeingViewed.absentIds);
    for (var val of this.absentUsers) { // for ppl in temp list
      console.log("val");
      console.log(val);

      if (this.activityBeingViewed.absentIds)

      if (!this.activityBeingViewed.absentIds.includes(val)) { // if not already banned 
        console.log('should punish');
        this.absentIds.push(val); // add to new ban list
      } else {
        console.log('dont punish');
      }
    }
    console.log("Users to punish are " + this.absentIds);

    console.log("absentIds length is " + this.absentIds.length);
    if (this.absentIds.length > 0) {
      this.activityService.punishUsers(this.activityBeingViewed.activityId, this.absentIds).subscribe({
        next: (response) => {
          console.log("Response is ");
          console.log(response);
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "Users punished successfully";
          this.presentAlertOk();
        },
        error: (error) => {
          console.log(error);

          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while punishing the user: " + error;

          console.log('********** PunishComponent: ' + error);
          this.presentAlertError();

        }
      });
    } else {
      this.presentAlertEmpty();
    }
  }

  async presentAlertOk() 
	{
		const alert = await this.alertController.create({
			header: 'Marked as Absent',
			message: 'User(s) have been marked as absent.',
			buttons: ['Ok']
		});

		await alert.present();
	}

  async presentAlertEmpty() 
	{
		const alert = await this.alertController.create({
			header: 'Unable to Mark As Absent',
			message: 'No user selected.',
			buttons: ['Ok']
		});

		await alert.present();
	}

  async presentAlertError() 
	{
		const alert = await this.alertController.create({
			header: 'Unable to Mark As Absent',
			message: 'Encountered an Error, ' + this.message,
			buttons: ['Ok']
		});

		await alert.present();
	}
}
