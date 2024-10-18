"use client";
import { getUserProfile } from "@/api/user";
import CreateEventForm from "@/components/shared/Form/EventForm";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const CreateEventPage = () => {
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  const userId = profileQuery?.data?._id as string;

  return (
    <>
      <div className="bg-gray-300 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h2 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h2>
      </div>
      <div className="wrapper my-8 ">
        <CreateEventForm type="Create" userId={userId} />
      </div>
    </>
  );
};

export default CreateEventPage;
