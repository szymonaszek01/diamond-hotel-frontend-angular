import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAnimatedBackgroundComponent } from './public-animated-background.component';

describe('PublicAnimatedBackgroundComponent', () => {
  let component: PublicAnimatedBackgroundComponent;
  let fixture: ComponentFixture<PublicAnimatedBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicAnimatedBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAnimatedBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
