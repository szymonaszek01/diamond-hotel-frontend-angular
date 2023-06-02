import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationDetailsPageComponent } from './user-reservation-details-page.component';

describe('UserReservationDetailsPageComponent', () => {
  let component: UserReservationDetailsPageComponent;
  let fixture: ComponentFixture<UserReservationDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReservationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
