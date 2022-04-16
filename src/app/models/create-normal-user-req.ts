import { NormalUserEntity } from "./normal-user-entity";

export class CreateNormalUserReq {
    normalUser: NormalUserEntity | null;
	newPassword: string | null;

	constructor(normalUser?: NormalUserEntity, newPassword?: string)
	{		
		this.normalUser = normalUser;
		this.newPassword = newPassword;
	}

}
