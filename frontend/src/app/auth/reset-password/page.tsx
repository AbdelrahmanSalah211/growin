"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/inputs/PasswordInput";
import { FormState } from "@/types/FormState";
import { Button } from "@/components/ui/buttons/Button";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import {
  validatePassword,
  validateConfirmPassword,
  ValidationResult,
} from "@/utils/validate";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";

export default function ResetPassword() {
  const [formState, setFormState] = useState<FormState>({
    password: { value: "", isValid: false, errors: [] },
    confirmPassword: { value: "", isValid: false, errors: [] },
  });

  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const validationMethods = {
    password: validatePassword,
    confirmPassword: (v: string): ValidationResult =>
      validateConfirmPassword(formState.password.value, v),
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      const field = prevState[name];
      if (!field) return prevState;
      const validation = validationMethods[
        name as keyof typeof validationMethods
      ]
        ? validationMethods[name as keyof typeof validationMethods](value)
        : { isValid: true, messages: [] };
      return {
        ...prevState,
        [name]: {
          ...field,
          value,
          isValid: validation.isValid,
          errors: validation.messages,
        },
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.password.isValid || !formState.confirmPassword.isValid)
      return;

    // TODO: Reset logic (API call)
  };

  useEffect(() => {
    if (!token) {
      router.replace("/404");
    } else {
      // TODO: Optionally validate token via API
      setIsValidToken(true);
    }
  }, [token, router]);

  const hasErrors = Object.values(formState).some(
    (field) => field.errors.length > 0
  );
  const errorEntries = Object.fromEntries(
    Object.entries(formState)
      .filter(([_, field]) => field.errors.length > 0)
      .map(([key, field]) => [key, field.errors])
  );

  if (isValidToken === false) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-surface p-[5rem]">
        <p className="text-xl text-primary-text">
          Invalid or expired reset token.
        </p>
      </div>
    );
  }

  if (isValidToken === null) {
    return (
      <div className="bg-surface flex flex-col justify-center p-[15rem] rounded-[1.25rem]">
        <p className="flex justify-center items-center text-primary-text">
          <span className="loading loading-6xl loading-ring"></span>
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-start transition-all duration-500 ${
        hasErrors ? "gap-[0.625rem]" : "gap-0"
      }`}
    >
      {/* Error Panel */}
      <AnimatedErrorList errors={errorEntries} visible={hasErrors} />

      {/* Form Section */}
      <section className="bg-surface flex flex-col justify-center p-[3.125rem] space-y-[1.5625rem] rounded-[1.25rem] transition-all duration-500">
        <h1 className="text-3xl font-bold text-primary-text">Reset Password</h1>
        <form className="space-y-[1.5625rem]" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <PasswordInput
              id="password"
              name="password"
              value={formState.password.value}
              onChange={handleChange}
              placeholder="Enter new password"
              inputProps={{ required: true }}
            />
            <p className="block space-y-1 lg:hidden text-base text-primary-text">
              {formState.password.errors.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </p>
          </div>

          <div className="space-y-1">
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={formState.confirmPassword.value}
              onChange={handleChange}
              placeholder="Confirm new password"
              inputProps={{ required: true }}
            />
            <p className="block space-y-1 lg:hidden text-base text-primary-text">
              {formState.confirmPassword.errors.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            <Button
              type="submit"
              buttonProps={{
                disabled:
                  !formState.password.isValid ||
                  !formState.confirmPassword.isValid,
              }}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
