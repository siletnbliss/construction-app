import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFeedbackComponent } from './ui-feedback.component';

describe('UiFeedbackComponent', () => {
  let component: UiFeedbackComponent;
  let fixture: ComponentFixture<UiFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
