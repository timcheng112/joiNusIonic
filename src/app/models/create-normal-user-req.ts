import { CategoryEntity } from "./category-entity";
import { NormalUserEntity } from "./normal-user-entity";

export class CreateNormalUserReq {
    normalUser: NormalUserEntity | null;
    interests: CategoryEntity[] | undefined;



    constructor(normalUser?: NormalUserEntity, interests?: CategoryEntity[])
	{		
		this.normalUser = normalUser;
        this.interests = interests;
	}
}
