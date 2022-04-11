import { Injectable } from '@angular/core';

import { NormalUserEntity } from '../models/normal-user-entity';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean
  {
    if(sessionStorage['isLogin'] == "true")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void
  {
    sessionStorage['isLogin'] = isLogin;
  }

  getCurrentUser(): NormalUserEntity
  {
    return JSON.parse(sessionStorage['currentUser']);
  }

  setCurrentStaff(currentUser: NormalUserEntity | null): void
  {		 
    sessionStorage['currentUser'] = JSON.stringify(currentUser);
  }

  getUserId(): number
  {
    return sessionStorage['userId'];
  }

  setUserId(userId: number | undefined): void
  {
    sessionStorage['userId'] = userId;
  }

  getUsername(): string
  {
    return sessionStorage['username'];
  }

  setUsername(username: string | undefined): void
  {
    sessionStorage['username'] = username;
  }
  
  getPassword(): string
  {
    return sessionStorage['password'];
  }

  setPassword(password: string | undefined): void
  {
    sessionStorage['password'] = password;
  }
}
