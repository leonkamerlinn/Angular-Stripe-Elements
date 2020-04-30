import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { StripeElementsComponent } from './stripe-elements.component';
import { StripeElementsService } from './stripe-elements.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface StripeElementsConfig {
    stripeKey: string;
}

export const StripeElementsConfigService = new InjectionToken<StripeElementsConfig>('StripeElementsConfig');

@NgModule({
    declarations: [StripeElementsComponent],
    imports: [CommonModule, FormsModule],
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
