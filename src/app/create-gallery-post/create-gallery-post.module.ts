import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGalleryPostPageRoutingModule } from './create-gallery-post-routing.module';

import { CreateGalleryPostPage } from './create-gallery-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGalleryPostPageRoutingModule
  ],
  declarations: [CreateGalleryPostPage]
})
export class CreateGalleryPostPageModule {}
