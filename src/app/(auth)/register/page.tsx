"use client";
import RegistrationForm from "@/components/shared/Form/RegisterForm";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function RegistrationPage() {
  // const searchParams = useSearchParams();
  // const eventName = searchParams.get("eventName");

  return (
    <div>
      <div className="h-full content-center px-0 mx-auto   ">
        <h2 className="p-bold-20 text-5xl text-center">Register</h2>
        <RegistrationForm />
      </div>
    </div>
  );
}
