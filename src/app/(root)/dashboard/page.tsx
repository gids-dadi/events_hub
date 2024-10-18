"use client";

import { getUserProfile } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const profileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  console.log(profileQuery.data);

  // Redirect to login if the query encounters an error
  useEffect(() => {
    if (profileQuery.error) {
      // Redirect to the login page if an error occurs
      router.push("/login");
    }
  }, [profileQuery.error, router]); // Dependency on error and router

  if (profileQuery.isLoading) return <div>Loading...</div>;
  if (profileQuery.error)
    return <div>An error occurred: {profileQuery.error.message}</div>;

  return (
    <div className="text-bold text-xl text-black">
      <h1>User Dashboard </h1>
      <div className="text-black">{profileQuery.data?.fullName}</div>
    </div>
  );
}
