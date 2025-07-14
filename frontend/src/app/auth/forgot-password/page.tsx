"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import EmailInput from "@/components/ui/inputs/EmailInput";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import { validateEmail } from "@/utils/validate";
import { forgetPassword } from "@/services/userService";

type FormField = {
  value: string;
  validationMethod?: (value: string) => {
    isValid: boolean;
    messages: string[];
  };
  isValid: boolean;
  errors: string[];
};

type FormState = {
  email: FormField;
};

export default function ForgotPassword() {
  const [formState, setFormState] = useState<FormState>({
    email: {
      value: "",
      validationMethod: validateEmail,
      isValid: false,
      errors: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prev) => {
      const field = prev[name as keyof typeof prev];
      if (!field) return prev;

      const validation = field.validationMethod
        ? field.validationMethod(value)
        : { isValid: true, messages: [] };

      return {
        ...prev,
        [name]: {
          ...field,
          value,
          isValid: validation.isValid,
          errors: validation.messages,
        },
      };
    });
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsSubmitting(false);
      return;
    }
    const timerId = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [secondsLeft]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formState.email.isValid || isSubmitting) return;

    setIsSubmitting(true);
    setSecondsLeft(60);

    try {
      const data = await forgetPassword(formState.email.value);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <section className="hidden lg:flex flex-1 justify-center relative items-center px-[5.71875rem] py-[5.8125rem]">
        <div className="absolute top-1/5 left-1/2 -translate-y-1/5 -translate-x-1/2">
          <AnimatedErrorList
            errors={Object.fromEntries(
              Object.entries(formState)
                .filter(([_, field]) => field.errors.length > 0)
                .map(([key, field]) => [key, field.errors])
            )}
          />
        </div>
      </section>

      <section className="sm:scale-[1] flex-1 flex flex-col justify-center items-center sm:px-[5.71875rem] sm:py-[3.8rem] px-6 py-6">
        <div className="max-w-sm lg:w-full space-y-[2.5rem]">
          <div className="space-y-[0.625rem]">
            <h1 className="text-[2rem] sm:text-[3rem]/[3rem] font-black text-primary-text">
              Forgot Password
            </h1>
            <p className="text-[1.125rem] text-primary-text">
              Don&apos;t worry, we will send you a link to reset your password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-[2.07275rem]">
              <EmailInput
                id="email"
                name="email"
                value={formState.email.value}
                onChange={handleChange}
                placeholder="example@example.com"
                inputProps={{ required: true }}
              />
              <p className="block space-y-1 lg:hidden text-base text-primary-text">
                {formState.email.errors.map((error) => (
                  <span key={error}>{error}</span>
                ))}
              </p>
            </div>

            <Button
              type="submit"
              buttonProps={{
                disabled: !formState.email.isValid || isSubmitting,
              }}
            >
              {isSubmitting ? "Resend" : "Send"}
            </Button>

            {isSubmitting && (
              <p className="text-center text-sm text-secondary-text">
                in {secondsLeft} second{secondsLeft !== 1 ? "s" : ""}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
