import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {CheckoutFormServiceService} from "../../services/checkout-form-service.service";
import {map} from "rxjs/operators";

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

  }

  onSubmit(): void {
    console.log(this.checkoutFormGroup.controls.customer.value);
    console.log(this.checkoutFormGroup.controls.shippingAddress.value);
  }

  changeBillingAddressSameCheckbox(event: any): void {
    this.billingAddressEqualsShippingAddress = event.target.checked;
  }

  private getExpirationYears(): Array<string> {

    let result : Array<string> = [];
    let currentYear: number = (new Date()).getFullYear();

    for (let i = 0; i < 15; i++) {
      result.push("" + (currentYear + i));
    }

    return result;
  }
}
