import { Routes } from '@angular/router';
import { HomeComponent } from './compo/home/home.component';
import { SellerAuthComponent } from './compo/seller-auth/seller-auth.component';
import { PagenotfoundComponent } from './compo/pagenotfound/pagenotfound.component';
import { SellerHomeComponent } from './compo/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddBookComponent } from './compo/seller-add-book/seller-add-book.component';
import { SellerUpdateBookComponent } from './compo/seller-update-book/seller-update-book.component';
import { BookComponent } from './compo/book/book.component';
import { UserAuthComponent } from './compo/user-auth/user-auth.component';
import { CartComponent } from './compo/cart/cart.component';
import { CheckOutComponent } from './compo/check-out/check-out.component';
import { MyOrderComponent } from './compo/my-order/my-order.component';

export const routes: Routes = [
  //   {
  //     path: '',
  //     redirectTo: 'home',
  //     pathMatch: 'full',
  //   },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-add-book',
    component: SellerAddBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-update-book/:id',
    component: SellerUpdateBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book-details/:id',
    component: BookComponent,
  },
  {
    path: 'user-auth',
    component: UserAuthComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
  },
  {
    path: 'my-order',
    component: MyOrderComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];
