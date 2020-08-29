import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {map} from "rxjs/operators";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormServiceService {

  private static readonly YEARS_NUMBER: number = 10;
  private static readonly COUNTRIES_URL: string = 'http://localhost:8080/api/countries';
  private static readonly STATES_URL: string = 'http://localhost:8080/api/states';

  constructor(private httClient: HttpClient) { }

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
  
  public getCountries(): Observable<Country[]> {
    return this.httClient.get<GetCountriesResponse>(CheckoutFormServiceService.COUNTRIES_URL)
      .pipe(
        map(
          response => response._embedded.countries
        )
      );
  }

  public getStatesByCountryCode(countryCode: string): Observable<State[]> {
    const url = `${CheckoutFormServiceService.STATES_URL}/search/findByCountryCode?code=${countryCode}`;
    return this.httClient.get<GetStatesResponse>(url)
      .pipe(
        map(
          response => response._embedded.states
        )
      );
  }

}

export interface GetCountriesResponse {
  _embedded: {
    countries: Country[]
  }
}

export interface GetStatesResponse {
  _embedded: {
    states: State[]
  }
}
