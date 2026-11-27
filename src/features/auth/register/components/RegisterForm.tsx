"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

import { LockIcon, Mail, Eye, EyeOff, UserRound } from "lucide-react";
import { RegisterInput, RegisterSchema } from "@/shared/schema/auth.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../api/register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await registerUser({
        content: {
          "application/json": {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password,
          },
        },
      });

      console.log(data);

      Cookies.set("token", response.data.token, {
        expires: 7,
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production"0,
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

      await queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      router.push("/");
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
            htmlFor="name"
            className={`absolute -top-2.5 left-3 z-10 bg-white px-1 text-xs font-medium  ${
              errors.name ? "text-red-500" : "text-gray-500"
            }`}
          >
            Full Name
          </Label>

          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              id="name"
              type="name"
              {...register("name")}
              placeholder="Enter your name"
              className={`h-12 bg-gray-100 pl-10 shadow-none focus-visible:ring-0 focus-visible:border-gray-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

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

      <div className="flex items-center gap-2">
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember-me"
                checked={field.value}
                onCheckedChange={field.onChange}
              />

              <Label
                htmlFor="remember-me"
                className="cursor-pointer text-sm font-normal text-gray-600"
              >
                Remember Me
              </Label>
            </div>
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full cursor-pointer rounded-xl bg-blue-600 text-white hover:bg-blue-700"
      >
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
}
