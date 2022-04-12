import { CategoryEntity } from "./category-entity";

export class NormalUserEntity {
  userId: number | undefined;
  username: string | undefined;
  password: string | undefined;
  name: string | undefined;
  email: string | undefined;
  socialCredits: number | undefined;
  bookingTokens: number | undefined;
  interests: CategoryEntity[] | undefined;

  constructor(
    userId?: number,
    username?: string,
    password?: string,
    name?: string,
    email?: string,
    socialCredits?: number,
    bookingTokens?: number,
    interests?: CategoryEntity[]
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.socialCredits = socialCredits;
    this.bookingTokens = bookingTokens;
    this.interests = interests;
  }
}
