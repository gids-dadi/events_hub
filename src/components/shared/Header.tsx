"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { getUserProfile } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
  });

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between ">
        <Link href="/" className=" flex  flex-col justify-center items-center ">
          <Image
            src="/assets/images/logo.svg"
            width={80}
            height={80}
            alt="Event hub logo"
          />

          <span className="font-bold text-2xl self-baseline text-[#5b5f718e] ">
            Event hub
          </span>
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <MobileNav />

          {!user && (
            <Button asChild className="rounded-2xl bg-[#347bf3] p-4 " size="lg">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
