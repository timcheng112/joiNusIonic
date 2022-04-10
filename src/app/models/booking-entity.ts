import { ActivityEntity } from './activity-entity';

export class BookingEntity {
  bookingId: number | undefined;
  // bookingStatus: SlotStatusEnum | undefined;
  creationDate: Date | undefined;
  activity: ActivityEntity | undefined;
  // timeSlot: TimeSlotEntity | undefined;

  constructor(
    bookingId?: number,
    /*bookingStatus?: SlotStatusEnum, */ creationDate?: Date,
    activity?: ActivityEntity /*, timeSlot?: TimeSlotEntity*/
  ) {
    this.bookingId = bookingId;
    // this.bookingStatus = bookingStatus;
    this.creationDate = creationDate;
    this.activity = activity;
    // this.timeSlot = timeSlot;
  }
}
