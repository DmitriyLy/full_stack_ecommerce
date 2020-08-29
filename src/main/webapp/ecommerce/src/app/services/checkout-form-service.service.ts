import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormServiceService {

  private static readonly YEARS_NUMBER: number = 10;

  constructor() { }

  public getMonthArray(): Observable<number[]> {

    let data: number[] = [];

    for(let i = 1; i <= 12; i++ ) {
      data.push(i);
    }

    return of(data);
  }

  public getYearArray(): Observable<number[]> {

    let data: number[] = [];

    let currentYear: number = (new Date()).getFullYear();

    for(let i = 0; i < CheckoutFormServiceService.YEARS_NUMBER; i++) {
      data.push(currentYear + i);
    }

    return of(data);
  }

}
