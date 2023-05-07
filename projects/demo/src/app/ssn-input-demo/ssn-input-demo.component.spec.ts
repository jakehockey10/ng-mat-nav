import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnInputDemoComponent } from './ssn-input-demo.component';

describe('SsnInputDemoComponent', () => {
  let component: SsnInputDemoComponent;
  let fixture: ComponentFixture<SsnInputDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SsnInputDemoComponent]
    });
    fixture = TestBed.createComponent(SsnInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
