import React, { useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { PaystackButton } from "react-paystack";
import { Button } from "../ui/button";
// import { checkoutOrder } from "@/lib/actions/order.actions";
import { IEvent } from "@/types";

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLISHABLE_KEY as string;
  const amount = Number(event.event.price) * 100;
  const email = event.organizer.email;
  const currency = "NGN";

  console.log({ email, amount, currency, publicKey });
  const componentProps = {
    email: email,
    amount: amount,
    currency: currency,
    metadata: {
      custom_fields: [
        {
          display_name: "Event",
          variable_name: "event",
          value: event.event.title,
        },
        {
          display_name: "User ID",
          variable_name: "userId",
          value: userId,
        },
      ],
    },
    publicKey: publicKey,
    text: "Pay with Paystack",
    onSuccess: () => {
      console.log("Payment successful");
    },
    onClose: () => {
      console.log("Payment closed");
    },
  };

  // const onCheckout = async () => {
  //   const order = {
  //     eventTitle: event.event.title,
  //     eventId: event._id,
  //     price: event.event.price,
  //     isFree: event.event.isFree,
  //     buyerId: userId,
  //   };

  // await checkoutOrder(order);
  // };

  return (
    <div className="bg-primary-50">
      <PaystackButton
        {...componentProps}
        className="bg-primary p-4 rounded-md text-white"
      />
    </div>
  );
};

export default Checkout;
