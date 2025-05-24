import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToIntegratedCheckout = () => {
    navigate("/integrated-checkout");
  };

  const navigateToHostedCheckout = () => {
    navigate("/hosted-checkout");
  };

  const navigateToNewSubscription = () => {
    navigate("/new-subscription");
  };

  const navigateToCancelSubscription = () => {
    navigate("/cancel-subscription");
  };

  const navigateToSubscriptionWithTrial = () => {
    navigate("/subscription-with-trial");
  };

  const navigateToViewInvoices = () => {
    navigate("/view-invoices");
  };

  return (
    <section className="text-black py-10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">Stripe Payments With React & Java</h1>

        <button
          onClick={navigateToIntegratedCheckout}
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
        >
          Integrated Checkout
        </button>

        <button
          onClick={navigateToHostedCheckout}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
        >
          Hosted Checkout
        </button>

        <button
          onClick={navigateToNewSubscription}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded cursor-pointer"
        >
          New Subscription
        </button>

        <button
          onClick={navigateToCancelSubscription}
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
        >
          Cancel Subscription
        </button>

        <button
          onClick={navigateToSubscriptionWithTrial}
          className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded cursor-pointer"
        >
          Subscription With Trial
        </button>

        <button
          onClick={navigateToViewInvoices}
          className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
        >
          View Invoices
        </button>
      </div>
    </section>
  );
};

export default Home;
