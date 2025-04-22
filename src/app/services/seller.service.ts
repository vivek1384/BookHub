import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogIn, SignUp } from '../data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  static isLoggedIn: any;

  isLoginError: boolean = true;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']);
        this.toastr.success('Seller sign-up successfully!', 'SignUp Success.', {
          positionClass: 'toast-bottom-right',
        });
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }
  userLogIn(data: LogIn) {
    // console.log(data);
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        // console.log(result.body);
        if (result && result.body && result.body.length) {
          // console.log("User Logged In.")
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['/seller-home']);
          this.toastr.success('Seller login successfully!', 'Login Success.', {
            positionClass: 'toast-bottom-right',
          });
          this.isLoginError = false;
        } else {
          this.isLoginError = true;
          this.toastr.error('Email or Password is incorrect', 'Login Failed.', {
            positionClass: 'toast-bottom-right',
          });
        }
      });
  }
}
