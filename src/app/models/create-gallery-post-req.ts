import { NormalUserEntity } from './normal-user-entity';

export class CreateGalleryPostReq {
  username: string | undefined;
  password: string | undefined;
  imagePath: string | undefined;
  imageDescription: string | undefined;
  datePosted: Date | undefined;
  postedBy: NormalUserEntity | undefined;
  activityId: number | null;

  constructor(
    username?: string | undefined,
    password?: string | undefined,
    imagePath?: string | undefined,
    imageDescription?: string | undefined,
    datePosted?: Date | undefined,
    postedBy?: NormalUserEntity | undefined,
    activityId?: number | null
  ) {
    this.username = username;
    this.password = password;
    this.imagePath = imagePath;
    this.imageDescription = imageDescription;
    this.datePosted = datePosted;
    this.postedBy = postedBy;
    this.activityId = activityId;
  }
}
