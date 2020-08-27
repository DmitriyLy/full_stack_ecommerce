import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { CartItem } from "../../common/cart-item";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  private incrementQuantity(cartItem: CartItem): void {
    this.cartService.addCartItem(cartItem);
  }

  private decrementQuantity(cartItem: CartItem): void {
    this.cartService.decrementQuantity(cartItem);
  }

  private removeItem(cartItem: CartItem): void {
    this.cartService.removeCartItem(cartItem);
  }

}
