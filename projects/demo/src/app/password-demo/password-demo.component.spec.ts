import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDemoComponent } from './password-demo.component';

describe('PasswordDemoComponent', () => {
  let component: PasswordDemoComponent;
  let fixture: ComponentFixture<PasswordDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordDemoComponent]
    });
    fixture = TestBed.createComponent(PasswordDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
