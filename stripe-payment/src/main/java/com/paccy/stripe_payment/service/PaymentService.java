package com.paccy.stripe_payment.service;

import com.paccy.stripe_payment.dao.ProductDAO;
import com.paccy.stripe_payment.dto.RequestDto;
import com.paccy.stripe_payment.utils.CustomerUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${stripe.secretKey}")
    String stripeApiKey;



    @Value("${client.baseUrl}")
    String clientBaseUrl;

    public  String hostedCheckout(RequestDto requestDto) throws StripeException {

        // Start by finding an existing customer record from Stripe or creating a new one if needed
        Customer customer = CustomerUtil.findOrCreateCustomer(requestDto.getCustomerEmail(), requestDto.getCustomerName());

        // Next, create a checkout session by adding the details of the checkout
        SessionCreateParams.Builder paramsBuilder=
                SessionCreateParams
                        .builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setCustomer(customer.getId())
                        .setSuccessUrl(clientBaseUrl + "/success?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl(clientBaseUrl + "/failure");

        for (Product product: requestDto.getItems()){
            paramsBuilder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData
                                            .builder()
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData
                                                            .ProductData
                                                            .builder()
                                                            .putMetadata("app_id",product.getId())
                                                            .setName(product.getName())
                                                            .build()
                                            )
                                            .setCurrency(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getCurrency())
                                            .setUnitAmountDecimal(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getUnitAmountDecimal())
                                            .build()
                            )
                            .build());
        }
        Session session= Session.create(paramsBuilder.build());

        return session.getUrl();
    }

    public String integratedCheckout(RequestDto requestDto) throws StripeException {


        Customer customer= CustomerUtil.findOrCreateCustomer(requestDto.getCustomerEmail(), requestDto.getCustomerName());

        // Create a PaymentIntent and send it's client secret to the client
        PaymentIntentCreateParams  params= PaymentIntentCreateParams
                .builder()
                .setAmount(Long.parseLong(this.calculateOrderAmount(requestDto.getItems())))
                .setCurrency("usd")
                .setCustomer(customer.getId())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build()
                )
                .build();
        PaymentIntent paymentIntent= PaymentIntent.create(params);
        return  paymentIntent.getClientSecret();
    }

    String calculateOrderAmount(Product[] items){

        long total=0L;
        for (Product item:items){
            // Look up the application database to find the prices for the products in the given list
            total +=ProductDAO.getProduct(item.getId()).getDefaultPriceObject().getUnitAmountDecimal().floatValue();

        }
        return String.valueOf(total);
    }
}
