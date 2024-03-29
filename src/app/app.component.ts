import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPagesLogin = [
    { title: 'Home', url: '/index', icon: 'home' },
    { title: 'Logout', url: '/login', icon: 'exit' },
  ];

  public appPagesLogout = [
    { title: 'Login', url: '/login', icon: 'lock-closed' },
    { title: 'Register', url: '/register', icon: 'person-add' },
  ];

  public appPagesUserAdministration = [
    {
      title: 'View My Profile',
      url: '/view-my-profile',
      icon: 'person',
    },
    {
      title: 'View My Activities',
      url: '/viewMyActivities',
      icon: 'glasses',
    },
    {
      title: 'View Other Upcoming Activities',
      url: '/viewAllActivities',
      icon: 'today',
    },
    {
      title: 'View Leaderboard',
      url: '/view-leaderboard',
      icon: 'podium',
    },
    {
      title: 'Search for Users',
      url: '/search-for-users',
      icon: 'search-outline',
    },
  ];
  constructor(public sessionService: SessionService) {}
}
