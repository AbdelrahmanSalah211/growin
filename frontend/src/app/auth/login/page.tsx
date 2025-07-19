"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import EmailInput from "@/components/ui/inputs/EmailInput";
import PasswordInput from "@/components/ui/inputs/PasswordInput";
import Link from "next/link";
import { FormState } from "@/types/FormState";
import { Button } from "@/components/ui/buttons/Button";
import { GoogleColorIcon } from "@/components/icons/GoogleColorIcon";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import { validateEmail } from "@/utils/validate";
import { googleLogin, login, LoginPayload } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { setToken, setUser } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";

export default function Login() {
  const [formState, setFormState] = useState<FormState>({
    email: {
      value: "",
      validationMethod: validateEmail,
      isValid: false,
      errors: [],
    },
    password: { value: "", isValid: false, errors: [] },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      const field = prevState[name];
      if (!field) return prevState;
      const validation = field.validationMethod
        ? field.validationMethod(value)
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!formState.email.isValid || !formState.password.isValid) return;
    const payload: LoginPayload = {
      identifier: formState.email.value,
      password: formState.password.value,
    };
    try {
      const data = await login(payload);
      setToken(data.accessToken);
      setUser(data.user);
      setAuth(data.accessToken, data.user);
      router.push("/");
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
      setUser(data.user);
      setAuth(data.accessToken, data.user);
      router.push("/");
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
          <h1 className="max-w-1/3 text-3xl font-bold text-primary-text">
            Welcome Back!
          </h1>
          <p className="text-base text-primary-text">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="hover:underline">
              Sign up
            </Link>
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

          <div className="space-y-1">
            <PasswordInput
              id="password"
              name="password"
              value={formState.password.value}
              onChange={handleChange}
              placeholder="Enter your password"
              inputProps={{ required: true }}
            />
            <p className="block space-y-1 lg:hidden text-base text-primary-text">
              {formState.password.errors.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            <Link
              href="/auth/forgot-password"
              className="text-base text-primary-text hover:underline"
            >
              Forgot your password?
            </Link>
            <Button
              type="submit"
              buttonProps={{
                disabled:
                  !formState.email.isValid ||
                  !formState.password.isValid ||
                  loading,
              }}
            >
              {loading ? (
                <p className="flex items-center justify-center gap-[0.625rem]">
                  <span className="loading loading-infinity loading-md"></span>
                  Logging in
                </p>
              ) : (
                "Log In"
              )}
            </Button>

            <Button type="button" onClick={handleGoogleLogin}>
              <span className="flex items-center justify-center gap-[0.625rem]">
                <GoogleColorIcon />
                Log in with Google
              </span>
            </Button>
          </div>
        </form>
      </section>

      {/* Error panel (flex child that animates open) */}
      <AnimatedErrorList errors={errorEntries} visible={hasErrors} />
    </div>
  );
}
