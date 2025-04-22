import { Component, OnInit } from '@angular/core';
import { Order } from '../../data-types';
import { BookService } from '../../services/book.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-order',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit {
  orderList : Order[] | undefined
  noOrderMsg : string = "No orders found";
  noOrderMsg2: string = 'Click Here To Explore The Best...';
  orederMsg = true
  constructor(private book: BookService, private toastr: ToastrService) { }
  ngOnInit(): void {
   this.getOrderList()
  }
  cancelOrder(orderId: number){
    this.book.cancelOrder(orderId).subscribe((res)=>{
      this.toastr.info('Order cancled successfully!', 'Order cancled.',{
        positionClass: 'toast-bottom-right'
      })
      setTimeout(() => {
        this.getOrderList()
      }, 500);
    })
  }
  getOrderList(){
    this.book.orderList().subscribe((res)=>{
      if(res){
        this.orderList = res;
        if(this.orderList.length > 0){
          this.orederMsg = false
        }
      }
    })
  }
  
}
