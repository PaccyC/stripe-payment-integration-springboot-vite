import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

const CheckoutForm = () => {
    const stripe=useStripe();
    const elements=useElements();
    const handleSubmit= async(event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        if(!stripe || !elements) return;

        const result = await stripe?.confirmPayment({
            elements,
            confirmParams:{
                return_url: process.env.VITE_CLIENT_BASE_URL + "/success"
            }
        })
        if(result.error){
            console.log(result.error.message);
            
        }
    }
  return (
     <div className="flex flex-col space-y-4">
      <PaymentElement />
      <button
        onClick={handleSubmit}
        disabled={!stripe}
        className={`px-4 py-2 rounded-md text-white font-semibold ${
          stripe ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'
        }`}
      >
        Pay
      </button>
    </div>
  )
}

export default CheckoutForm
