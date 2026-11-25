"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

import { LockIcon, Mail, Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginInput, LoginSchema } from "@/shared/schema/auth.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/login";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await loginUser(data);

      Cookies.set("token", response.data.token, {
        expires: 7,
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
      });

      Cookies.set("roles", JSON.stringify(response.data.user.roles), {
        expires: 7,
        sameSite: "strict",
      });

      Cookies.set("user", JSON.stringify(response.data.user), {
        expires: 7,
        sameSite: "strict",
      });

      toast.success(response.message);

      router.replace("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <div className="relative">
          <Label
            htmlFor="email"
            className={`absolute -top-2.5 left-3 z-10 bg-white px-1 text-xs font-medium  ${
              errors.email ? "text-red-500" : "text-gray-500"
            }`}
          >
            Email
          </Label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`h-12 bg-gray-100 pl-10 shadow-none focus-visible:ring-0 focus-visible:border-gray-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="relative">
          <Label
            htmlFor="password"
            className={`absolute -top-2.5 left-3 z-10 bg-white px-1 text-xs font-medium ${
              errors.password ? "text-red-500" : "text-gray-500"
            }`}
          >
            Password
          </Label>

          <div className="relative">
            <LockIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className={`h-12 bg-gray-100 pl-10 pr-10 shadow-none focus-visible:ring-0 focus-visible:border-gray-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" />

          <Label
            htmlFor="remember-me"
            className="cursor-pointer text-sm font-normal text-gray-600"
          >
            Remember Me
          </Label>
        </div>

        <a
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          Forgot Password?
        </a>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full cursor-pointer rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
