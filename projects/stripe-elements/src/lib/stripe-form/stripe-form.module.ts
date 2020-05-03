import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StripeFormComponent} from './stripe-form.component';


@NgModule({
    declarations: [StripeFormComponent],
    imports: [
        CommonModule
    ],
    exports: [StripeFormComponent]
})
export class StripeFormModule {
}
