import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { StripeElementsComponent } from './stripe-elements.component';
import { StripeElementsService } from './stripe-elements.service';


export interface StripeElementsConfig {
    stripeKey: string;
}

export const StripeElementsConfigService = new InjectionToken<StripeElementsConfig>('StripeElementsConfig');

@NgModule({
    declarations: [StripeElementsComponent],
    imports: [],
    exports: [StripeElementsComponent]
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
