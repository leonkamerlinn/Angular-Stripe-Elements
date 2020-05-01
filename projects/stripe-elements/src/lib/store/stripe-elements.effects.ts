import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    CreatePaymentIntentFail,
    CreatePaymentIntentSuccess,
    StripeElementsActionTypes,
    StripePay,
    StripePayFail,
    StripePaySuccess
} from './stripe-elements.actions';
import { StripeElementsService } from '../stripe-elements.service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';


@Injectable()
export class StripeElementsEffects {
    constructor(private actions$: Actions, private service: StripeElementsService) {
    }

    @Effect()
    stripePay$: Observable<CreatePaymentIntentSuccess | CreatePaymentIntentFail> = this.actions$.pipe(
        ofType<StripePay>(StripeElementsActionTypes.STRIPE_PAY),
        mergeMap(
            (action) => from(this.service.createPaymentIntent(action.payload)).pipe(
                map(data => new CreatePaymentIntentSuccess(data, action.stripeElements, action.paymentData)),
                catchError(err => of(new CreatePaymentIntentFail(err)))
            )
        )
    );

    @Effect()
    paymentIntentSuccess$: Observable<StripePaySuccess | StripePayFail> = this.actions$.pipe(
        ofType<CreatePaymentIntentSuccess>(StripeElementsActionTypes.CREATE_PAYMENT_INTENT_SUCCESS),
        mergeMap(
            (action) => from(action.stripeElements.confirmCardPayment(action.payload, action.paymentData)).pipe(
                map(data => new StripePaySuccess(data)),
                catchError(err => of(new StripePayFail(err)))
            )
        )
    );
}
