import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonToastComponentComponent } from './common-toast-component.component';

describe('CommonToastComponentComponent', () => {
  let component: CommonToastComponentComponent;
  let fixture: ComponentFixture<CommonToastComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonToastComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonToastComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
