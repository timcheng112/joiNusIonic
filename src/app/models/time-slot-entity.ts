import { BookingEntity } from './booking-entity';
import { FacilityEntity } from './facility-entity';

export class TimeSlotEntity {
  timeSlotId: number | undefined;
  timeSlotTime: Date | undefined;
  // status: SlotStatusEnum | undefined;
  facility: FacilityEntity | undefined;
  booking: BookingEntity | undefined;

  constructor(
    timeSlotId?: number,
    timeSlotTime?: Date,
    /*status?: SlotStatusEnum,*/ facility?: FacilityEntity,
    booking?: BookingEntity
  ) {
    this.timeSlotId = timeSlotId;
    this.timeSlotTime = timeSlotTime;
    // this.status = status;
    this.facility = facility;
    this.booking = booking;
  }
}
