import { NormalUserEntity } from './normal-user-entity';

export class CommentEntity {
  commentId: number | undefined;
  text: string | undefined;
  commentOwner: NormalUserEntity | undefined;
  commentDate: Date | undefined;

  constructor(
    commentId?: number,
    text?: string,
    commentOwner?: NormalUserEntity,
    commentDate?: Date
  ) {
    this.commentId = commentId;
    this.text = text;
    this.commentOwner = commentOwner;
    this.commentDate = commentDate;
  }
}
