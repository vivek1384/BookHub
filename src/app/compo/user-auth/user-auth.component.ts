import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Book, Cart, UserLogIn, UserSignUp } from '../../data-types';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  ngOnInit(): void {
    this.user.userLoginRedirect();
  }
  constructor(private user: UserService, private Book: BookService, private fb:FormBuilder) {}
  myForm!: FormGroup

  isSignup = false;
  onClickSignUp() {
    this.isSignup = false;
  }
  onClickLogin() {
    this.isSignup = true;
  }

  LogIn(data: UserLogIn): void {
    this.user.userLogIn(data);
    this.localCartToRemoteCart();
  }

  SignUp(data: UserSignUp): void {
    this.user.userSignUp(data);
    this.localCartToRemoteCart();
    this.isSignup = true;
  }

  localCartToRemoteCart() {
    console.log('worked.');
    let userId = 0
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList : Book[] = JSON.parse(data);
      setTimeout(() => {
        let user = localStorage.getItem('user');
        if (user) {
          let userData = JSON.parse(user);
          userData.forEach((obj: { id: number }) => {
            console.log('ID:', obj.id);
            userId = obj.id;
          });

        }        
        else {
          console.log('No data found');
        }

        cartDataList.forEach((book:Book, index)=>{
          let cartData : Cart = {
            ...book,
            bookId : book.id,
            userId
          }
          this.Book.addToCartUser(cartData).subscribe((res)=>{
            if(res){
              console.log("Data is stored in DataBase.");
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
        })


      }, 500);
    }
    setTimeout(() => {
      this.Book.getCartItem(userId)
    }, 1500);
  }
}
