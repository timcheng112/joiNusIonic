import { Component, OnInit } from '@angular/core';
import { CategoryEntity } from '../models/category-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { CategoryService } from '../services/category.service';
import { NormalUserService } from '../services/normaluser.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string | null;
  password: string | null;
  name: string | null;
  email: string | null;
  selectedInterests: CategoryEntity[] | null;
  allInterests: CategoryEntity[] | null;
  message: string | undefined;
  selectInterest: CategoryEntity | null;
  submitted: boolean | null;
  resultSuccess: boolean | null;
  resultError:boolean | null;
  newUser: NormalUserEntity | null;

  constructor(private normalUserService: NormalUserService,
    private categoryService: CategoryService,
    public alertController: AlertController) { 
      this.allInterests = new Array();
      this.selectInterest = new CategoryEntity();
      this.submitted = false;
      this.resultSuccess = false;
      this.resultError = false;
      this.newUser = new NormalUserEntity();
    }

  ngOnInit() {
    this.newUser = new NormalUserEntity();
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

  clear() {
    this.submitted = false;
    this.newUser = new NormalUserEntity();
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

  create(createActivityForm: NgForm) {
    console.log('new user details:');
    this.newUser.socialCredits = 420;
    this.newUser.bookingTokens = 20;
    this.newUser.interests = this.selectedInterests;
    console.log(this.newUser);

    this.submitted = true;

    if (createActivityForm.valid) {
      this.normalUserService
        .createNewNormalUser(
          this.newUser
        )
        .subscribe({
          next: (response) => {
            let newUserId: number = response;
            this.resultSuccess = true;
            this.resultError = false;
            this.message =
              'New User ' + newUserId + ' created successfully';
            this.presentSuccess();
            this.newUser = new NormalUserEntity();
            this.selectedInterests = new Array();
            this.submitted = false;
            createActivityForm.reset();
          },
          error: (error) => {
            this.resultError = true;
            this.resultSuccess = false;
            this.message =
              'An error has occurred while creating the new user account: ' + error;

            console.log('********** CreateNewActivityPage: ' + error);
            this.presentWarning();
          },
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
}
