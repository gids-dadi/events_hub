import { event_hub_axios_server } from ".";

type createEventResponse = {};

export async function createEvent(data: {
  organizer: string;
  event: {
    title: string;
    description: string;
    location?: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    category?: string;
  };
}) {
  const res = await event_hub_axios_server.post<any>("/events", data);
  return res.data;
}

export async function updateEvent(data: {
  organizer: string;
  event: {
    _id: string;
    title: string;
    description: string;
    location?: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    category?: string;
  };
}) {
  const res = await event_hub_axios_server.patch<any>("/events", data);
  return res.data;
}

export async function getEventById(eventId: string) {
  const res = await event_hub_axios_server.get<any>(`/events/${eventId}`);
  return res.data;
}

export async function getAllEvents(params: {
  query?: string;
  category?: string;
  page: number;
  limit: number;
}) {
  const res = await event_hub_axios_server.get<any>("/events", { params });
  return res.data;
}

export async function getAllEventsBySameOrganizer(params: {
  userId: string;
  page: number;
  limit: number;
}) {
  const res = await event_hub_axios_server.get<any>("/events", { params });
  return res.data;
}

export async function getAllEventsInSameCategory(params: {
  userId: string;
  page: number;
  limit: number;
}) {
  const res = await event_hub_axios_server.get<any>("/events", { params });
  return res.data;
}

export async function deleteEventById(eventId: string) {
  const res = await event_hub_axios_server.delete<any>(`/events/${eventId}`);
  return res.data;
}
