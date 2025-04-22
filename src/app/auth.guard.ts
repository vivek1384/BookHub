import {
  CanActivate,
  UrlTree,
} from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private sellerServices: SellerService) {}

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('seller')) {
      return of(true);
    }
    return this.sellerServices.isSellerLoggedIn;
  }

}
