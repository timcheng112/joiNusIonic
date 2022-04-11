import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewActivityParticipantsPopupPage } from './view-activity-participants-popup.page';

describe('ViewActivityParticipantsPopupPage', () => {
  let component: ViewActivityParticipantsPopupPage;
  let fixture: ComponentFixture<ViewActivityParticipantsPopupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityParticipantsPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewActivityParticipantsPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
