import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewActivityParticipatingPopupPage } from './view-activity-participating-popup.page';

describe('ViewActivityParticipatingPopupPage', () => {
  let component: ViewActivityParticipatingPopupPage;
  let fixture: ComponentFixture<ViewActivityParticipatingPopupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityParticipatingPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewActivityParticipatingPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
