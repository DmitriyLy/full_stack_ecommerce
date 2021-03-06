import { Component, OnInit } from '@angular/core';
import {PaginationParams, ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private static readonly DEFAULT_CATEGORY_ID: number = 1;

  private products: Product[];
  private currentCategoryName: string;
  private searchMode: boolean;
  private categoryId: number = ProductListComponent.DEFAULT_CATEGORY_ID;
  private previousCategoryId: number = ProductListComponent.DEFAULT_CATEGORY_ID;

  private pageNumber: number = 1;
  private pageSize: number = 5;
  private pageTotalElements: number;

  private previousKeyword: string = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.categoryId = this.getCategoryId();
      this.currentCategoryName = this.getCurrentCategoryName();
      this.listProducts();
    });
  }

  public updatePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  public addToCart(product: Product): void {

    const newItem: CartItem = new CartItem(product);

    this.cartService.addCartItem(newItem);

    console.log(product);
  }

  private listProducts(): void {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  private getCategoryId(): number {
    if (!!this.route.snapshot.paramMap.get('id')) {
      return this.route.snapshot.paramMap.get('id') as unknown as number;
    } else {
      return ProductListComponent.DEFAULT_CATEGORY_ID;
    }
  }

  private getCurrentCategoryName(): string {
    return this.route.snapshot.paramMap.get('name');
  }

  private handleListProducts(): void {

    if (this.previousCategoryId != this.categoryId) {
      this.pageNumber = 1;
    }

    this.productService.getProductListPaginate(this.categoryId, this.pageNumber - 1, this.pageSize)
      .subscribe(data => {
        this.products = data._embedded.products;
        this.fillPaginationParams(data.page);

      });
  }

  private handleSearchProducts(): void {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    if (keyword != this.previousKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;


    this.productService.searchProductListPaginate(keyword, this.pageNumber - 1, this.pageSize)
      .subscribe(data => {
        this.products = data._embedded.products;
        this.fillPaginationParams(data.page);
      });
  }

  private fillPaginationParams(params: PaginationParams): void {
    this.pageNumber = params.number + 1;
    this.pageSize = params.size;
    this.pageTotalElements = params.totalElements;
  }
}
