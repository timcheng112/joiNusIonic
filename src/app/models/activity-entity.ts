import { BookingEntity } from './booking-entity';
import { CategoryEntity } from './category-entity';
import { CommentEntity } from './comment-entity';
import { ImageEntity } from './image-entity';
import { NormalUserEntity } from './normal-user-entity';

export class ActivityEntity {
  activityId: number | undefined;
  activityName: string | undefined;
  activityDescription: string | undefined;
  maxParticipants: number | undefined;
  tags: string[] | undefined;
  activityOwner: NormalUserEntity | undefined;
  participants: NormalUserEntity[] | undefined;
  category: CategoryEntity | undefined;
  booking: BookingEntity | undefined;
  comments: CommentEntity[] | undefined;
  gallery: ImageEntity[] | undefined;

  constructor(
    activityId?: number,
    activityName?: string,
    activityDescription?: string,
    maxParticipants?: number,
    tags?: string[],
    activityOwner?: NormalUserEntity,
    participants?: NormalUserEntity[],
    category?: CategoryEntity,
    booking?: BookingEntity,
    comments?: CommentEntity[],
    gallery?: ImageEntity[]
  ) {
    this.activityId = activityId;
    this.activityName = activityName;
    this.activityDescription = activityDescription;
    this.maxParticipants = maxParticipants;
    this.tags = tags;
    this.activityOwner = activityOwner;
    this.participants = participants;
    this.category = category;
    this.booking = booking;
    this.comments = comments;
    this.gallery = gallery;
  }
}
