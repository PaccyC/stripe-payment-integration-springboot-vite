

import {Button, Center, Heading, Input, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import CartItem, {type ItemData} from "../components/CartItem.tsx";
import TotalFooter from "../components/TotalFooter.tsx";
import {Products} from '../data.ts'
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe, Stripe} from '@stripe/stripe-js';

const IntegratedCheckout = () => {
  const [items]= useState<ItemData[]>(Products);
  const[transactionClientSecret,setTransactionClientSecret]=useState("");
  const [stripePromise,setStripePromise]= useState<Promise<Stripe | null> | null>(null);
  const[name,setName]= useState("")
  const [email,setEmail]= useState("")
  return (
    <>

        <div className="flex items-center justify-center min-h-screen text-black">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md px-4">
        <h1 className="text-2xl font-bold">Integrated Checkout Example</h1>

        {items.map((elem, idx) => (
          <CartItem key={idx} data={elem} mode="checkout" />
        ))}

        <TotalFooter total={30} mode="checkout" />

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={onCustomerNameChange}
          className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="email"
          placeholder="Customer Email"
          value={email}
          onChange={onCustomerEmailChange}
          className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={createTransactionSecret}
          className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Initiate Payment
        </button>

        {transactionClientSecret !== "" && (
          <Elements stripe={stripePromise} options={{ clientSecret: transactionClientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div> 
        </>
  )
}

export default IntegratedCheckout
