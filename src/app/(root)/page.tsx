"use client";

import { getAllEvents } from "@/api/events";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import CategoryFilter from "@/components/shared/CategoryFilter";
// import Search from "@/components/shared/Search";

// { searchParams }: SearchParamProps

// export default function Home() {

export default async function Home({ searchParams }: SearchParamProps) {
  // const searchParams = useSearchParams();

  const page = Number(searchParams.page) || 1;
  const searchText = (searchParams.query as string) || ""; // Pass the correct values
  const category = (searchParams.category as string) || ""; // Pass the correct values

  // const page = Number(searchParams.get("page")) || 1;
  // const searchText = searchParams.get("query") || "";
  // const category = searchParams.get("category") || "";

  const allEventsQuery = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  // const allEventsQuery = useQuery({
  //   queryKey: ["events", { query: searchText, category, page }],
  //   queryFn: () => getAllEvents({ query: "", category: "", page, limit: 6 }),
  // });

  // const allEventsQuery = useQuery({
  //   queryKey: ["events", { query: searchText, category, page }],
  //   queryFn: () =>
  //     getAllEvents({ query: searchText, category, page, limit: 6 }), // Pass the correct values
  // });

  console.log(allEventsQuery?.data?.data, "from home page");

  return (
    <div>
      <div className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
              size="lg"
              asChild
              className="button w-full sm:w-fit bg-[#347bf3]"
            >
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="Hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </div>

      <div id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* <Search />
          <CategoryFilter /> */}
        </div>

        <Collection
          data={allEventsQuery?.data?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={allEventsQuery?.data?.totalPages}
        />
      </div>
    </div>
  );
}
