import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { StripeElementsService } from './stripe-elements.service';
import ConfirmCardPaymentData = stripe.ConfirmCardPaymentData;
import ElementsOptions = stripe.elements.ElementsOptions;
import StripePaymentRequestOptions = stripe.paymentRequest.StripePaymentRequestOptions;

@Component({
    selector: 'ngrx-stripe-elements',
    templateUrl: './stripe-elements.component.html',
    styleUrls: ['./stripe-elements.component.scss']
})
export class StripeElementsComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('cardNumberRef') cardNumberRef: ElementRef;
    @ViewChild('cardCvcRef') cardCvcRef: ElementRef;
    @ViewChild('cardExpiryRef') cardExpiryRef: ElementRef;
    @ViewChild('postalCodeRef') postalCodeRef: ElementRef;
    @ViewChild('paymentRequestButtonRef') paymentRequestButtonRef: ElementRef;


    @Input() stripeKey = 'pk_test_8O8TGlrvYKNOWTrxdxOEKqav00ZQlG4owt';
    @Input() payButtonText = 'Pay';
    @Output() createPaymentIntent: EventEmitter<void> = new EventEmitter();
    @Output() paymentSucceeded: EventEmitter<void> = new EventEmitter();
    @Output() paymentFailed: EventEmitter<stripe.Error> = new EventEmitter();

    private stripe: stripe.Stripe;
    private cardNumberElement: stripe.elements.Element;
    private cardCvcElement: stripe.elements.Element;
    private cardExpiryElement: stripe.elements.Element;
    private elements: stripe.elements.Elements;
    private paymentRequest: stripe.paymentRequest.StripePaymentRequest;
    private clientSecret: string;

    cardNumberError: stripe.Error;
    cardCvcError: stripe.Error;
    cardExpiryError: stripe.Error;

    constructor(public service: StripeElementsService) {
        console.log(service);
    }

    ngOnInit() {

    }

    private init() {
        this.stripe = Stripe(this.stripeKey);
        this.elements = this.stripe.elements();
        const style = {
            base: {
                lineHeight: '24px',
                fontFamily: 'monospace',
                fontSmoothing: 'antialiased',
                fontSize: '19px',
            }
        };
        this.mountCardNumber({style});
        this.mountCardCvc({style});
        this.mountCardExpiry({style});
    }

    ngAfterViewInit() {
        this.init();
    }


    public createPaymentRequest(stripePaymentRequestOptions: StripePaymentRequestOptions) {
        this.paymentRequest = this.stripe.paymentRequest(stripePaymentRequestOptions);


        const prButton = this.elements.create('paymentRequestButton', {
            paymentRequest: this.paymentRequest,
        });


        this.paymentRequest.canMakePayment().then(result => {
            if (result) {
                prButton.mount(this.paymentRequestButtonRef.nativeElement);
            } else {
                this.paymentRequestButtonRef.nativeElement.style.display = 'none';
            }
        });

        this.paymentRequest.on('paymentmethod', async (ev) => {
            // Confirm the PaymentIntent without handling potential next actions (yet).
            const {error: confirmError} = await this.stripe.confirmCardPayment(
                this.clientSecret,
                {payment_method: ev.paymentMethod.id},
                {handleActions: false}
            );

            if (confirmError) {
                // Report to the browser that the payment failed, prompting it to
                // re-show the payment interface, or show an error message and close
                // the payment interface.
                ev.complete('fail');
            } else {
                // Report to the browser that the confirmation was successful, prompting
                // it to close the browser payment method collection interface.
                ev.complete('success');
                // Let Stripe.js handle the rest of the payment flow.
                const {error, paymentIntent} = await this.stripe.confirmCardPayment(this.clientSecret);
                if (error) {
                    // The payment failed -- ask your customer for a new payment method.
                    this.paymentFailed.emit(error);
                } else {
                    // The payment has succeeded.
                    this.paymentSucceeded.emit();
                }
            }
        });
    }


    private mountCardExpiry(elementsOptions?: ElementsOptions) {
        this.cardExpiryElement = this.elements.create('cardExpiry', elementsOptions);
        this.cardExpiryElement.mount(this.cardExpiryRef.nativeElement);
        this.cardExpiryElement.addEventListener('change', ({error}) => {
            this.cardExpiryError = error;
        });
    }

    private mountCardCvc(elementsOptions?: ElementsOptions) {
        this.cardCvcElement = this.elements.create('cardCvc', elementsOptions);
        this.cardCvcElement.mount(this.cardCvcRef.nativeElement);
        this.cardCvcElement.addEventListener('change', ({error}) => {
            this.cardCvcError = error;
        });
    }

    private mountCardNumber(elementsOptions?: ElementsOptions) {
        this.cardNumberElement = this.elements.create('cardNumber', elementsOptions);
        this.cardNumberElement.mount(this.cardNumberRef.nativeElement);
        this.cardNumberElement.addEventListener('change', ({error}) => {
            this.cardNumberError = error;
        });
    }

    ngOnDestroy() {
        this.cardNumberElement.destroy();
        this.cardExpiryElement.destroy();
        this.cardExpiryElement.destroy();
    }


    public async createSource() {
        const {source, error} = await this.stripe.createSource(this.cardNumberElement);

        if (error) {
        }
    }

    public async createToken() {
        const {token, error} = await this.stripe.createToken(this.cardNumberElement);

        if (error) {
        }
    }

    public async confirmCardPayment(clientSecret: string, confirmCardPaymentData: ConfirmCardPaymentData) {
        try {
            const result = await this.stripe.confirmCardPayment(clientSecret, confirmCardPaymentData);
            const paymentIntent = result.paymentIntent;
        } catch (e) {
            if (e) {
            }
        }
    }


    onSubmit() {
        this.createPaymentIntent.emit();
    }

}
