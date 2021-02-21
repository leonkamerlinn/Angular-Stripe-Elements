import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { StripeElementsService } from '../stripe-elements.service';
import ElementsOptions = stripe.elements.ElementsOptions;
import StripePaymentRequestOptions = stripe.paymentRequest.StripePaymentRequestOptions;
import PaymentIntentResponse = stripe.PaymentIntentResponse;
import PaymentIntent = stripe.paymentIntents.PaymentIntent;
import ConfirmCardPaymentData = stripe.ConfirmCardPaymentData;

@Component({
    selector: 'ngrx-stripe-form',
    templateUrl: './stripe-form.component.html',
    styleUrls: ['./stripe-form.component.scss']
})
export class StripeFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('cardNumberRef') cardNumberRef: ElementRef;
    @ViewChild('cardCvcRef') cardCvcRef: ElementRef;
    @ViewChild('cardExpiryRef') cardExpiryRef: ElementRef;
    @ViewChild('postalCodeRef') postalCodeRef: ElementRef;
    @ViewChild('paymentRequestButtonRef') paymentRequestButtonRef: ElementRef;


    @Input() stripeKey: string;
    @Input() payButtonText = 'Pay';
    @Input() elementOptions: ElementsOptions;
    @Output() paymentSucceeded: EventEmitter<void> = new EventEmitter();
    @Output() paymentFailed: EventEmitter<stripe.Error> = new EventEmitter();
    @Input() paymentOptions: any;

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

    constructor(private service: StripeElementsService) {
    }

    ngOnInit() {
        if (!this.stripeKey) {
            this.stripeKey = this.service.stripeKey;
        }

        if (!this.elementOptions) {
            this.elementOptions = this.service.elementsOptions;
        }

        this.init();
    }

    private init() {
        this.stripe = Stripe(this.stripeKey);
        this.elements = this.stripe.elements();
        this.mountCardNumber(this.elementOptions);
        this.mountCardCvc(this.elementOptions);
        this.mountCardExpiry(this.elementOptions);


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

    public async confirmCardPayment(paymentIntent: PaymentIntent, confirmCardPaymentData?: ConfirmCardPaymentData): Promise<PaymentIntentResponse> {
        try {
            return await this.stripe.confirmCardPayment(paymentIntent.client_secret, {
                ...confirmCardPaymentData,
                payment_method: {
                    card: this.cardNumberElement
                }
            });
        } catch (e) {
            return null;
        }
    }


    async pay() {
        try {
            const paymentIntent = await this.service.createPaymentIntent(this.paymentOptions).toPromise();
            await this.confirmCardPayment(paymentIntent);

        } catch (e) {

        }

    }

}
