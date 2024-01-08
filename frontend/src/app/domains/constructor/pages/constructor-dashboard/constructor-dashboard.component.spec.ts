import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorDashboardComponent } from './constructor-dashboard.component';

describe('ConstructorDashboardComponent', () => {
  let component: ConstructorDashboardComponent;
  let fixture: ComponentFixture<ConstructorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstructorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
