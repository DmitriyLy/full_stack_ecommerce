import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private checkoutFormGroup: FormGroup;
  billingAddressEqualsShippingAddress: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

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

  }

  onSubmit(): void {
    console.log(this.checkoutFormGroup.controls.customer.value);
    console.log(this.checkoutFormGroup.controls.shippingAddress.value);
  }

  changeBillingAddressSameCheckbox(event: any): void {
    this.billingAddressEqualsShippingAddress = event.target.checked;
  }

}
