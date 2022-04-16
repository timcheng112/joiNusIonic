import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  oldPassword: string
  newPassword: string
  newPassword2: string

  thisUser: NormalUserEntity
  message: string
  submitted: boolean
  resultSuccess: boolean
  resultError: boolean

  constructor(private router: Router,
    private normalUserService: NormalUserService,
    public alertController: AlertController,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.refreshUser();
    this.thisUser = this.sessionService.getCurrentNormalUser();
  }

  ionViewWillEnter(){
    this.refreshUser();
    this.thisUser = this.sessionService.getCurrentNormalUser();
    console.log("thisUser: " + this.thisUser.password)
    console.log("sessionService.getPassword: " + this.sessionService.getPassword())
  }

  changePassword(changePasswordForm: NgForm) {
    this.submitted = true;
    console.log("Entity: " + this.thisUser)
    console.log("Name: " + this.thisUser.name)

    //error checking
    if (this.oldPassword != this.sessionService.getPassword()) {
      this.message = "Old password is incorrect!"
      this.presentWarning();
      console.log("Current password: " + this.sessionService.getPassword());
    } else if (this.oldPassword == this.newPassword) {
      this.message = "New password should be different from old password!"
      this.presentWarning();
    } else if (this.newPassword != this.newPassword2) {
      this.message = "New passwords do not match!"
      this.presentWarning();
    }
    
    //passed error checking
    else if (changePasswordForm.valid) {
      this.message = "correctPassword";
      console.log("Correct password")
      console.log(this.thisUser.userId)

      
      this.normalUserService
        .changePassword(
          this.thisUser, this.newPassword
        )
        .subscribe({
          next: (response) => {
            let userId: number = response;
            this.resultSuccess = true;
            this.resultError = false;
            console.log("Updated password to " + this.newPassword + " for User ID: " + userId);
            this.message =
              'Password updated successfully';
            this.presentSuccess();
            this.submitted = false;

            this.sessionService.setPassword(this.newPassword);
            changePasswordForm.reset();
          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message =
              'An error has occurred while changing password: ' + error;

            console.log('********** ChangePasswordPage: ' + error);
            this.presentWarning();
          },
        });

        //refresh currentNormalUser
        this.normalUserService.normalUserLogin(this.sessionService.getUsername(), this.sessionService.getPassword()).subscribe({
          next:(response)=>{
            let normalUser: NormalUserEntity = response;
  
            if (normalUser != null) 
            {
              this.sessionService.setCurrentNormalUser(normalUser);
              console.log("change password success");
              console.log(this.sessionService.getUsername);
            }
          }
        });

    } else {
      this.message = "Error with fields, please try again"
      this.presentWarning();
    }
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: this.message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    window.location.reload();
  }

  async presentWarning() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: this.message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  back() {
    this.router.navigate(["/view-my-profile"]);
  }

  refreshUser() {
    //refresh currentNormalUser
    this.normalUserService.normalUserLogin(this.sessionService.getUsername(), this.sessionService.getPassword()).subscribe({
      next: (response) => {
        let normalUser: NormalUserEntity = response;
        this.sessionService.setCurrentNormalUser(normalUser);
        console.log("Refresh for name: " + this.sessionService.getCurrentNormalUser().name);
      }
    });
  }

}
