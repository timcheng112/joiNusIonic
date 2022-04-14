import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';
import { ViewUserPopupPage } from '../view-user-popup/view-user-popup.page';

@Component({
  selector: 'app-search-for-users',
  templateUrl: './search-for-users.page.html',
  styleUrls: ['./search-for-users.page.scss'],
})
export class SearchForUsersPage implements OnInit {
  thisUser: NormalUserEntity
  allUsers: NormalUserEntity[] | null

  nameField: string | null
  searchResults: NormalUserEntity[] | null
  message: string | null

  constructor(private router: Router,
    public modalController: ModalController,
    private normalUserService: NormalUserService,
    public alertController: AlertController,
    private sessionService: SessionService) {
  }

  ngOnInit() {
    this.refreshUser;
    this.thisUser = this.sessionService.getCurrentNormalUser();
    //maybe won't use
    this.normalUserService.retrieveAllNormalUsers().subscribe({
      next: (response) => {
        this.allUsers = response;
      }
    })
    this.searchResults = this.allUsers;
  }

  ionViewWillEnter() {
    this.refreshUser();
    this.thisUser = this.sessionService.getCurrentNormalUser();
  }

  search(query) {
    if (!query) { // revert back to the original array if no query
      this.searchResults = this.searchResults;
    } else { // filter array by query
      this.searchResults = this.allUsers.filter((user) => {
        return (user.name.includes(query) || user.username.includes(query));
      })
    }
  }

  viewUser(event, user)
  {
    this.router.navigate(["/retrieveNormalUserById/" + user.userId]);
  }

  //maybe won't use
  searchName() {
    this.normalUserService.retrieveNormalUsersByName(this.nameField).subscribe({
      next: (response) => {
        this.searchResults = response;
      },
      error: (error) => {
        this.message =
          'An error has occurred while searching users: ' + error;
        console.log('********** SearchForUsersPage: ' + error);
        this.presentWarning();
      }
    })
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

  async openIonModal(user: NormalUserEntity) {
    const modal = await this.modalController.create({
      component: ViewUserPopupPage,
      componentProps: {
        userToView: user
      },
    });
    return await modal.present();
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
