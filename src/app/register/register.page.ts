import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryEntity } from '../models/category-entity';
import { NormalUserEntity } from '../models/normal-user-entity';
import { CategoryService } from '../services/category.service';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  normalUser: NormalUserEntity | null;
  username: string | null;
  password: string | null;
  name: string | null;
  email: string | null;
  interests: CategoryEntity[] | null;
  allInterests: CategoryEntity[] | null;
  message: string | undefined;

  selectInterest: CategoryEntity | null;

  constructor(private httpClient: HttpClient,
    private sessionService: SessionService,
    private normalUserService: NormalUserService,
    private categoryService: CategoryService) { 
      this.normalUser = new NormalUserEntity;
      this.allInterests = new Array();
    }

  ngOnInit() {
    this.normalUser = new NormalUserEntity();
    this.interests = new Array();

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.allInterests = response;
      },
      error: (error) => {
        console.log('********** RegisterPage: ' + error);
      },
    });
  }

  createNewNormalUser() {
    this.normalUser.socialCredits = 420;
    this.normalUser.bookingTokens = 20;
    console.log(this.username);
    console.log(this.password);
    console.log(this.normalUser.socialCredits);
    console.log(this.interests);
    this.normalUserService.createNewNormalUser(this.normalUser, this.interests).subscribe({
      next: (response) => {
        let newNormalUserId: number = response;
        this.message =
          'New user ' + newNormalUserId + ' created successfully';
      },
      error: (error) => {
        this.message =
          'An error has occurred while creating the new activity: ' + error;

        console.log('********** RegisterPage: ' + error);
      },
    });
  }

}
