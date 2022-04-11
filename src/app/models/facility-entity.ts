import { ImageEntity } from './image-entity';
import { TimeSlotEntity } from './time-slot-entity';

export class FacilityEntity {
  facilityId: number | undefined;
  facilityName: string | undefined;
  club: string | undefined;
  tokenCost: number | undefined;
  capacity: number | undefined;
  address: string | undefined;
  timeSlots: TimeSlotEntity[] | undefined;
  openingHour: number | undefined;
  closingHour: number | undefined;
  facilityImage: ImageEntity | undefined;

  constructor(
    facilityId?: number,
    facilityName?: string,
    club?: string,
    tokenCost?: number,
    capacity?: number,
    address?: string,
    timeSlots?: TimeSlotEntity[],
    openingHour?: number,
    closingHour?: number,
    facilityImage?: ImageEntity
  ) {
    this.facilityId = facilityId;
    this.facilityName = facilityName;
    this.club = club;
    this.tokenCost = tokenCost;
    this.capacity = capacity;
    this.address = address;
    this.timeSlots = timeSlots;
    this.openingHour = openingHour;
    this.closingHour = closingHour;
    this.facilityImage = facilityImage;
  }
}
