export class CreateActivityReq {
  username: string | undefined;
  password: string | undefined;
  activityName: string | undefined;
  activityDescription: string | undefined;
  activityMaxParticipants: number | undefined;
  activityTags: string[] | undefined;
  categoryId: number | undefined | null;
  timeSlotId: number | undefined | null;

  constructor(
    username?: string,
    password?: string,
    activityName?: string | undefined,
    activityDescription?: string | undefined,
    activityMaxParticipants?: number | undefined,
    activityTags?: string[] | undefined,
    categoryId?: number | null,
    timeSlotId?: number | null
  ) {
    this.username = username;
    this.password = password;
    this.activityName = activityName;
    this.activityDescription = activityDescription;
    this.activityMaxParticipants = activityMaxParticipants;
    this.activityTags = activityTags;
    this.categoryId = categoryId;
    this.timeSlotId = timeSlotId;
  }
}
