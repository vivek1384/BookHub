import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Book, Cart, Order } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  totalCart: number = 0;
  cartItemsData = new EventEmitter<Book[] | []>();
  addBook(data: Book) {
    return this.http.post('http://localhost:3000/book', data);
  }
  bookList() {
    return this.http.get<Book[]>('http://localhost:3000/book');
  }
  deleteBook(id: number) {
    return this.http.delete(`http://localhost:3000/book/${id}`);
  }
  getBook(id: string | null) {
    return this.http.get<Book>(`http://localhost:3000/book/${id}`);
  }
  updateBook(book: Book) {
    return this.http.put<Book>(`http://localhost:3000/book/${book.id}`, book);
  }
  bookListHeader() {
    return this.http.get<Book[]>('http://localhost:3000/book?_limit=5');
  }
  bookGrid() {
    return this.http.get<Book[]>('http://localhost:3000/book?_limit=10');
  }
  bookDetails(id: number) {
    return this.http.get<Book>(`http://localhost:3000/book/${id}`);
  }
  searchBook(searchText: string) {
    // debugger;
    return this.http.get<Book[]>(
      `http://localhost:3000/book?name=${searchText}`
    );
  }
  localCartData(data: Book) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.totalCart = 1;
      this.cartItemsData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.totalCart = this.totalCart + 1;
      this.cartItemsData.emit(cartData);
    }
  }
  removeFromCart(bookId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let item: Book[] = JSON.parse(cartData);
      item = item.filter((item: Book) => bookId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(item));
      this.cartItemsData.emit(item);
    }
  }
  addToCartUser(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartItem(userId: number) {
    return this.http
      .get<Book[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartItemsData.emit(result.body);
          // console.log('cart added.');
        }
      });
  }
  removeToCartJson(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    // debugger;
    

    userData.forEach((element: { id: any; name: any }) => {
      let userId2 = element.id;
      // console.log(userId2)
      userData = userId2;
    });
    // debugger;
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId=' + userData);
  }

  orderNow(data:Order){
    return this.http.post('http://localhost:3000/order', data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    userData.forEach((element: { id: any; name: any }) => {
      let userId2 = element.id;
      userData = userId2;
    });
    return this.http.get<Order[]>('http://localhost:3000/order?userId=' + userData);
  }
  deleteCartItems(cartId:any){
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((res)=>{
      this.cartItemsData.emit([])
    })
  }
  cancelOrder(orderId: number){
    return this.http.delete('http://localhost:3000/order/' + orderId)
  }
}
