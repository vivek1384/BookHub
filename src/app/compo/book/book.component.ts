import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book, Cart } from '../../data-types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(
    private book: BookService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) {}
  bookObg: undefined | Book;
  showRemovecart = false;
  counter: number = 1;
  cartData: Book | undefined;

  decrement() {
    if (this.counter == 1) {
      this.counter = 1;
    } else {
      this.counter--;
    }
  }
  increment() {
    this.counter++;
  }
  addToCart() {
    if (this.bookObg) {
      this.bookObg.quantity = this.counter;
      if (!localStorage.getItem('user')) {
        this.bookObg.quantity = this.counter;
        this.book.localCartData(this.bookObg);
        this.showRemovecart = true;
        this.toastr.success('Added to cart successfully!', 'Added.', {
          positionClass: 'toast-bottom-right',
        });
      } else {
        this.showRemovecart = true;
        // console.log("User Login.")
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user);

        userId && userId.forEach((element: { id: any }) => {
          let userId2 = element.id;
          // console.log(userId2);
          userId = userId2;
        });

        let cartData: Cart = {
          ...this.bookObg,
          bookId: this.bookObg.id,
          userId,
        };
        // console.log(cartData.quantity);

        this.book.addToCartUser(cartData).subscribe((res) => {
          this.toastr.success('Added to cart successfully!', 'Added.', {
            positionClass: 'toast-bottom-right',
          });
          this.book.getCartItem(userId);
        });
        // console.log(cartData)
      }
    }
  }
  removeToCart(data: number | undefined) {
    if (data) {
      if (!localStorage.getItem('user')) {
        this.book.removeFromCart(data);
        this.showRemovecart = false;
        this.toastr.error('Removed from cart successfully!', 'Removed.', {
          positionClass: 'toast-bottom-right',
        });
      } else {
        this.cartData &&
          this.book.removeToCartJson(this.cartData.id).subscribe((res) => {
            let user = localStorage.getItem('user');
            let userId = user && JSON.parse(user);

            userId && userId.forEach((element: { id: any }) => {
              let userId2 = element.id;
              // console.log(userId2);
              userId = userId2;
            });
            this.book.getCartItem(userId);
            this.toastr.error('Removed from cart successfully!', 'Removed.', {
              positionClass: 'toast-bottom-right',
            });
          });
      }
    }
  }
  ngOnInit(): void {
    let bookId = this.router.snapshot.paramMap.get('id');
    // console.log(bookId);
    this.book.getBook(bookId).subscribe((res) => {
      this.bookObg = res;
      let localData = localStorage.getItem('localCart');
      if (bookId && localData) {
        let items = JSON.parse(localData);
        items = items.filter((items: Book) => bookId === items.id.toString());
        if (items.length) {
          this.showRemovecart = true;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user);

        userId && userId.forEach((element: { id: any }) => {
          let userId2 = element.id;
          // console.log(userId2);
          userId = userId2;
        });
        this.book.getCartItem(userId);

        this.book.cartItemsData.subscribe((res) => {
          let item = res.filter(
            (item: Book) => bookId?.toString() === item.bookId?.toString()
          );
          if (item.length) {
            this.cartData = item[0];
            this.showRemovecart = true;
          } else {
            this.showRemovecart = false;
          }
        });
      }
    });
  }
}
