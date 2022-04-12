export class SignUpForActivityReq {
  username: string | undefined;
  password: string | undefined;
  activityId: number | undefined;

  constructor(username?: string, password?: string, activityId?: number) {
    this.username = username;
    this.password = password;
    this.activityId = activityId;
  }
}
