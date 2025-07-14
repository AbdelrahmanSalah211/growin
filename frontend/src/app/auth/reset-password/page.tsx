"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/inputs/PasswordInput";
import { FormState } from "@/types/FormState";
import { Button } from "@/components/ui/buttons/button";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import {
  validatePassword,
  validateConfirmPassword,
  ValidationResult,
} from "@/utils/validate";

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
  };

  useEffect(() => {
    if (!token) {
      router.replace("/404");
      return;
    } else {
      setIsValidToken(true);
    }
  }, [token, router]);

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
      <div className="flex justify-center items-center h-screen w-full bg-surface p-[5rem]">
        <p className="flex justify-center items-center text-primary-text">
          <span className="loading loading-6xl loading-ring"></span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Left Section */}
      <section className="hidden lg:flex relative flex-1 justify-center items-center px-[5.71875rem] py-[5.8125rem]">
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

      {/* Form Section */}
      <section className="flex-1 flex flex-col justify-center items-center sm:px-[5.71875rem] sm:py-[5.8125rem] px-6 py-6">
        <div className="sm:scale-[1] w-full space-y-[2.5rem]">
          <h1 className="text-[2rem] sm:text-[3rem]/[3rem] font-black text-primary-text">
            Reset Password
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-[2.07275rem]">
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
                  title="Confirm Password"
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
            </div>

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
          </form>
        </div>
      </section>
    </div>
  );
}
