import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { LogIn, SignUp } from '../../data-types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  constructor(
    private seller: SellerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isSignup = false;
  authError: string = '';
  onClickSignUp() {
    this.isSignup = false;
  }
  onClickLogin() {
    this.isSignup = true;
  }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  logIn(data: LogIn): void {
    this.authError = '';
    // console.warn(data);
    this.seller.userLogIn(data);

  //   this.router.events.subscribe((val: any) => {
  //     if(val.url){
  //     if (val.url.includes === '/seller-home') {
  //       this.toastr.success('Seller is logged in successfully', 'Login Success');
  //     }
  //   }
  // });
  //    if (this.seller.isLoginError) {
  //     this.toastr.error('Email or Password is incorrect.', 'Login Failed');
  //   }
  }
}
