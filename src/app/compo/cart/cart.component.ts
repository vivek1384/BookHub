import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Cart, Summary } from '../../data-types';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private bookServeice: BookService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  noOrderMsg: string = 'No items found';
  noOrderMsg2: string = 'Click Here To Explore The Best...';
  orederMsg = true;

  cartData: Cart[] | undefined;
  quantity1: number = 0;
  price2: number = 0;
  priceSummary: Summary = {
    price: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
  };

  ngOnInit(): void {
    this.loadPrice();
  }
  quantityPlus(id: number) {
    const book = this.cartData?.find((p) => p.id === id);
    if (book) {
      if (book.quantity) {
        book.quantity++;
      }
    }
  }
  quantityMinus(id: number) {
    const book = this.cartData?.find((p) => p.id === id);
    if (book) {
      if (book.quantity) {
        if (book.quantity == 1) {
          book.quantity = 1;
        } else {
          book.quantity--;
        }
      }
    }
  }

  loadPrice() {
    this.bookServeice.currentCart().subscribe((res) => {
      this.cartData = res;
      if (this.cartData.length > 0) {
        this.orederMsg = false;
      }
      // console.log(this.cartData);
      res && res.forEach((element: Cart) => {
        if (element.quantity) {
          this.quantity1 = element.quantity;
          this.price2 = this.price2 + +element.price * +element.quantity;
          // console.log(this.quantity);
          // console.log(this.price2);
        }
      });
      this.priceSummary.price = this.price2;
      this.priceSummary.shipping = 100;
      this.priceSummary.tax = (this.price2 * 18) / 100;
      this.priceSummary.discount = this.price2 / 10;
      this.priceSummary.total =
        this.priceSummary.price +
        100 +
        (this.priceSummary.price * 18) / 100 -
        this.priceSummary.price / 10;
    });
  }

  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.bookServeice.removeToCartJson(cartId).subscribe((res) => {
        this.toastr.error('Removed from cart successfully!', 'Removed.', {
          positionClass: 'toast-bottom-right',
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 300);
      });
  }
}
