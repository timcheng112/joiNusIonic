import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.page.html',
  styleUrls: ['./view-my-profile.page.scss'],
})
export class ViewMyProfilePage implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController) { }

  ngOnInit() {
  }

}
