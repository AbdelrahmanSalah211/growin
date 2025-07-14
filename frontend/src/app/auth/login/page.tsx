"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import EmailInput from "@/components/ui/inputs/EmailInput";
import PasswordInput from "@/components/ui/inputs/PasswordInput";
import Link from "next/link";
import { FormState } from "@/types/FormState";
import { Button } from "@/components/ui/buttons/button";
import { GoogleColorIcon } from "@/components/icons/GoogleColorIcon";
import AnimatedErrorList from "@/components/ui/feedback/AnimatedErrorList";
import { validateEmail } from "@/utils/validate";
import { googleLogin, login, LoginPayload } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { setToken, setUser } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";

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
      setUser(JSON.stringify(data.user));
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
      setUser(JSON.stringify(data.user));
      setAuth(data.accessToken, data.user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      {/* Left Section */}
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

      {/* Form Section */}
      <section className="sm:scale-[1] flex-1 flex flex-col justify-center items-center sm:px-[5.71875rem] sm:py-[3.8rem] px-6 py-6">
        <div className="space-y-[2.5rem]">
          <h1 className="text-[2rem] sm:text-[3rem] font-black text-primary-text">
            Log In
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-[2.07275rem]">
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
            </div>

            <div>
              <Link
                href="/auth/forgot-password"
                className="text-base text-primary-text hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

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

            <p className="text-base text-primary-text">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="hover:underline">
                Sign up
              </Link>
            </p>

            <Button type="button" onClick={handleGoogleLogin}>
              <span className="flex items-center justify-center gap-[0.625rem]">
                <GoogleColorIcon />
                Log in with Google
              </span>
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
