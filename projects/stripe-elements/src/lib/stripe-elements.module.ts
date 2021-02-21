import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { StripeElementsService } from './stripe-elements.service';
import { CommonModule } from '@angular/common';
import ElementsOptions = stripe.elements.ElementsOptions;


export interface StripeElementsConfig {
    stripeKey: string;
    api: string;
    elementOptions?: ElementsOptions;
}

export const StripeElementsConfigService = new InjectionToken<StripeElementsConfig>('StripeElementsConfig');

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: []
})
export class StripeElementsModule {
    static forRoot(config: StripeElementsConfig): ModuleWithProviders {
        return {
            ngModule: StripeElementsModule,
            providers: [
                StripeElementsService,
                {
                    provide: StripeElementsConfigService,
                    useValue: config
                }
            ]
        };
    }
}
