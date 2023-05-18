import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLoadingDataWindowComponnetComponent } from './common-loading-data-window-componnet.component';

describe('CommonLoadingDataWindowComponnetComponent', () => {
  let component: CommonLoadingDataWindowComponnetComponent;
  let fixture: ComponentFixture<CommonLoadingDataWindowComponnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonLoadingDataWindowComponnetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonLoadingDataWindowComponnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
