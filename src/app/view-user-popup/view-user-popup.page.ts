import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NormalUserEntity } from '../models/normal-user-entity';

@Component({
  selector: 'app-view-user-popup',
  templateUrl: './view-user-popup.page.html',
  styleUrls: ['./view-user-popup.page.scss'],
})
export class ViewUserPopupPage implements OnInit {
  @Input() userToView: NormalUserEntity
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async closeModel() {
    await this.modalController.dismiss();
  }

}
