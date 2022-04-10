import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/index', icon: 'home' },
    {
      title: 'View All Activities',
      url: '/viewAllActivities',
      icon: 'arrow-forward',
    },
    {
      title: 'View My Activities',
      url: '/viewMyActivities',
      icon: 'arrow-forward',
    },
  ];
  constructor() {}
}
