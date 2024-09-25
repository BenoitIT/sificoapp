"use client";

import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { ErrorProps, LoginProps } from "@/interfaces/authForm";
import { useState } from "react";
import { Label } from "../ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { InputError } from "../input-error";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [errors, setErrors] = useState<ErrorProps>({});
  const [payload, setPayload] = useState<LoginProps>({});
  const [loading, setLoading] = useState<boolean>(false);
  const ErrorLogger = (errorKey: string, errorMessage: string | null) => {
    setErrors((prevState: LoginProps) => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPayload((prevState: LoginProps) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    ErrorLogger(e.target.name, null);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    if (email.value == "") {
      ErrorLogger("email", "Email address is required.");
    } else if (password.value == "") {
      ErrorLogger("password", "Password is required.");
    } else {
      try {
        setLoading(true);
        const isLoggedIn = await signIn("credentials", {
          email: payload.email,
          password: payload.password,
          redirect: false,
        });
        if (isLoggedIn?.status == 401) {
          toast.error("Invalid email and password!");
          setLoading(false);
        } else if (isLoggedIn?.ok) {
          toast.success("Welcome back.");
          setLoading(false);
          form.reset();
        } else {
          toast.error("Check internet connection!");
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        return toast.error("Check internet connection!");
      }
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Back"
      backButtonHref="/"
      showSocial={false}
      showFooter={false}
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              className={
                errors["email"]
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
              onChange={handleChange}
            />
            <InputError errors={errors} fieldName="email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              className={
                errors["password"]
                  ? "text-xs text-red-500 border-red-500"
                  : "placeholder:text-gray-400"
              }
              onChange={handleChange}
            />
            <InputError errors={errors} fieldName="password" />
          </div>
        </div>
        <Button size={"sm"} variant={"link"} className="px-0 font-normal">
          <Link href="/auth/reset" className="text-xs">
            Forgot Password?
          </Link>
        </Button>
        <FormError message="" />
        <FormSuccess message="" />
        <Button
          type="submit"
          variant={"default"}
          className="w-full"
          disabled={loading}
        >
          Login
        </Button>
      </form>
    </CardWrapper>
  );
};
