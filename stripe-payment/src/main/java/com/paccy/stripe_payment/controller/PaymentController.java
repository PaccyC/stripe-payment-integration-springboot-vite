package com.paccy.stripe_payment.controller;


import com.paccy.stripe_payment.dto.RequestDto;
import com.paccy.stripe_payment.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/checkout/hosted")
    public String checkoutSession(@RequestBody RequestDto requestDto) throws StripeException {

        return paymentService.hostedCheckout(requestDto);


    }

}
