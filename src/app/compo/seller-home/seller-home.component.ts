import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../data-types';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  imports: [FontAwesomeModule, CurrencyPipe, RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  constructor(
    private book: BookService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  bookList: undefined | Book[];
  delete = faTrash;
  edit = faFilePen;

  ngOnInit(): void {
    this.pageInit();
  }

  onDelete(id: number) {
    this.book.deleteBook(id).subscribe((res) => {
      if (res) {
        this.toastr.warning('Book Deleted Successfully', 'Deleted.', {
          positionClass: 'toast-bottom-right',
        });
        setTimeout(() => {
          this.pageInit();
        }, 500);
      }
    });
  }

  onEdit(id: number) {
    // this.router.navigate(['/seller-update-book/'])
  }

  pageInit() {
    this.book.bookList().subscribe((res) => {
      this.bookList = res;
    });
  }
}
