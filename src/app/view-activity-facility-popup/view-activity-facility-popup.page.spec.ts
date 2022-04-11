import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewActivityFacilityPopupPage } from './view-activity-facility-popup.page';

describe('ViewActivityFacilityPopupPage', () => {
  let component: ViewActivityFacilityPopupPage;
  let fixture: ComponentFixture<ViewActivityFacilityPopupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityFacilityPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewActivityFacilityPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
