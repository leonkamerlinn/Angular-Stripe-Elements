import { StripeElementsActions } from './stripe-elements.actions';

export interface StripeFormContainerState {
    loaded: boolean;
    error: Error | undefined;
}

// Default data / initial state
export const initialState: StripeFormContainerState = {
    loaded: false,
    error: undefined,
};

export function stripeElementsReducer(state: StripeFormContainerState = initialState, action:
    StripeElementsActions): StripeFormContainerState {
    switch (action.type) {
        default:
            return state;
    }
}
