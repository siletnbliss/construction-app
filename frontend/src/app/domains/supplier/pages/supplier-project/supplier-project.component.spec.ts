import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProjectComponent } from './supplier-project.component';

describe('SupplierProjectComponent', () => {
  let component: SupplierProjectComponent;
  let fixture: ComponentFixture<SupplierProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
