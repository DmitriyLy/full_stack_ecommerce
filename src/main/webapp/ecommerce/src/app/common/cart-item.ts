import {Product} from "./product";

export class CartItem {

  public id: number;
  public name: string;
  public unitPrice: number;
  public imageUrl: string;
  public quantity: number;


  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;

    this.quantity = 1;
  }

}
