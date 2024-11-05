"use client";
import { getAllEventsBySameOrganizer } from "@/api/events";
import { getOrdersByUser } from "@/api/order";
import { getUserProfile } from "@/api/user";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { IOrder, SearchParamProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { use } from "react";

const ProfilePage = ({ searchParams }: SearchParamProps) => {
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });
  const userId = profile?.data?._id as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orderedEventsQuery = useQuery({
    queryKey: ["ordersByUser", userId, ordersPage],
    queryFn: () => getOrdersByUser({ userId, page: ordersPage }),
    enabled: Boolean(userId),
  });

  const orderedEvents = orderedEventsQuery?.data?.data;

  // console.log(orderedEvents, "ordered events from the profile page");

  const organizedEventsQuery = useQuery({
    queryKey: ["eventsBySameUser", userId, eventsPage],
    queryFn: () =>
      getAllEventsBySameOrganizer({
        organizerId: userId,
        page: eventsPage,
        limit: 5,
      }),
    enabled: !!userId, // Only run if userId is defined
  });

  const organizedEvents = organizedEventsQuery?.data?.data || [];

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        {/* <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orderedEvents?.totalPages}
        /> */}
        {orderedEvents?.map((order: any) => (
          <div key={order._id} className="order-card">
            <h2>Order Reference: {order.ref}</h2>
            <p>Amount: ${order.amount}</p>
            <p>Status: {order.status}</p>

            <div className="event-details">
              <h3>Event: {order.event.event.title}</h3>
              <p>Description: {order.event.event.description}</p>
              <p>Location: {order.event.event.location}</p>
              <img
                src={order.event.event.imageUrl}
                alt={order.event.event.title}
                width="200"
              />
              <p>
                Start Date:{" "}
                {new Date(order.event.event.startDateTime).toLocaleString()}
              </p>
              <p>
                End Date:{" "}
                {new Date(order.event.event.endDateTime).toLocaleString()}
              </p>
              <p>Price: ${order.event.event.price}</p>
              <p>Category ID: {order.event.event.category}</p>
              <a
                href={order.event.event.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Event Link
              </a>
            </div>

            <p>Buyer ID: {order.buyer}</p>
            <p>
              Order Created At: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.data?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
