import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripeElementsConfig, StripeElementsModule } from 'stripe-elements';
import { environment } from '../environments/environment';
import ElementsOptions = stripe.elements.ElementsOptions;
import {HttpClientModule} from '@angular/common/http';

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
        HttpClientModule,
        StripeElementsModule.forRoot(stripeConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
