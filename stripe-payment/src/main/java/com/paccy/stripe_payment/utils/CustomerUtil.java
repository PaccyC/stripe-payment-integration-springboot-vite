package com.paccy.stripe_payment.utils;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;

public class CustomerUtil {

    public static Customer findCustomerByEmail(String email) throws StripeException {
        CustomerSearchParams params=
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'"+ email + "'")
                        .build();
        CustomerSearchResult result=Customer.search(params);
        return  !result.getData().isEmpty() ? result.getData().get(0) :null ;
    }

    public static Customer findOrCreateCustomer(String email,String name) throws StripeException{
        CustomerSearchParams params=
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'"+ email + "'")
                        .build();
        CustomerSearchResult result=Customer.search(params);
        Customer customer;
        if (result.getData().isEmpty()){
            CustomerCreateParams customerCreateParams=CustomerCreateParams
                    .builder()
                    .setName(name)
                    .setEmail(email)
                    .build();
            customer=Customer.create(customerCreateParams);

        }
        else {
            customer= result.getData().get(0);
        }
        return customer;
    }
}
