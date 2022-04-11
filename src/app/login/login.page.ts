import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NormalUserEntity } from '../models/normal-user-entity';
import { NormalUserService } from '../services/normaluser.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted: boolean;
  username: string;
  password: string;
  loginError: boolean;
  errorMessage: string;

  constructor(private router: Router,
    public sessionService: SessionService,
    private normalUserService: NormalUserService) {
      this.submitted = false;
     }

  ngOnInit() {
  }

  clear()
  {
		this.username = "";
		this.password = "";
	}

  normalUserLogin(normalUserLoginForm: NgForm) 
  {
		this.submitted = true;

		if (normalUserLoginForm.valid) 
    {
			this.sessionService.setUsername(this.username);
			this.sessionService.setPassword(this.password);

      this.normalUserService.normalUserLogin(this.username, this.password).subscribe({
        next:(response)=>{
          let normalUser: NormalUserEntity = response;

					if (normalUser != null) 
          {
						this.sessionService.setIsLogin(true);
						this.sessionService.setCurrentNormalUser(normalUser);
						this.loginError = false;
					}
					else
          {
						this.loginError = true;
					}
        },
        error:(error)=>{
          this.loginError = true;
					this.errorMessage = 'Invalid login credential: Username does not exist or invalid password!'
        }
      });
		}
		
	}



	normalUserLogout(): void 
  {
		this.sessionService.setIsLogin(false);
		this.sessionService.setCurrentNormalUser(null);
	}



	back()
  {
		this.router.navigate(["/index"]);
	}

}
