import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSearchbar, ModalController } from '@ionic/angular';
import { ActivityEntity } from '../models/activity-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';
import { ViewActivityPopupPage } from '../view-activity-popup/view-activity-popup.page';
import { ViewUserPopupPage } from '../view-user-popup/view-user-popup.page';

@Component({
  selector: 'app-search-for-users',
  templateUrl: './search-for-users.page.html',
  styleUrls: ['./search-for-users.page.scss'],
})
export class SearchForUsersPage implements OnInit {
  @ViewChild('search', {static:false}) search: IonSearchbar

  thisUser: NormalUserEntity
  allUsers: NormalUserEntity[] | null

  searchedItem: any
  list: Array<Object> = []

  //not used
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
    this.normalUserService.retrieveAllNormalUsers().subscribe({
      next: (response) => {
        this.list = response;
        this.searchedItem = response;
      }
    })
  }

  ionViewWillEnter() {
    this.refreshUser();
    this.thisUser = this.sessionService.getCurrentNormalUser();
  }

  searchEvent(event) {
    console.log(event.detail.value);
    const val = event.target.value;
    this.searchedItem = this.list;
    // if (val == '') {
    //   this.searchedItem = null;
    // }
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  viewUser(event, user)
  {
    this.router.navigate(["/retrieveNormalUserById/" + user.userId]);
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
