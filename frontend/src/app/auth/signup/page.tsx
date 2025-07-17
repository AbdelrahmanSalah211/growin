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
  const [loading, setLoading] = useState(false);
  const [submitText, setSubmitText] = useState("Sign Up");
  const router = useRouter();
  const { setAuth } = useAuthStore();

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
    setFormState((prev) => {
      const field = prev[name];
      if (!field) return prev;
      const validation = validationMethods[
        name as keyof typeof validationMethods
      ]
        ? validationMethods[name as keyof typeof validationMethods](value)
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
    try {
      const data = await signup({
        username: formState.username.value,
        email: formState.email.value,
        password: formState.password.value,
      });
      setSubmitText(data.message);
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  };

  const hasErrors = Object.values(formState).some((f) => f.errors.length > 0);
  const errorEntries = Object.fromEntries(
    Object.entries(formState)
      .filter(([, f]) => f.errors.length > 0)
      .map(([k, f]) => [k, f.errors])
  );

  const canNext = formState.username.isValid && formState.email.isValid;
  const canSubmit =
    formState.password.isValid && formState.confirmPassword.isValid;

  return (
    <div
      className={`flex w-full items-start transition-all duration-500 ${
        hasErrors ? "gap-[0.625rem]" : "gap-0"
      }`}
    >
      {/* Form Column */}
      <section className="bg-surface flex flex-col justify-center p-[3.125rem] space-y-[1.5625rem] rounded-[1.25rem] transition-all duration-500">
        <div className="space-y-[0.625rem]">
          <h1 className="text-3xl font-bold text-primary-text">
            Create Account!
          </h1>
          <p className="text-base text-primary-text">
            Already have an account?{" "}
            <Link href="/auth/login" className="hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <form className="space-y-[1.5625rem]" onSubmit={handleSubmit}>
          <div className="relative overflow-hidden w-[28rem] min-h-[13.5rem]">
            {step === 1 && (
              <div className="space-y-[1.5625rem] animate-slide-fade-in">
                <div className="space-y-1">
                  <TextInput
                    id="username"
                    name="username"
                    title="Username"
                    placeholder="Enter username"
                    value={formState.username.value}
                    onChange={handleChange}
                    inputProps={{ required: true }}
                  />
                  <p className="block lg:hidden text-base text-primary-text">
                    {formState.username.errors.map((err) => (
                      <span key={err}>{err}</span>
                    ))}
                  </p>
                </div>
                <div className="space-y-1">
                  <EmailInput
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    value={formState.email.value}
                    onChange={handleChange}
                    inputProps={{ required: true }}
                  />
                  <p className="block lg:hidden text-base text-primary-text">
                    {formState.email.errors.map((err) => (
                      <span key={err}>{err}</span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-[1.5625rem] absolute top-0 left-0 w-full animate-slide-fade-in">
                <div className="space-y-1">
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={formState.password.value}
                    onChange={handleChange}
                    inputProps={{ required: true }}
                  />
                  <p className="block lg:hidden text-base text-primary-text">
                    {formState.password.errors.map((err) => (
                      <span key={err}>{err}</span>
                    ))}
                  </p>
                </div>
                <div className="space-y-1">
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formState.confirmPassword.value}
                    onChange={handleChange}
                    inputProps={{ required: true }}
                  />
                  <p className="block lg:hidden text-base text-primary-text">
                    {formState.confirmPassword.errors.map((err) => (
                      <span key={err}>{err}</span>
                    ))}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            {step === 1 ? (
              <Button
                type="button"
                buttonProps={{ disabled: !canNext }}
                onClick={() => setStep(2)}
              >
                Next
              </Button>
            ) : (
              <>
                <Button type="button" onClick={() => setStep(1)}>
                  Previous
                </Button>
                <Button
                  type="submit"
                  buttonProps={{ disabled: !canSubmit || loading }}
                >
                  {loading ? (
                    <p className="flex items-center justify-center gap-[0.625rem]">
                      <span className="loading loading-infinity loading-md" />
                      Signing up
                    </p>
                  ) : (
                    submitText
                  )}
                </Button>
              </>
            )}
            <Button type="button" onClick={handleGoogleLogin}>
              <span className="flex items-center justify-center gap-[0.625rem]">
                <GoogleColorIcon />
                Sign up with Google
              </span>
            </Button>
          </div>
        </form>
      </section>

      {/* Error Panel */}
      <AnimatedErrorList errors={errorEntries} visible={hasErrors} />
    </div>
  );
}
