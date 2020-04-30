import { Component, OnInit } from '@angular/core';
import { StripeElementsService } from './stripe-elements.service';

@Component({
    selector: 'ngrx-stripe-elements',
    templateUrl: './stripe-elements.component.html',
    styleUrls: ['./stripe-elements.component.scss']
})
export class StripeElementsComponent implements OnInit {

    constructor(public service: StripeElementsService) {
        console.log(service);
    }

    ngOnInit(): void {
    }

}
