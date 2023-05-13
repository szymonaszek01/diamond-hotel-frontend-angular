import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCardComponentComponent } from './common-card-component.component';

describe('CommonCardComponentComponent', () => {
  let component: CommonCardComponentComponent;
  let fixture: ComponentFixture<CommonCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCardComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
