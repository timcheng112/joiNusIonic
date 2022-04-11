import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewActivityBookingPopupPage } from './view-activity-booking-popup.page';

describe('ViewActivityBookingPopupPage', () => {
  let component: ViewActivityBookingPopupPage;
  let fixture: ComponentFixture<ViewActivityBookingPopupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityBookingPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewActivityBookingPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
