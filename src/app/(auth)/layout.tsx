"use client";
import { usePathname } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex w-full h-screen  bg-[#dcdddc] items-center justify-center">
      <div className="h-full w-full flex justify-center flex-row-reverse p-0 md:py-20 md:px-52  rounded-md">
        <div className="w-full  md:w-1/2 flex flex-col justify-center md:px-0 bg-[#fffefe]">
          {children}
        </div>
        <div className="bg-[#3376f2] w-1/2 align-middle  content-center text-center text-white justify-center items-center hidden md:flex">
          <div className="flex flex-col items-center gap-2 text-center  ">
            <h2 className="h3-bold pb-5 text-center text-wrap">
              Your event to the world!
            </h2>
            <p className="p-regular-18 w-2/3">
              We are a platform that allows you to publish your event to the
              world and reach a wider audience. If you haven't already, sign up
              now and start publishing your events.
            </p>

            <div className="bg-[#2465ec] self-center w-fit py-6 px-10 rounded-full mt-8 text-white flex gap-2 decoration-none">
              <p className="text-lg">
                {pathname === "/login"
                  ? "Don't have an Account?"
                  : "Already have an Account?"}
              </p>
              <p className="text-lg">
                {pathname === "/login" ? (
                  <a href="/register" className="hover:opacity-20">
                    Sign up
                  </a>
                ) : (
                  <a href="/login" className="hover:opacity-20">
                    Login
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
