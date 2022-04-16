import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'index',
    loadChildren: () =>
      import('./index/index.module').then((m) => m.IndexPageModule),
  },
  {
    path: 'viewAllActivities',
    loadChildren: () =>
      import('./view-all-activities/view-all-activities.module').then(
        (m) => m.ViewAllActivitiesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'createNewActivity',
    loadChildren: () =>
      import('./create-new-activity/create-new-activity.module').then(
        (m) => m.CreateNewActivityPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'viewMyActivities',
    loadChildren: () =>
      import('./view-my-activities/view-my-activities.module').then(
        (m) => m.ViewMyActivitiesPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-activity-popup',
    loadChildren: () =>
      import('./view-activity-popup/view-activity-popup.module').then(
        (m) => m.ViewActivityPopupPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-activity-participants-popup',
    loadChildren: () =>
      import(
        './view-activity-participants-popup/view-activity-participants-popup.module'
      ).then((m) => m.ViewActivityParticipantsPopupPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-activity-facility-popup',
    loadChildren: () =>
      import(
        './view-activity-facility-popup/view-activity-facility-popup.module'
      ).then((m) => m.ViewActivityFacilityPopupPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-activity-booking-popup',
    loadChildren: () =>
      import(
        './view-activity-booking-popup/view-activity-booking-popup.module'
      ).then((m) => m.ViewActivityBookingPopupPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'view-my-profile',
    loadChildren: () =>
      import('./view-my-profile/view-my-profile.module').then(
        (m) => m.ViewMyProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-leaderboard',
    loadChildren: () =>
      import('./view-leaderboard/view-leaderboard.module').then(
        (m) => m.ViewLeaderboardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-activity-participating-popup',
    loadChildren: () =>
      import(
        './view-activity-participating-popup/view-activity-participating-popup.module'
      ).then((m) => m.ViewActivityParticipatingPopupPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'edit-my-profile',
    loadChildren: () =>
      import('./edit-my-profile/edit-my-profile.module').then(
        (m) => m.EditMyProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-gallery-post',
    loadChildren: () =>
      import('./create-gallery-post/create-gallery-post.module').then(
        (m) => m.CreateGalleryPostPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'search-for-users',
    loadChildren: () =>
      import('./search-for-users/search-for-users.module').then(
        (m) => m.SearchForUsersPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'view-user-popup',
    loadChildren: () =>
      import('./view-user-popup/view-user-popup.module').then(
        (m) => m.ViewUserPopupPageModule
      ),
    canActivate: [AuthGuard],
  },  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
