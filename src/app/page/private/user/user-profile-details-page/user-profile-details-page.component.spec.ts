import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDetailsPageComponent } from './user-profile-details-page.component';

describe('UserProfileDetailsPageComponent', () => {
  let component: UserProfileDetailsPageComponent;
  let fixture: ComponentFixture<UserProfileDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
