import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { StripeElementsActionTypes, StripePay } from "./stripe-elements.actions";
import { tap } from "rxjs/operators";


@Injectable()
export class StripeElementsEffects {
    constructor(private actions$: Actions) {
    }

    @Effect({dispatch: false})
    stripePay$ = this.actions$.pipe(
        ofType<StripePay>(StripeElementsActionTypes.STRIPE_PAY),
        tap(() => {
            console.log('Pay')
        }));

}
