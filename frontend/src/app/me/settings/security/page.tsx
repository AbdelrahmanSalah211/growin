"use client";

import { Button } from "@/components/ui/buttons/Button";
import EmailInput from "@/components/ui/inputs/EmailInput";
import PasswordInput from "@/components/ui/inputs/PasswordInput";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { setUser } from "@/lib/auth-actions";
import {
  createPassword,
  updatePassword,
  updatePasswordPayload,
  updateUserInfo,
} from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { useRouter, usePathname } from "next/navigation";
import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  ValidationResult,
} from "@/utils/validate";
import { set } from "lodash";

export default function page() {
  useHydrateAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const [initialData, setInitialData] = useState({
    email: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formState, setFormState] = useState({
    email: { isValid: false, errors: [] as string[] },
    newPassword: { isValid: false, errors: [] as string[] },
    confirmPassword: { isValid: false, errors: [] as string[] },
  });

  const validateField = (name: string, value: string): ValidationResult => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "newPassword":
        return validatePassword(value);
      case "confirmPassword":
        return validateConfirmPassword(formData.newPassword, value);
      default:
        return { isValid: true, messages: [] };
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setInitialData({
        email: user.email,
      });
      setFormData({
        email: user.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setFormState({
        email: { isValid: true, errors: [] },
        newPassword: { isValid: false, errors: [] },
        confirmPassword: { isValid: false, errors: [] },
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (["email", "newPassword", "confirmPassword"].includes(name)) {
      const validation = validateField(name, value);
      setFormState((prev) => ({
        ...prev,
        [name]: {
          isValid: validation.isValid,
          errors: validation.messages,
        },
      }));

      if (name === "newPassword") {
        const confirmValidation = validateConfirmPassword(
          value,
          formData.confirmPassword
        );
        setFormState((prev) => ({
          ...prev,
          confirmPassword: {
            isValid: confirmValidation.isValid,
            errors: confirmValidation.messages,
          },
        }));
      }
    }
  };

  const hasEmailChanged = initialData.email !== formData.email;

  const handleBasicSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hasEmailChanged || !token || !formState.email.isValid) return;

    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);

    try {
      const updated = await updateUserInfo(formDataObj, token);

      setUser(updated);
      setInitialData({ email: updated.email });
      setFormData((prev) => ({ ...prev, email: updated.email }));
    } catch (err) {
      console.error("Failed to save basic info", err);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !token ||
      !formState.newPassword.isValid ||
      !formState.confirmPassword.isValid
    )
      return;

    if (user?.isPasswordPresent) {
      const payload: updatePasswordPayload = {
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      try {
        const data = await updatePassword(payload, token);
        setFormData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } catch (err) {
        console.error("Failed to update password", err);
      }
    } else {
      const payload = {
        password: formData.newPassword,
      };

      try {
        const data = await createPassword(payload, token);
        setUser({...user!, isPasswordPresent: true});
        setFormData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        router.replace(pathname);
      } catch (err) {
        console.error("Failed to update password", err);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {isLoading ? (
        <p className="w-full h-full flex justify-center items-center text-primary-text">
          <span className="loading loading-6xl loading-ring"></span>
        </p>
      ) : (
        <>
          <h1 className="text-3xl font-bold p-7">Security</h1>
          <hr className="text-border" />
          <section className="space-y-5 p-7">
            <h2 className="text-2xl font-semibold">Basic</h2>
            <form onSubmit={handleBasicSubmit} className="flex flex-col gap-5">
              <div>
                <EmailInput
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="block  text-base text-primary-text">
                  {formState.email.errors.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </span>
              </div>
              <Button
                className="!w-fit self-end !px-6"
                type="submit"
                buttonProps={{
                  disabled: !formState.email.isValid || !hasEmailChanged,
                }}
              >
                Save
              </Button>
            </form>
          </section>
          <hr className="text-border" />
          <section className="w-full space-y-5 p-7">
            <h2 className="text-2xl font-semibold">
              {user?.isPasswordPresent ? "Change" : "Set"} Password
            </h2>
            <div className="flex gap-5">
              {user?.isPasswordPresent ? (
                <form
                  onSubmit={handlePasswordSubmit}
                  className="w-full flex flex-col gap-5"
                >
                  <div>
                    <PasswordInput
                      id="oldPassword"
                      name="oldPassword"
                      title="Old Password"
                      value={formData.oldPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <PasswordInput
                      id="newPassword"
                      name="newPassword"
                      title="New Password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    <span className="block  text-base text-primary-text">
                      {formState.newPassword.errors.map((err) => (
                        <p key={err}>{err}</p>
                      ))}
                    </span>
                  </div>
                  <div>
                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      title="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="block  text-base text-primary-text">
                      {formState.confirmPassword.errors.map((err) => (
                        <p key={err}>{err}</p>
                      ))}
                    </span>
                  </div>
                  <Button
                    className="!w-fit self-end !px-6"
                    type="submit"
                    buttonProps={{
                      disabled:
                        !formState.newPassword.isValid ||
                        !formState.confirmPassword.isValid,
                    }}
                  >
                    Save
                  </Button>
                </form>
              ) : (
                <form
                  onSubmit={handlePasswordSubmit}
                  className="w-full flex flex-col gap-5"
                >
                  <div>
                    <PasswordInput
                      id="newPassword"
                      name="newPassword"
                      title="New Password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    <span className="block  text-base text-primary-text">
                      {formState.newPassword.errors.map((err) => (
                        <p key={err}>{err}</p>
                      ))}
                    </span>
                  </div>
                  <div>
                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      title="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="block  text-base text-primary-text">
                      {formState.confirmPassword.errors.map((err) => (
                        <p key={err}>{err}</p>
                      ))}
                    </span>
                  </div>
                  <Button
                    className="!w-fit self-end !px-6"
                    type="submit"
                    buttonProps={{
                      disabled:
                        !formState.newPassword.isValid ||
                        !formState.confirmPassword.isValid,
                    }}
                  >
                    Save
                  </Button>
                </form>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
