import { Inject, Injectable } from '@angular/core';
import { StripeElementsConfig, StripeElementsConfigService } from './stripe-elements.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ElementsOptions = stripe.elements.ElementsOptions;
import PaymentIntent = stripe.paymentIntents.PaymentIntent;

@Injectable({
    providedIn: 'root'
})
export class StripeElementsService {
    constructor(@Inject(StripeElementsConfigService) private config: StripeElementsConfig, private http: HttpClient) {
    }

    get stripeKey(): string {
        return this.config.stripeKey;
    }

    get elementsOptions(): ElementsOptions {
        return this.config.elementOptions;
    }


    createPaymentIntent(payload: any): Observable<PaymentIntent> {
        return this.http.post<PaymentIntent>(`${ this.config.api }/intents`, payload);
    }
}
