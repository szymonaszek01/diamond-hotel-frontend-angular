import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRoomTypeCardComponentComponent } from './private-room-type-card-component.component';

describe('PrivateRoomTypeCardComponentComponent', () => {
  let component: PrivateRoomTypeCardComponentComponent;
  let fixture: ComponentFixture<PrivateRoomTypeCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateRoomTypeCardComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateRoomTypeCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
