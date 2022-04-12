export class PunishReq {
    activityId: number | undefined;
    absenteeIds: number[] | undefined;

    constructor(activityId?: number, absenteeIds?: number[]) {
        this.activityId = activityId;
        this.absenteeIds = absenteeIds;
    }
}
