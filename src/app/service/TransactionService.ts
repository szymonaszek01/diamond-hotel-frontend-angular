import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TransactionStatusInfoDto} from "../dto/transaction/TransactionStatusInfoDto";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // URL_PRODUCTION
  private url = 'https://diamond-hotel-backend.onrender.com/api/v1/transaction';

  // URL_LOCALHOST
  // private url = 'http://localhost:5432/api/v1/transaction';

  private payment: string = 'https://checkout.stripe.com/checkout.js';

  private key: string = 'pk_test_51NCOIJHClfuzSQRfRrX2oW3tN4OQBgzAHgbbxFrOZvEmc2uoZ0Jlk87UNmBV1SteuRKFJQfJzEpcoI0c39c4LWTM00lvEcKXkR';

  paymentHandler: any = null;

  constructor(private http: HttpClient) {
    this.invokeStripe();
  }

  public changeTransactionStatus(transactionStatusInfoDto: TransactionStatusInfoDto): Observable<TransactionStatusInfoDto> {
    return this.http.post<TransactionStatusInfoDto>(this.url + '/change/status', transactionStatusInfoDto);
  }

  public initializePayment(title: string, description: string, amount: number): Observable<any> {
    return new Observable((observer) => {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: this.key,
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
      script.src = this.payment;
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
