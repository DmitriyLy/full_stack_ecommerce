import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {CheckoutFormServiceService} from "../../services/checkout-form-service.service";
import {map} from "rxjs/operators";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private checkoutFormGroup: FormGroup;
  private billingAddressEqualsShippingAddress: boolean = false;
  private expirationYears: string[] = [];
  private expirationMonthes: string[] = [];
  private countries: Country[] = [];
  private shippingStates: State[] = [];
  private billingStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private formService: CheckoutFormServiceService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.formService.getYearArray()
      .pipe(
        map(data => data.map(value => "" + value))
      )
      .subscribe(data => this.expirationYears = data);

    this.formService.getMonthArray()
      .pipe(
        map(data => data.map(value => {
          if (value < 10) {
            return "0" + value;
          } else {
            return "" + value;
          }
        }))
      )
      .subscribe(data => this.expirationMonthes = data);

    this.formService.getCountries()
      .subscribe(data => this.countries = data);

  }

  onSubmit(): void {
    console.log(this.checkoutFormGroup.controls.customer.value);
    console.log(this.checkoutFormGroup.controls.shippingAddress.value);
  }

  changeBillingAddressSameCheckbox(event: any): void {
    this.billingAddressEqualsShippingAddress = event.target.checked;
  }

  getStates(formGroupName: string): void {

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const country = formGroup.value.country;

    formGroup.value.state = "";

    let statesArray = this.getStatesArrayByFormGroupName(formGroupName);
    while (statesArray.length) {
      statesArray.pop();
    }

    if (!country) {
      return;
    }

    this.formService.getStatesByCountryCode(country.code)
      .subscribe(data => data.forEach(item => statesArray.push(item)));

  }

  private getStatesArrayByFormGroupName(formGroupName: string): State[] {
    if (formGroupName === 'shippingAddress') {
      return this.shippingStates;
    } else {
      return this.billingStates;
    }
  }
}
