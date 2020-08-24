import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../common/product";

@Component({
  selector: 'app-prodyct-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.getProduct());
  }

  private getProduct(): void {
    this.productService.getProduct(this.route.snapshot.paramMap.get('id') as unknown as number)
      .subscribe(data => this.product = data);
  }

}
