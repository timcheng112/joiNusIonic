import { NormalUserEntity } from "./normal-user-entity";

export class CreateNormalUserReq {
    normalUser: NormalUserEntity | null;

    constructor(normalUser?: NormalUserEntity)
	{		
		this.normalUser = normalUser;
	}
}
