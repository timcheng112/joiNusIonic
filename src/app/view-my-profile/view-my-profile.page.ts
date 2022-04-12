import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NormalUserEntity } from '../models/normal-user-entity';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.page.html',
  styleUrls: ['./view-my-profile.page.scss'],
})
export class ViewMyProfilePage implements OnInit {

  normalUser: NormalUserEntity | null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.normalUser = this.sessionService.getCurrentNormalUser();
  }

  ionViewWillEnter()
  {
    this.normalUser = this.sessionService.getCurrentNormalUser();
  }

  editMyProfile()
  {
    this.router.navigate(["/editMyProfile"]);
  }

  back()
  {
    this.router.navigate(["/index"]);
  }

}
