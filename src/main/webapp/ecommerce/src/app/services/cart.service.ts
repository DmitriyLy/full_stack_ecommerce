import { Injectable } from '@angular/core';
import { CartItem } from "../common/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: CartItem[] = [];
  public totalQuantity: number = 0;
  public totalSum: number = 0;

  constructor() { }

  public addCartItem(newItem: CartItem): void {

    let existingItem: CartItem = this.cartItems.find(item => item.id == newItem.id);

    if (!!existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(newItem);
    }

    this.computeTotals();

  }

  public decrementQuantity(cartItem: CartItem): void {
    cartItem.quantity--;

    if (cartItem.quantity == 0) {
      this.removeCartItem(cartItem)
    } else {
      this.computeTotals();
    }

  }

  public removeCartItem(cartItem: CartItem): void {
    const itemIndex: number = this.cartItems.findIndex(item => item.id == cartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeTotals();
    }
  }

  private computeTotals(): void {
    let tempQuantity: number = 0;
    let tempSum: number = 0;

    this.cartItems.forEach(item => {
      tempQuantity += item.quantity;
      tempSum += item.unitPrice * item.quantity;
    });

    this.totalSum = tempSum;
    this.totalQuantity = tempQuantity;
  }

}
