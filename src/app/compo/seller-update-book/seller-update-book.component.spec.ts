import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateBookComponent } from './seller-update-book.component';

describe('SellerUpdateBookComponent', () => {
  let component: SellerUpdateBookComponent;
  let fixture: ComponentFixture<SellerUpdateBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerUpdateBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpdateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
