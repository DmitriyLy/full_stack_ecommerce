import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../common/product";
import { CartService } from "../../services/cart.service";
import { CartItem } from "../../common/cart-item";

@Component({
  selector: 'app-prodyct-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.getProduct());
  }

  private getProduct(): void {
    this.productService.getProduct(this.route.snapshot.paramMap.get('id') as unknown as number)
      .subscribe(data => this.product = data);
  }

  private addToCart(): void {
    this.cartService.addCartItem(new CartItem(this.product))
  }

}
