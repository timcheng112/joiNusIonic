import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
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
    loadChildren: () => import('./view-activity-popup/view-activity-popup.module').then( m => m.ViewActivityPopupPageModule)
  },  {
    path: 'view-activity-participants-popup',
    loadChildren: () => import('./view-activity-participants-popup/view-activity-participants-popup.module').then( m => m.ViewActivityParticipantsPopupPageModule)
  },
  {
    path: 'view-activity-facility-popup',
    loadChildren: () => import('./view-activity-facility-popup/view-activity-facility-popup.module').then( m => m.ViewActivityFacilityPopupPageModule)
  },
  {
    path: 'view-activity-booking-popup',
    loadChildren: () => import('./view-activity-booking-popup/view-activity-booking-popup.module').then( m => m.ViewActivityBookingPopupPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
