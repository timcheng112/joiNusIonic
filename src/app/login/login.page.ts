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
  username: string | null;
  password: string | null;
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
            this.sessionService.setUserId(normalUser.userId);
						this.loginError = false;
            console.log("login set true");
					}
					else
          {
						this.loginError = true;
					}
          console.log(sessionStorage['isLogin'] == "true");

          this.router.navigate(['/index']);
        },
        error:(error)=>{
          this.loginError = true;
					this.errorMessage = 'Invalid login credential: Username does not exist or invalid password!'
        }
      });

      
		}
		
	}



	normalUserLogout() 
  {
		
		this.sessionService.setCurrentNormalUser(null);
    this.sessionService.setUserId(null);
    this.sessionService.setPassword("");
    this.sessionService.setUsername("");
    this.sessionService.setIsLogin(false);

    console.log('set user logout');
    console.log(sessionStorage['isLogin'] == "true");
	}



	// back()
  // {
	// 	this.router.navigate(["/"]);
	// }

}
