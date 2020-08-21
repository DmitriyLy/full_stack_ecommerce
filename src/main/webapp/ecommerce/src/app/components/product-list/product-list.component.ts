import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private static readonly DEFAULT_CATEGORY_ID: number = 1;

  private products: Product[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.listProducts());
  }

  private listProducts(): void {
    this.productService.getProductList(this.getCategoryId())
      .subscribe(data => this.products = data);
  }

  private getCategoryId(): number {
    if (!!this.route.snapshot.paramMap.get('id')) {
      return this.route.snapshot.paramMap.get('id') as unknown as number;
    } else {
      return ProductListComponent.DEFAULT_CATEGORY_ID;
    }
  }

}
