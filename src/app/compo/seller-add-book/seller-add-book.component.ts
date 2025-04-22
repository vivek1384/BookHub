import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../data-types';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-book',
  imports: [FormsModule],
  templateUrl: './seller-add-book.component.html',
  styleUrl: './seller-add-book.component.css',
})
export class SellerAddBookComponent {
  addBookMessage: string | undefined;

  addNewbook(data: Book) {
    // console.log(data);
    this.book.addBook(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.toastr.success('Book Added successfully!', 'Added.', {
          positionClass: 'toast-bottom-right',
        });
      }
      setTimeout(() => {
        this.router.navigate(['/seller-home']);
      }, 500);
    });
  }

  constructor(
    private book: BookService,
    private toastr: ToastrService,
    private router: Router
  ) {}
}
