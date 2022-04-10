import { ActivityEntity } from './activity-entity';

export class CategoryEntity {
  categoryId: number | undefined;
  categoryName: string | undefined;
  subCategories: CategoryEntity[] | undefined;
  parentCategory: CategoryEntity | undefined;
  activities: ActivityEntity[] | undefined;

  constructor(
    categoryId?: number,
    categoryNumber?: string,
    subCategories?: CategoryEntity[],
    parentCategory?: CategoryEntity,
    activities?: ActivityEntity[]
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryNumber;
    this.subCategories = subCategories;
    this.parentCategory = parentCategory;
    this.activities = activities;
  }
}
