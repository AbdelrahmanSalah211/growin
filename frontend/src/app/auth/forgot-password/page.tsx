"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import EmailInput from "@/components/ui/inputs/EmailInput";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import { validateEmail } from "@/utils/validate";
import { forgetPassword } from "@/services/userService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";

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
    } catch (error) {
      console.log(error);
    }
  };

  const hasErrors = Object.values(formState).some(
    (field) => field.errors.length > 0
  );
  const errorEntries = Object.fromEntries(
    Object.entries(formState)
      .filter(([_, field]) => field.errors.length > 0)
      .map(([key, field]) => [key, field.errors])
  );

  return (
    <div
      className={`flex w-full items-start transition-all duration-500 ${
        hasErrors ? "gap-[0.625rem]" : "gap-0"
      }`}
    >
      {/* Form Section */}
      <section className="bg-surface flex flex-col justify-center p-[3.125rem] space-y-[1.5625rem] rounded-[1.25rem] transition-all duration-500">
        <div className="space-y-[0.625rem]">
          <h1 className="text-3xl font-bold text-primary-text">
            Forgot Password
          </h1>
          <p className="text-base text-primary-text">
            Don&apos;t worry, we will send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-[1.5625rem]" onSubmit={handleSubmit}>
          <div className="space-y-1">
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

          <div className="flex flex-col gap-[0.625rem]">
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
          </div>
        </form>
      </section>

      {/* Error panel */}
      <AnimatedErrorList errors={errorEntries} visible={hasErrors} />
    </div>
  );
}
