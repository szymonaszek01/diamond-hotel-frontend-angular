import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private url: string = 'https://checkout.stripe.com/checkout.js';

  private api_key: string = 'pk_test_51NCOIJHClfuzSQRfRrX2oW3tN4OQBgzAHgbbxFrOZvEmc2uoZ0Jlk87UNmBV1SteuRKFJQfJzEpcoI0c39c4LWTM00lvEcKXkR';

  paymentHandler: any = null;

  constructor() {
    this.invokeStripe();
  }

  public initializePayment(title: string, description: string, amount: number): Observable<any> {
    return new Observable((observer) => {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.api_key,
        locale: 'auto',
        token: function (stripeToken: any) {
          observer.next(stripeToken);
          observer.complete();
        },
      });

      paymentHandler.open({
        name: title,
        description: description,
        amount: amount * 100
      });
    });
  }

  private invokeStripe(): void {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = this.url;
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NCOIJHClfuzSQRfRrX2oW3tN4OQBgzAHgbbxFrOZvEmc2uoZ0Jlk87UNmBV1SteuRKFJQfJzEpcoI0c39c4LWTM00lvEcKXkR',
          locale: 'auto'
        });
      }
      window.document.body.appendChild(script);
    }
  }
}
