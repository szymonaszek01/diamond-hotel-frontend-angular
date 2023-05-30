import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationAllPageComponent } from './user-reservation-all-page.component';

describe('UserReservationAllPageComponent', () => {
  let component: UserReservationAllPageComponent;
  let fixture: ComponentFixture<UserReservationAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReservationAllPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReservationAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
