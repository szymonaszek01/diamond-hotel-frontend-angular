import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNavBarComponent } from './public-nav-bar.component';

describe('NavBarComponent', () => {
  let component: PublicNavBarComponent;
  let fixture: ComponentFixture<PublicNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
