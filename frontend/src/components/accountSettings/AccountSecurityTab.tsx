import React, { useState, FormEvent, ChangeEvent } from "react";
import { EmailAddressSignAtIcon } from "../icons/EmailAddressSignAtIcon";
import TextInput from "../ui/inputs/TextInput";
import PasswordInput from "../ui/inputs/PasswordInput";
import { Button } from "../ui/buttons/button";
import { FormState } from "@/types/FormState";
import { validatePassword, validateConfirmPassword, ValidationResult, validateEmail } from "@/utils/validate";
import { updatePassword, updateUserInfo } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";

const AccountSecurityTab = () => {
  const [email, setEmail] = useState<string>("you@example.com"); // verified email
  const [inputEmail, setInputEmail] = useState<string>(email); // editable input
  const [editingEmail, setEditingEmail] = useState<boolean>(false);
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [savingEmail, setSavingEmail] = useState<boolean>(false);
  const { token } = useAuthStore();

  const [passwordFormState, setPasswordFormState] = useState<FormState>({
    currentPassword: { value: "", isValid: false, errors: [] },
    newPassword: {
      value: "",
      validationMethod: validatePassword,
      isValid: false,
      errors: [],
    },
    confirmPassword: { value: "", isValid: false, errors: [] },
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
    setEditingEmail(true);
  };

  const handleSaveEmail = async () => {
    // Validate email
    const emailValidation = validateEmail(inputEmail);
    if (!emailValidation.isValid) {
      alert(`Email validation failed: ${emailValidation.messages.join(', ')}`);
      return;
    }

    if (!token) {
      alert("You must be logged in to update your email.");
      return;
    }

    setSavingEmail(true);
    try {
      await updateUserInfo(
        {
          username: "AbdelrahmanEmbaby", // You might want to get this from user state
          email: inputEmail,
        },
        token
      );
      
      setEmail(inputEmail); // Update the verified email
      setEditingEmail(false);
      alert("Email updated successfully!");
    } catch (error) {
      alert("Failed to update email. Please try again.");
      console.error(error);
    } finally {
      setSavingEmail(false);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormState((prevState) => {
      const field = prevState[name];
      if (!field) return prevState;

      let validation: ValidationResult = { isValid: true, messages: [] };
      
      if (name === "newPassword" && field.validationMethod) {
        validation = field.validationMethod(value);
      } else if (name === "confirmPassword") {
        validation = validateConfirmPassword(
          passwordFormState.newPassword.value,
          value
        );
      } else if (name === "currentPassword") {
        validation = { isValid: value.length > 0, messages: [] };
      }

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

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!passwordFormState.currentPassword.isValid || 
        !passwordFormState.newPassword.isValid || 
        !passwordFormState.confirmPassword.isValid) {
      setLoading(false);
      return;
    }

    if (!token) {
      alert("You must be logged in to change your password.");
      setLoading(false);
      return;
    }

    try {
      await updatePassword(
        {
          currentPassword: passwordFormState.currentPassword.value,
          newPassword: passwordFormState.newPassword.value,
        },
        token
      );
      
      alert("Password updated successfully!");
      setShowPasswordForm(false);
      setPasswordFormState({
        currentPassword: { value: "", isValid: false, errors: [] },
        newPassword: {
          value: "",
          validationMethod: validatePassword,
          isValid: false,
          errors: [],
        },
        confirmPassword: { value: "", isValid: false, errors: [] },
      });
    } catch (error) {
      alert("Failed to update password. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-[#2C3E50] font-bold text-[2.5rem] leading-none mb-6 font-inter">
        Account Security
      </div>
      <div className="w-full h-[0.0625rem] bg-[#E0E6EB] mb-8"></div>
      {/* Basic label */}
      <div className="font-inter font-semibold text-[1.5rem] leading-none text-[#2C3E50] mb-6">
        Basic
      </div>
      {/* Email label */}
      <div className="font-inter font-normal text-[1.125rem] leading-none text-[#2C3E50] mb-2">
        Email
      </div>
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <TextInput
            name="email"
            value={inputEmail}
            onChange={handleEmailChange}
            icon={<EmailAddressSignAtIcon size={20} color="#2C3E50" />}
            placeholder="you@example.com"
            title=""
          />
        </div>
        <button
          type="button"
          onClick={handleSaveEmail}
          disabled={savingEmail || !editingEmail || !validateEmail(inputEmail).isValid}
          className="ml-2 bg-[#F2F5F7] hover:bg-[#E0E6EB] text-[#2C3E50] font-bold rounded-lg px-3 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {savingEmail ? (
            <span className="loading loading-infinity loading-sm"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
      {/* Horizontal line */}
      <div className="w-full border-t border-[#E0E6EB] my-8" />
      {/* Password label */}
      <div className="font-inter font-semibold text-[1.5rem] leading-none text-[#2C3E50] mb-6">
        Password
      </div>
      {/* Description text */}
      <div className="font-inter font-normal text-[1.125rem] leading-none text-[#2C3E50] max-w-2xl mb-8">
        To set or change your password, you'll first need to verify your identity using your email address{' '}
        <span className="font-bold">{email}</span>. We'll send a verification link to this address.
      </div>
      <div className="w-[22.9375rem] h-[3.4375rem] rounded-lg bg-[#F2F5F7] flex items-center justify-center">
        <button
          className="w-[13.5rem] h-[1.375rem] font-inter font-bold text-[1.125rem] leading-none text-[#2C3E50] bg-transparent border-none cursor-pointer p-0"
          onClick={() => setShowPasswordForm(true)}
        >
          Set or Change password
        </button>
      </div>

      {/* Password Change Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-[#F2F5F7] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#2C3E50] font-bold text-[1.5rem] font-inter">
                Change Password
              </h2>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="text-[#2C3E50] hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="1.5rem" height="1.5rem">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <PasswordInput
                name="currentPassword"
                title="Current Password"
                value={passwordFormState.currentPassword.value}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                inputProps={{ required: true }}
              />

              <PasswordInput
                name="newPassword"
                title="New Password"
                value={passwordFormState.newPassword.value}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
                inputProps={{ required: true }}
              />

              <PasswordInput
                name="confirmPassword"
                title="Confirm New Password"
                value={passwordFormState.confirmPassword.value}
                onChange={handlePasswordChange}
                placeholder="Confirm your new password"
                inputProps={{ required: true }}
              />

              {/* Error messages */}
              {Object.entries(passwordFormState).map(([fieldName, field]) => 
                field.errors.length > 0 && (
                  <div key={fieldName} className="text-red-500 text-sm">
                    {field.errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  buttonProps={{
                    disabled: !passwordFormState.currentPassword.isValid ||
                              !passwordFormState.newPassword.isValid ||
                              !passwordFormState.confirmPassword.isValid ||
                              loading,
                  }}
                >
                  {loading ? (
                    <p className="flex items-center justify-center gap-[0.625rem]">
                      <span className="loading loading-infinity loading-md"></span>
                      Updating...
                    </p>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSecurityTab; 