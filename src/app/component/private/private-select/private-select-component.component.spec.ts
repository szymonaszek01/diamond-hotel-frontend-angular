import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSelectComponentComponent } from './private-select-component.component';

describe('PrivateSelectComponentComponent', () => {
  let component: PrivateSelectComponentComponent;
  let fixture: ComponentFixture<PrivateSelectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSelectComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateSelectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
