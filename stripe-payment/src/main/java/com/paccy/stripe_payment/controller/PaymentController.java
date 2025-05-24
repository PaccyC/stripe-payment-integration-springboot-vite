package com.paccy.stripe_payment.controller;


import com.paccy.stripe_payment.dto.RequestDto;
import com.paccy.stripe_payment.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/checkout/hosted")
    @CrossOrigin(origins = "http://localhost:5173")
    public String checkoutSession(@RequestBody RequestDto requestDto) throws StripeException {

        return paymentService.hostedCheckout(requestDto);


    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/checkout/integrated")
    public String integratedCheckout(@RequestBody RequestDto requestDto) throws StripeException {

        return paymentService.integratedCheckout(requestDto);


    }

}
