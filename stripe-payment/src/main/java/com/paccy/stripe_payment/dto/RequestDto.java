package com.paccy.stripe_payment.dto;


import com.stripe.model.Product;

public class RequestDto {
    Product[] items;
    String customerName;
    String customerEmail;

    public Product[] getItems() {
        return items;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

}