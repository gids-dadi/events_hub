"use client";
import { getUserProfile } from "@/api/user";
import { IEvent } from "@/types";
import React from "react";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

export default function CheckoutButton({ event }: { event: IEvent }) {
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const userId = profile?.data?._id as string;

  const hasEventFinished = new Date(event.event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* Check if the event is finished, we can not buy a finished event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-500 text-lg  ">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {!profile.data ? (
            <Link
              href="/login"
              className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500 hover:bg-opacity-10 bg-primary-500 p-2 "
            >
              Get Tickets
            </Link>
          ) : (
            <Checkout event={event} userId={userId} />
          )}
        </>
      )}
    </div>
  );
}
