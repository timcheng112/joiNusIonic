import { NormalUserEntity } from './normal-user-entity';

export class ImageEntity {
  imageId: number | undefined;
  imagePath: string | undefined;
  imageDescription: string | undefined;
  datePosted: Date | undefined;
  postedBy: NormalUserEntity | undefined;

  constructor(
    imageId?: number,
    imagePath?: string,
    imageDescription?: string,
    datePosted?: Date,
    postedBy?: NormalUserEntity
  ) {
    this.imageId = imageId;
    this.imagePath = imagePath;
    this.imageDescription = imageDescription;
    this.datePosted = datePosted;
    this.postedBy = postedBy;
  }
}
