import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCheckboxComponent } from './status-checkbox.component';

describe('StatusCheckboxComponent', () => {
  let component: StatusCheckboxComponent;
  let fixture: ComponentFixture<StatusCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
