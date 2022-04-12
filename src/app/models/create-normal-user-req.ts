import { NormalUserEntity } from "./normal-user-entity";

export class CreateNormalUserReq {
    username: string | undefined;
    password: string | undefined;
    name: string | undefined;
    email: string | undefined;
    socialCredits: number | undefined | null;
    bookingTokens: number | undefined;
    categoryIds: number[] | undefined;



    constructor(normalUser?: NormalUserEntity, categoryIds?: number[])
	{		
		this.username = normalUser.username;
        this.password = normalUser.password;
        this.name = normalUser.name;
        this.email = normalUser.email;
        this.socialCredits = normalUser.socialCredits;
        this.bookingTokens = normalUser.bookingTokens;
        this.categoryIds = categoryIds;
	}
}
