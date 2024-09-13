'use client'

import { CardWrapper } from './card-wrapper'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState } from 'react'
import { ErrorProps,LoginProps } from '@/interfaces/authForm'
import { Label } from '../ui/label'
import { InputError } from '../input-error'
export const ResetForm = () => {
  const [errors, setErrors] = useState<ErrorProps>({});
  const [payload, setPayload] = useState<LoginProps>({});
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
    if (email.value == "") {
      ErrorLogger("email", "Email address is required.");
    } else {
      console.log("payload", payload);
    }
  };

  return (
    <CardWrapper
    headerLabel='Forgot Password?'
    backButtonLabel='Back to Login'
    backButtonHref='/auth/login'
    showSocial={false}
    showFooter={true}
    >
      <form onSubmit={handleSubmit}
        className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
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
            <InputError errors={errors} fieldName='email' />
          </div>
        </div>
          <FormError message="" />
          <FormSuccess message="" />
          <Button
          type="submit"
          className="w-full"
          >
            Send reset email
          </Button>
        </form>
    </CardWrapper>
  )
}
