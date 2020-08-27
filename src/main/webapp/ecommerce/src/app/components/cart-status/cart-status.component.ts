import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  private totalSum: number = 0;
  private totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartStatusInfo$.subscribe(statusInfo => {
      this.totalQuantity = statusInfo.totalQuantity;
      this.totalSum = statusInfo.totalSum;
    });
  }

}
