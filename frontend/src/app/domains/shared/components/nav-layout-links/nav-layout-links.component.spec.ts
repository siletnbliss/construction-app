import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLayoutLinksComponent } from './nav-layout-links.component';

describe('NavLayoutLinksComponent', () => {
  let component: NavLayoutLinksComponent;
  let fixture: ComponentFixture<NavLayoutLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLayoutLinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavLayoutLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
