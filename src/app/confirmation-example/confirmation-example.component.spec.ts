import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationExampleComponent } from './confirmation-example.component';

describe('ConfirmationExampleComponent', () => {
  let component: ConfirmationExampleComponent;
  let fixture: ComponentFixture<ConfirmationExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmationExampleComponent]
    });
    fixture = TestBed.createComponent(ConfirmationExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
