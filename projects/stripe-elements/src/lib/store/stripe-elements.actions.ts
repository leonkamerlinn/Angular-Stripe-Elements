import { Action } from '@ngrx/store';


export enum StripeElementsActionTypes {
    STRIPE_PAY = '[STRIPE_FORM_CONTAINER] Pay',
    STRIPE_PAY_SUCCESS = '[STRIPE_FORM_CONTAINER] Pay Success',
    STRIPE_PAY_FAIL = '[STRIPE_FORM_CONTAINER] Pay Fail',
}

export class StripePay implements Action {
    readonly type = StripeElementsActionTypes.STRIPE_PAY;
}

export class StripePaySuccess implements Action {
    readonly type = StripeElementsActionTypes.STRIPE_PAY_SUCCESS;
}

export class StripePayFail implements Action {
    readonly type = StripeElementsActionTypes.STRIPE_PAY_FAIL;
}


export type StripeElementsActions =
    | StripePay
    | StripePaySuccess
    | StripePayFail;

