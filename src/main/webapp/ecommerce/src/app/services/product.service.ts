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

  public getProduct(productId: number): Observable<Product> {
    const url: string = `${ProductService.BASE_URL}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  public getProductListPaginate(categoryId: number,
                                page: number,
                                size: number): Observable<GeProductResponse> {
    const searchUrl: string = `${ProductService.BASE_URL}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;
    return this.httpClient.get<GeProductResponse>(searchUrl);
  }

  public getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl: string = `${ProductService.BASE_URL}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  public getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GeProductCategoryResponse>(ProductService.CATEGORY_URL).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  public searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl: string = `${ProductService.BASE_URL}/search/findByNameContaining?name=${keyword}`
    return this.getProducts(searchUrl);
  }

  private getProducts(url: string): Observable<Product[]> {
    return this.httpClient.get<GeProductResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }

}

export interface GeProductResponse {
  _embedded: {
    products: Product[];
  },
  page: PaginationParams
}

export interface GeProductCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

export interface PaginationParams {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
