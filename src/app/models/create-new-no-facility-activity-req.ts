export class CreateNewNoFacilityActivityReq {
  username: string | undefined;
  password: string | undefined;
  activityName: string | undefined;
  activityDescription: string | undefined;
  activityMaxParticipants: number | undefined;
  activityTags: string[] | undefined;
  categoryId: number | undefined | null;
  timeSlotId: number | undefined | null;
  activityYear: number | undefined;
  activityMonth: number | undefined;
  activityDay: number | undefined;
  activityHour: number | undefined;
  activityMinute: number | undefined;

  constructor(
    username?: string,
    password?: string,
    activityName?: string | undefined,
    activityDescription?: string | undefined,
    activityMaxParticipants?: number | undefined,
    activityTags?: string[] | undefined,
    categoryId?: number | null,
    timeSlotId?: number | null,
    activityYear?: number | undefined,
    activityMonth?: number | undefined,
    activityDay?: number | undefined,
    activityHour?: number | undefined,
    activityMinute?: number | undefined
  ) {
    this.username = username;
    this.password = password;
    this.activityName = activityName;
    this.activityDescription = activityDescription;
    this.activityMaxParticipants = activityMaxParticipants;
    this.activityTags = activityTags;
    this.categoryId = categoryId;
    this.timeSlotId = timeSlotId;
    this.activityYear = activityYear;
    this.activityMonth = activityMonth;
    this.activityDay = activityDay;
    this.activityHour = activityHour;
    this.activityMinute = activityMinute;
  }
}
