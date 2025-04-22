import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../data-types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faChevronRight, faCartShopping, faBagShopping} from '@fortawesome/free-solid-svg-icons'
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, CurrencyPipe, FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private book: BookService, private router:Router ,private toastr:ToastrService) {}
  icon= faChevronRight
  bookGrid : undefined | Book[]
  delete = faBagShopping
  edit = faCartShopping


  ngOnInit(): void {
    this.pageInit();
    this.pageInit2()

  }  
  currentIndex = 0;
  bookHeader: any | Book[];

  pageInit() {
    this.book.bookListHeader().subscribe((res) => {
      this.bookHeader = res;
    });  
  }  

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.bookHeader.length;
  }  

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.bookHeader.length) % this.bookHeader.length;
  }  


  
    onDelete(id:number){
      this.book.deleteBook(id).subscribe((res)=>{
        if(res){
          this.toastr.success('Book Deleted Successfully', 'Deleted.') 
          setTimeout(() => {
            this.pageInit()
          }, 500); 
        }
      })
    }
  

    pageInit2(){
      this.book.bookGrid().subscribe((res)=>{
        this.bookGrid = res; 
       })
    }
  
  
  
}
