import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoryEntity } from '../models/category-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { CategoryService } from '../services/category.service';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.page.html',
  styleUrls: ['./edit-my-profile.page.scss'],
})
export class EditMyProfilePage implements OnInit {

  thisUser: NormalUserEntity | null;
  selectedInterests: CategoryEntity[] | null;
  allInterests: CategoryEntity[] | null;
  selectInterest: CategoryEntity | null;

  submitted: boolean | null;
  message: string | undefined;
  resultSuccess: boolean | null;
  resultError: boolean | null;

  constructor(private router: Router,
    private categoryService: CategoryService,
    private normalUserService: NormalUserService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.refreshUser();
    this.thisUser = this.sessionService.getCurrentNormalUser();
    this.selectedInterests = new Array();

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.allInterests = response;
      },
      error: (error) => {
        console.log('********** RegisterPage: ' + error);
      },
    });
  }

  ionViewWillEnter() {
    this.refreshUser();
    this.thisUser = this.sessionService.getCurrentNormalUser();
    console.log("Name: " + this.sessionService.getCurrentNormalUser().name);
    console.log("Interests: " + this.sessionService.getCurrentNormalUser().interests);
  }

  selectInterests(interestPicked : CategoryEntity) {
    console.log("before");
    console.log(this.selectedInterests);

    console.log("picked");
    console.log(interestPicked);
    
    if (this.selectedInterests.includes(interestPicked)) {
      console.log("activity already in list, will remove");
      this.selectedInterests.forEach((element, index) => {
        if (element == interestPicked) this.selectedInterests.splice(index, 1);
      });
    } else {
      console.log("add activity to list");
      this.selectedInterests.push(interestPicked);
    }
    console.log("after");
    console.log(this.selectedInterests);
  }

  edit(editNormalUserForm: NgForm) {
    console.log('user details:');
    this.thisUser.interests = this.selectedInterests;
    console.log(this.thisUser);

    this.submitted = true;

    if (editNormalUserForm.valid) {
      this.normalUserService
        .editNormalUser(
          this.thisUser
        )
        .subscribe({
          next: (response) => {
            let editUserId: number = response;
            this.resultSuccess = true;
            this.resultError = false;
            this.message =
              'User ID ' + editUserId + ' updated successfully';
            this.presentSuccess();
            this.thisUser = new NormalUserEntity();
            this.selectedInterests = new Array();
            this.submitted = false;
            editNormalUserForm.reset();
          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message =
              'An error has occurred while editing my profile: ' + error;

            console.log('********** EditMyProfilePage: ' + error);
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
              console.log("edit my profile success");
              console.log(this.sessionService.getUsername);
            }
          }
        });
    
        //window.location.reload();

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
    window.location.reload();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
    this.router.navigate(["/index"]);
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
