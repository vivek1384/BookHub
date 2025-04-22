import { Injectable } from '@angular/core';
import { UserLogIn, UserSignUp } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignUp(data: UserSignUp) {
    this.http
      .post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/user-auth']);
          this.toastr.success('Now Please Login!', 'Signup Success.', {
            positionClass: 'toast-bottom-right',
          });
        }
      });
  }

  userLoginRedirect() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
  userLogIn(data: UserLogIn) {
    this.http
      .get(
        `http://localhost:3000/user?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
          this.toastr.success('User login successfully!', 'Login Success.', {
            positionClass: 'toast-bottom-right',
          });
        } else {
          this.toastr.error('Email or Password is incorrect', 'Login Failed.', {
            positionClass: 'toast-bottom-right',
          });
        }
      });
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
