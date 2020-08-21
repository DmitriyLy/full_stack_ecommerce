import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../common/product";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductCategory } from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private static readonly BASE_URL: string = 'http://localhost:8080/api/products';
  private static readonly CATEGORY_URL: string = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  public getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl: string = `${ProductService.BASE_URL}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GeProductResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  public getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GeProductCategoryResponse>(ProductService.CATEGORY_URL).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GeProductResponse {
  _embedded: {
    products: Product[];
  }
}

interface GeProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
