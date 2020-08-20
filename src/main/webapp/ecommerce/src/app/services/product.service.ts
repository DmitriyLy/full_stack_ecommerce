import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../common/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private static readonly BASE_URL: string = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(ProductService.BASE_URL).pipe(
      map(response => response._embedded.products)
    );
  }
  
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}