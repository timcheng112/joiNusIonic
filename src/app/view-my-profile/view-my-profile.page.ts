import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.page.html',
  styleUrls: ['./view-my-profile.page.scss'],
})
export class ViewMyProfilePage implements OnInit {

  normalUser: NormalUserEntity | null;

  constructor(private router: Router,
    private normalUserService: NormalUserService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.refreshUser();
    this.normalUser = this.sessionService.getCurrentNormalUser();
  }

  ionViewWillEnter() {
    this.refreshUser();
    this.normalUser = this.sessionService.getCurrentNormalUser();
    console.log("Interests: " + this.sessionService.getCurrentNormalUser().interests)
  }

  editMyProfile() {
    this.router.navigate(["/edit-my-profile"]);
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
