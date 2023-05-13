import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonInputSearchComponentComponent } from './common-input-search-component.component';

describe('CommonInputSearchComponentComponent', () => {
  let component: CommonInputSearchComponentComponent;
  let fixture: ComponentFixture<CommonInputSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonInputSearchComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonInputSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
