"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { registerUser } from "@/api/user";

// import { FullPageSpinner } from "../spinner/spinners";
// import { Checkbox } from "../ui/checkbox";

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const { data: settings, isPending } = useQuery({
  //   queryKey: ["settings"],
  //   queryFn: getSettings,
  // });

  // const passwordPolicy = settings?.data.passwordPolicy!;

  // function validatePassword(value: string) {
  //   return (
  //     (!passwordPolicy.length || value.length >= length) &&
  //     (!passwordPolicy.mustHaveUpper || /[A-Z]/.test(value)) &&
  //     (!passwordPolicy.mustHaveLower || /[a-z]/.test(value)) &&
  //     (!passwordPolicy.mustHaveNumber || /[0-9]/.test(value)) &&
  //     (!passwordPolicy.mustHaveSpecial || /[!@#$%^&*(),.?":{}|<>]/.test(value))
  //   );
  // }

  const registrationFormSchema = z.object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    email: z.string().email(),
    photo: z.string().default("https://placehold.co/100x100"),
    password: z.string().min(1, {
      message: "Password field  cannot be empty",
    }),
    // password: z.string().refine(validatePassword, {
    //   message: `Password must be at least ${passwordPolicy?.length} characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character`,
    // }),
    terms: z
      .boolean({
        required_error: "You must agree to the terms and conditions",
      })
      .default(false),
  });

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      photo: "https://placehold.co/100x100",
      password: "",
      terms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response.data.message);
    },
  });

  function onSubmit(values: z.infer<typeof registrationFormSchema>) {
    mutation.mutate(values);
  }

  // if (isPending) return <FullPageSpinner />;

  return (
    <div className="w-3/4 mx-auto relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" relative mt-8 space-y-4"
        >
          {/* Full name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    {...field}
                    className="h-12 bg-[#f0eff0]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    className="h-12 bg-[#f0eff0]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    typeof="password"
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

          {/* Photo */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your Email Address"
                    {...field}
                    className="h-12 bg-[#f0eff0]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="absolute top-32 right-6">
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

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    I agree to the{" "}
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3376f2]"
                    >
                      Terms of Use
                    </a>{" "}
                  </FormLabel>
                </FormItem>
              );
            }}
          />

          <Button
            className="w-full bg-[#3376f2]"
            size="lg"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-primary ease-linear" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-8 flex items-center justify-center md:hidden ">
        <p className="text-xs font-medium text-[#3376f2] md:text-sm">
          Already have an Account?{" "}
          <Link href="/register" className="">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
