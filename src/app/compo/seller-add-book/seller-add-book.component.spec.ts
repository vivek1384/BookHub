import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddProductComponent } from './seller-add-book.component';

describe('SellerAddProductComponent', () => {
  let component: SellerAddProductComponent;
  let fixture: ComponentFixture<SellerAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
