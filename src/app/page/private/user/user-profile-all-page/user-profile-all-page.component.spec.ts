import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAllPageComponent } from './user-profile-all-page.component';

describe('UserProfileAllPageComponent', () => {
  let component: UserProfileAllPageComponent;
  let fixture: ComponentFixture<UserProfileAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileAllPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
