"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "../../AuthProvider";
import { toast } from "sonner";
import { loginUser } from "@/api/authservice";

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Email  is required" }),
  password: z.string().min(1, {
    message: "Password field  cannot be empty",
  }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data.email, data.password),
    onSuccess: (data) => {
      setUser(data.foundUser);
      setToken(data.accessToken);
      router.push("/");
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="w-3/4 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your Email "
                    {...field}
                    className="h-12 bg-[#f0eff0]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" relative flex flex-col gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="h-12 bg-[#f0eff0]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="absolute right-4 bottom-3">
              {showPassword ? (
                <EyeOff
                  size={20}
                  className="cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  size={20}
                  className="cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          <Button
            className="w-full bg-[#3376f2]"
            size="lg"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-[#367df5] ease-linear" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="flex w-full justify-end text-sm">
          <Link
            href="/forgot-password"
            className="w-fit text-[10px] font-semibold text-[#3376f2]"
          >
            Forgot Password?
          </Link>
        </div>
      </Form>

      <div className="mt-8 flex items-center justify-center md:hidden ">
        <p className="text-xs font-medium text-[#3376f2] md:text-sm">
          Don&apos;t have an Account?{" "}
          <Link href="/register" className="">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
