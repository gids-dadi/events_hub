import { event_hub_axios_server } from ".";

type PaymentRes = {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
  redirecturl: string;
};

export async function checkoutOrder(data: {
  reference: PaymentRes;
  order: {
    eventTitle: string;
    eventId: string;
    price: string;
    buyerId: string;
  };
}) {
  const res = await event_hub_axios_server.post<any>("/orders", data);
  return res.data;
}

export async function getOrdersByUser(params: {
  userId: string;
  page: number;
}) {
  const res = await event_hub_axios_server.get<any>("/orders", { params });
  return res.data;
}

export async function getOrdersByEvent(params: {
  eventId: string;
  searchString: string;
}) {
  const res = await event_hub_axios_server.get<any>("/orders", { params });
  return res.data;
}
