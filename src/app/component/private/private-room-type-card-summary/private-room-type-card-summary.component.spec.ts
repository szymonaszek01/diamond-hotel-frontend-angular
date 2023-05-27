import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRoomTypeCardSummaryComponent } from './private-room-type-card-summary.component';

describe('PrivateRoomTypeCardSummaryComponent', () => {
  let component: PrivateRoomTypeCardSummaryComponent;
  let fixture: ComponentFixture<PrivateRoomTypeCardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateRoomTypeCardSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateRoomTypeCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
