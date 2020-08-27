import { Injectable } from '@angular/core';
import { CartItem } from "../common/cart-item";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: CartItem[] = [];

  public cartStatusInfo$: Subject<CartStatusInfo> = new Subject<CartStatusInfo>();

  constructor() { }

  public addCartItem(newItem: CartItem): void {

    let existingItem: CartItem = this.cartItems.find(item => item.id == newItem.id);

    if (!!existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(newItem);
    }

    this.informCartStatusChange();

  }

  private informCartStatusChange(): void {
    this.cartStatusInfo$.next(this.getCartStatusInfo());
  }

  private getCartStatusInfo(): CartStatusInfo {
    let cartStatusInfo: CartStatusInfo = {totalQuantity: 0, totalSum: 0};

    for (let cartItem of this.cartItems) {
      cartStatusInfo.totalQuantity += cartItem.quantity;
      cartStatusInfo.totalSum += cartItem.quantity * cartItem.unitPrice;
    }

    return cartStatusInfo;
  }

}

export interface CartStatusInfo {
  totalSum: number;
  totalQuantity: number;
}
