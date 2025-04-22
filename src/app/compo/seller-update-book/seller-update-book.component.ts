import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../data-types';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-update-book',
  imports: [FormsModule],
  templateUrl: './seller-update-book.component.html',
  styleUrl: './seller-update-book.component.css',
})
export class SellerUpdateBookComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private book: BookService,
    private toastr: ToastrService,
    private route: Router
  ) {}
  ngOnInit(): void {
    let bookId = this.router.snapshot.paramMap.get('id');
    console.log(bookId);
    this.book.getBook(bookId).subscribe((res) => {
      this.bookObg = res;
    });
  }
  bookObg: undefined | Book;
  submit(data: Book) {
    if (this.bookObg) {
      data.id = this.bookObg.id;
    }
    // console.log(data)
    this.book.updateBook(data).subscribe((res) => {
      this.toastr.success('Book has been updated successfully.', 'Updated', {
        positionClass: 'toast-bottom-right',
      });
    });
    setTimeout(() => {
      this.route.navigate(['/seller-home']);
    }, 500);
  }
}
