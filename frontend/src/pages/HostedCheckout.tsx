import { useState } from "react";
import CartItem, {type ItemData } from "../components/CartItem.tsx";
import TotalFooter from "../components/TotalFooter.tsx";
import CustomerDetails from "../components/CustomerDetails.tsx";
import { Products } from "../data.ts";

function HostedCheckout() {
  const [items] = useState<ItemData[]>(Products);

  return (
    <div className="flex items-center justify-center min-h-screen text-black px-4">
      <div className="flex flex-col space-y-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center">Hosted Checkout Example</h1>

        {items.map((elem) => (
          <CartItem key={elem.id} data={elem} mode="checkout" />
        ))}

        <TotalFooter total={30} mode="checkout" />

        <CustomerDetails data={items} endpoint="/checkout/hosted" />
      </div>
    </div>
  );
}

export default HostedCheckout;
