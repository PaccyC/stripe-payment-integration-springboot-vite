import { useState } from "react";
import type { ItemData} from "./CartItem.tsx";

interface CustomerDetailsProp {
  data: ItemData[];
  endpoint: string;
}

function CustomerDetails(props: CustomerDetailsProp) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onCustomerNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const initiatePayment = () => {
    fetch(import.meta.env.VITE_SERVER_BASE_URL + props.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: props.data.map((elem) => ({ name: elem.name, id: elem.id })),
        customerName: name,
        customerEmail: email,
      }),
    })
      .then((r) => r.text())
      .then((r) => {
        window.location.href = r;
      });
  };

  return (
    <div className="flex flex-col space-y-3 w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={onCustomerNameChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={email}
        onChange={onCustomerEmailChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={initiatePayment}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Checkout
      </button>
    </div>
  );
}

export default CustomerDetails;
