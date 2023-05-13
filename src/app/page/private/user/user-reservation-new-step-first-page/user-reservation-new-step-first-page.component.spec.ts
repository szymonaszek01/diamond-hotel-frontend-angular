import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationNewStepFirstPageComponent } from './user-reservation-new-step-first-page.component';

describe('ReservationNewStepFirstPageComponent', () => {
  let component: UserReservationNewStepFirstPageComponent;
  let fixture: ComponentFixture<UserReservationNewStepFirstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationNewStepFirstPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReservationNewStepFirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
