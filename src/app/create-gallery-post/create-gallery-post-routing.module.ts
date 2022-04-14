import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGalleryPostPage } from './create-gallery-post.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGalleryPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGalleryPostPageRoutingModule {}
