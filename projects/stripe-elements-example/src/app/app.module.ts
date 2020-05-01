import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripeElementsConfig, StripeElementsModule } from 'stripe-elements';
import { environment } from '../environments/environment';
import ElementsOptions = stripe.elements.ElementsOptions;

const style = {
    base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
    }
};

const elementsOptions: ElementsOptions = {
    style,
    placeholderCountry: 'es'
};
const stripeConfig: StripeElementsConfig = {
    stripeKey: environment.stripeKey,
    api: environment.firebaseEndpoint,
    elementOptions: elementsOptions
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        StripeElementsModule.forRoot(stripeConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
