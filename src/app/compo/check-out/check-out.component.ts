import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Cart, Order, Summary } from '../../data-types';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  cartData: Cart[] | undefined;
  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  price2: number = 0;
  priceSummary: Summary = {
    price: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
  };

  ngOnInit(): void {
    this.bookService.currentCart().subscribe((res) => {
      this.cartData = res;
      // console.log(this.cartData);
      res && res.forEach((element) => {
        if (element.quantity) {
          this.price2 = this.price2 + +element.price * element.quantity;
          // console.log(this.quantity);
          // console.log(this.price2);
        }
      });

      this.priceSummary.total =
        this.price2 + 100 + (this.price2 * 18) / 100 - this.price2 / 10;
      // console.log(this.priceSummary)
    });
  }

  paymentButton(data: Order) {
    let user = localStorage.getItem('user');
    let userData = user && JSON.parse(user);
    userData && userData.forEach((element: { id: number }) => {
      userData = element.id;
    });
    let orderData: Order = {
      ...data,
      totalPrice: this.priceSummary.total,
      userId: userData,
    };

    setTimeout(() => {
      this.cartData?.forEach((element) => {
        element.id && this.bookService.deleteCartItems(element.id);
      });
    }, 500);

    this.bookService.orderNow(orderData).subscribe((result) => {
      if (result) {
        this.toastr.success('Order placed successfully', 'Order Placed.', {
          positionClass: 'toast-bottom-right',
        });
        setTimeout(() => {
          this.router.navigate(['/my-order']);
        }, 1000);
      }
    });

  }
}
