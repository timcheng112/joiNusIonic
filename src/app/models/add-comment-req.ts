export class AddCommentReq {
  username: string | undefined;
  password: string | undefined;
  text: string | undefined;
  activityId: number | undefined;

  constructor(
    username?: string,
    password?: string,
    text?: string,
    activityId?: number
  ) {
    this.username = username;
    this.password = password;
    this.text = text;
    this.activityId = activityId;
  }
}
