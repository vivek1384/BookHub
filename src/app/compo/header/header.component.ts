import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BookService } from '../../services/book.service';
import { Book } from '../../data-types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, TitleCasePipe, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private bookService: BookService,
    private toastr: ToastrService
  ) {}
  menuType: string = 'Default';
  searchResult: Book[] | undefined;
  userIcon = faUser;
  sellerName: any = '';
  userName: any = '';
  cart = 0;
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('inside');
          this.menuType = 'Seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else if (localStorage.getItem('user')) {
          this.menuType = 'User';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = userData.name

        //   userData.forEach((element: { id: any, name:any }) => {
        //     let userId2 = element.id;
        //     // console.log(userId2);
        //     userData = userId2;
        //     let userName = element.name
        //     this.userName = userName;
        // });
          

          this.bookService.getCartItem(userData)
        } 
        else if (val.url.includes('book-details')) {
          this.menuType = 'BookDetails';
        } 
        else {
          // console.log('outside');
          this.menuType = 'Default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cart = JSON.parse(cartData).length;
    }
    this.bookService.cartItemsData.subscribe((item)=>{
      this.cart = item.length;
    });
  }

  logOut() {
    const isLogout = confirm('Are you sure want to LOGOUT?');
    if (isLogout) {
      localStorage.removeItem('seller');
      this.router.navigate(['/']);
      this.toastr.info('LogOut Successfully!', 'LogOut', {
        positionClass: 'toast-bottom-right',
      });
      this.bookService.cartItemsData.emit([])
    }
  }
  userLogout() {
    const isLogOut = confirm('Are you sure want to LOGOUT?');
    if (isLogOut) {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      this.toastr.info('LogOut Successfully!', 'LogOut', {
        positionClass: 'toast-bottom-right',
      });
    }
  }
  searchBook(searchText: KeyboardEvent) {
    if (searchText) {
      const element = searchText.target as HTMLInputElement;
      this.bookService.searchBook(element.value).subscribe((res) => {
        // console.log(res)
        this.searchResult = res;
        console.log(this.searchResult);
        const names: string[] = this.searchResult.map((person) => person.name);
      });
      // console.log(element.value)
    }
  }
  onSearch() {
    if (this.searchResult) {
      this.searchResult.forEach((person) => {
        // console.log(person.id);
        this.router.navigate([`/book-details/${person.id}`]);
      });
    }
  }
}
