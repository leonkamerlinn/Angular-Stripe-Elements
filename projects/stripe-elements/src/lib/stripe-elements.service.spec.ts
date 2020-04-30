import { TestBed } from '@angular/core/testing';

import { StripeElementsService } from './stripe-elements.service';

describe('StripeElementsService', () => {
    let service: StripeElementsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StripeElementsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
