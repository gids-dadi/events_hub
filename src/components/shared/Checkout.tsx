import { PaystackButton } from "react-paystack";
import { IEvent } from "@/types";
import { checkoutOrder } from "@/api/order";

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLISHABLE_KEY as string;
  // const amount = Number(event.event.price) * 100;
  const amount = event.event.isFree ? 0 : Number(event.event.price) * 100;
  const email = event.organizer.email;
  const currency = "NGN";

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: publicKey,
  };

  // you can call this function anything
  const handlePaystackSuccessAction = async (reference: any) => {
    console.log(reference);
    // const onCheckout = async () => {
    const order = {
      eventTitle: event.event.title,
      eventId: event._id,
      price: event.event.price,
      isFree: event.event.isFree,
      buyerId: userId,
    };

    await checkoutOrder({ reference, order });
    // };
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Make Payment",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

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
