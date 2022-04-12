import { ActivityEntity } from './activity-entity';

export class CreateActivityReq {
  username: string | undefined;
  password: string | undefined;
  //   activityEntity: ActivityEntity | undefined;
  activityName: string | undefined;
  activityDescription: string | undefined;
  activityMaxParticipants: number | undefined;
  activityTags: string[] | undefined;
  categoryId: number | undefined | null;
  timeSlotId: number | undefined | null;

  constructor(
    username?: string,
    password?: string,
    // activityEntity?: ActivityEntity,
    activityName?: string | undefined,
    activityDescription?: string | undefined,
    activityMaxParticipants?: number | undefined,
    activityTags?: string[] | undefined,
    categoryId?: number | null,
    timeSlotId?: number | null
  ) {
    this.username = username;
    this.password = password;
    // this.activityEntity = activityEntity;
    this.activityName = activityName;
    this.activityDescription = activityDescription;
    this.activityMaxParticipants = activityMaxParticipants;
    this.activityTags = activityTags;
    this.categoryId = categoryId;
    this.timeSlotId = timeSlotId;
  }
}
