import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationNewStepSecondPageComponent } from './user-reservation-new-step-second-page.component';

describe('UserReservationNewStepSecondPageComponent', () => {
  let component: UserReservationNewStepSecondPageComponent;
  let fixture: ComponentFixture<UserReservationNewStepSecondPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationNewStepSecondPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReservationNewStepSecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
