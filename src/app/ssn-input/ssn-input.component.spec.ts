import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnInputComponent } from './ssn-input.component';

describe('SsnInputComponent', () => {
  let component: SsnInputComponent;
  let fixture: ComponentFixture<SsnInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SsnInputComponent]
    });
    fixture = TestBed.createComponent(SsnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
