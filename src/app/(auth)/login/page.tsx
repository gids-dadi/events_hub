import LoginForm from "@/components/shared/Form/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <div className="h-full content-center px-0 mx-auto   ">
        <h2 className="p-bold-20 text-5xl text-center">Login</h2>
        <LoginForm />
      </div>
      {/* 
      <div className="mt-8 flex items-center justify-center border-4">
        <p className="text-xs font-medium text-red-500 md:text-sm">
          Don&apos;t have an Account?{" "}
          <Link href="/register" className="">
            Sign up
          </Link>
        </p>
      </div> */}
    </div>
  );
}
