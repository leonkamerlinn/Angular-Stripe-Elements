import { Inject, Injectable } from '@angular/core';
import { StripeElementsConfigService } from './stripe-elements.module';

@Injectable({
    providedIn: 'root'
})
export class StripeElementsService {

    constructor(@Inject(StripeElementsConfigService) private config) {
        console.log(config);
    }
}
