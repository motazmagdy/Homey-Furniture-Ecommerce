import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsCRUDComponent } from './all-products-crud.component';

describe('AllProductsCRUDComponent', () => {
  let component: AllProductsCRUDComponent;
  let fixture: ComponentFixture<AllProductsCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProductsCRUDComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllProductsCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
