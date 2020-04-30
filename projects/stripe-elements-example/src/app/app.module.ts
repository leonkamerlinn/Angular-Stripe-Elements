import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripeElementsModule } from 'stripe-elements';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        StripeElementsModule.forRoot({stripeKey: 'hello world'})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
