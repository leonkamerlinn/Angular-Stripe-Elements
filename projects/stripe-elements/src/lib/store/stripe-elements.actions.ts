import { Action } from '@ngrx/store';
import { StripeElementsComponent } from '../stripe-elements.component';
import PaymentIntent = stripe.paymentIntents.PaymentIntent;
import ConfirmCardPaymentData = stripe.ConfirmCardPaymentData;
import PaymentIntentResponse = stripe.PaymentIntentResponse;


export enum StripeElementsActionTypes {
    STRIPE_PAY = '[STRIPE_ELEMENTS] Pay',
    STRIPE_PAY_SUCCESS = '[STRIPE_ELEMENTS] Pay Success',
    STRIPE_PAY_FAIL = '[STRIPE_ELEMENTS] Pay Fail',

    CREATE_PAYMENT_INTENT = '[STRIPE_ELEMENTS] Create Payment Intent',
    CREATE_PAYMENT_INTENT_SUCCESS = '[STRIPE_ELEMENTS] Create Payment Intent Success',
    CREATE_PAYMENT_INTENT_FAIL = '[STRIPE_ELEMENTS] Create Payment Intent Fail',
}

export class StripePay implements Action {
    readonly type = StripeElementsActionTypes.STRIPE_PAY;

    constructor(public payload: any, public stripeElements: StripeElementsComponent, public paymentData?: ConfirmCardPaymentData) {
    }
}

export class StripePaySuccess implements Action {
    readonly type = StripeElementsActionTypes.STRIPE_PAY_SUCCESS;

    constructor(public payload: PaymentIntentResponse) {
    }
}

export class StripePayFail implements Action {
    readonly type = StripeElementsActionTypes.STRIPE_PAY_FAIL;

    constructor(public payload: Error) {
    }
}

export class CreatePaymentIntent implements Action {
    readonly type = StripeElementsActionTypes.CREATE_PAYMENT_INTENT;

    constructor(public payload: any, stripeElements: StripeElementsComponent) {
    }
}

export class CreatePaymentIntentSuccess implements Action {
    readonly type = StripeElementsActionTypes.CREATE_PAYMENT_INTENT_SUCCESS;

    constructor(public payload: PaymentIntent, public stripeElements: StripeElementsComponent, public paymentData?:
        ConfirmCardPaymentData) {
    }
}

export class CreatePaymentIntentFail implements Action {
    readonly type = StripeElementsActionTypes.CREATE_PAYMENT_INTENT_FAIL;

    constructor(public payload: Error) {
    }
}

export type StripeElementsActions =
    | StripePay
    | StripePaySuccess
    | StripePayFail
    | CreatePaymentIntent
    | CreatePaymentIntentSuccess
    | CreatePaymentIntentFail;

