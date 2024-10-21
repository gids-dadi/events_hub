"use client";
import { getEventById } from "@/api/events";
import { getUserProfile } from "@/api/user";
import CreateEventForm from "@/components/shared/Form/EventForm";
import { UpdateEventParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

export default function UpdateEventPage({ params: { id } }: UpdateEventProps) {
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const userId = profileQuery?.data?._id as string;

  const eventQuery = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  const event = eventQuery?.data?.data;
  console.log(event?._id, "from update event page");

  return (
    <>
      <div className="bg-primary-500 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h2 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h2>
      </div>
      <div className="wrapper my-8 ">
        <CreateEventForm
          type="Update"
          event={event}
          eventId={event?._id!}
          userId={userId}
        />
      </div>
    </>
  );
}
