"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import EmailInput from "@/components/ui/inputs/EmailInput";
import PasswordInput from "@/components/ui/inputs/PasswordInput";
import TextInput from "@/components/ui/inputs/TextInput";
import Link from "next/link";
import { FormState } from "@/types/FormState";
import { Button } from "@/components/ui/buttons/button";
import { GoogleColorIcon } from "@/components/icons/GoogleColorIcon";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  ValidationResult,
} from "@/utils/validate";
import { signup, googleLogin } from "@/services/authService";
import { setToken, setUser } from "@/lib/auth-actions";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    username: { value: "", isValid: false, errors: [] },
    email: { value: "", isValid: false, errors: [] },
    password: { value: "", isValid: false, errors: [] },
    confirmPassword: { value: "", isValid: false, errors: [] },
  });

  const validationMethods = {
    username: validateUsername,
    email: validateEmail,
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

  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [submitText, setSubmitText] = useState<string>("Sign Up");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formState.username.isValid ||
      !formState.email.isValid ||
      !formState.password.isValid ||
      !formState.confirmPassword.isValid
    )
      return;

    setLoading(true);
    const payload = {
      username: formState.username.value,
      email: formState.email.value,
      password: formState.password.value,
    };
    try {
      const data = await signup(payload);
      setSubmitText(data.message);
      setTimeout(() => {
        router.push("/auth/login");
      },1500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await googleLogin();
      setToken(data.accessToken);
      setUser(JSON.stringify(data.user));
      setAuth(data.accessToken, data.user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const canProceedToNext =
    formState.username.isValid && formState.email.isValid;
  const canSubmit =
    formState.password.isValid && formState.confirmPassword.isValid;

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

      <section className="sm:scale-[1] flex-1 flex flex-col justify-center items-center sm:px-[5.71875rem] sm:py-[3.8rem] px-6 py-6 overflow-hidden">
        <div className="max-w-sm lg:w-full space-y-[2.5rem]">
          <h1 className="text-[2rem] sm:text-[3rem] font-black text-primary-text">
            Sign Up
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative overflow-hidden">
              <div
                className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
                  step === 1 ? "translate-x-0" : "-translate-x-1/2"
                }`}
              >
                {/* Step 1 */}
                <div className="w-1/2 flex-shrink-0 space-y-[2.07275rem]">
                  <div className="space-y-1">
                    <TextInput
                      id="username"
                      name="username"
                      title="Username"
                      value={formState.username.value}
                      onChange={handleChange}
                      placeholder="Enter username"
                      inputProps={{ required: true }}
                    />
                    <p className="block space-y-1 lg:hidden text-base text-primary-text">
                      {formState.username.errors.map((error) => (
                        <span key={error}>{error}</span>
                      ))}
                    </p>
                  </div>

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
                </div>

                {/* Step 2 */}
                <div className="w-1/2 flex-shrink-0 space-y-[2.07275rem]">
                  <div className="space-y-1">
                    <PasswordInput
                      id="password"
                      name="password"
                      value={formState.password.value}
                      onChange={handleChange}
                      placeholder="Enter password"
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
                      placeholder="Confirm password"
                      inputProps={{ required: true }}
                    />
                    <p className="block space-y-1 lg:hidden text-base text-primary-text">
                      {formState.confirmPassword.errors.map((error) => (
                        <span key={error}>{error}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {step === 1 ? (
              <Button
                type="button"
                buttonProps={{ disabled: !canProceedToNext }}
                onClick={() => setStep(2)}
              >
                Next
              </Button>
            ) : (
              <div className="flex flex-col gap-3">
                <Button type="button" onClick={() => setStep(1)}>
                  Previous
                </Button>
                <Button type="submit" buttonProps={{ disabled: !canSubmit }}>
                  {loading ? (
                    <p className="flex items-center justify-center gap-[0.625rem]">
                      <span className="loading loading-infinity loading-md"></span>
                      Signing up
                    </p>
                  ) : (
                    <>{submitText}</>
                  )}
                </Button>
              </div>
            )}

            <p className="text-base text-primary-text">
              Already have an account?{" "}
              <Link href="/auth/login" className="hover:underline">
                Log in
              </Link>
            </p>

            <Button type="button" onClick={handleGoogleLogin}>
              <span className="flex items-center justify-center gap-[0.625rem]">
                <GoogleColorIcon />
                Sign up with Google
              </span>
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
