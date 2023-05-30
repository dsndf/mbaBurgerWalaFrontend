import React, { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";

const StripeCompo = ({ stripeApiKey }) => { 
  const stripePromise = loadStripe(stripeApiKey);
 console.log(stripeApiKey[0]);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </div>
  );
};

export default StripeCompo;
