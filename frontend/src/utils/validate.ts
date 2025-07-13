import {
  isEmail,
  isInternationalName,
  isUsername,
  isLengthAtLeast,
  isLengthAtMost,
  hasNumber,
  hasUpperCase,
  hasLowerCase,
  hasSpecialChar,
} from "./regex";

const PASSWORD_MIN_LENGTH = Number(process.env.PASSWORD_MIN_LENGTH) || 8;
const USERNAME_MIN_LENGTH = Number(process.env.USERNAME_MIN_LENGTH) || 3;

export type ValidationResult = {
  isValid: boolean;
  messages: string[];
};

export const validateEmail = (email: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    messages: [],
  };

  if (!isEmail(email)) result.messages.push("Invalid email address.");

  result.isValid = result.messages.length === 0;
  return result;
};

export const validateName = (name: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    messages: [],
  };

  if (!isLengthAtLeast(name, 2))
    result.messages.push("Name must be at least 2 characters long.");
  if (!isLengthAtMost(name, 100))
    result.messages.push("Name must be at most 100 characters long.");
  if (!isInternationalName(name))
    result.messages.push(
      "Name must contain only letters, spaces, hyphens, and apostrophes."
    );

  result.isValid = result.messages.length === 0;
  return result;
};

export const validateUsername = (username: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    messages: [],
  };

  if (!isLengthAtLeast(username, USERNAME_MIN_LENGTH))
    result.messages.push(
      `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`
    );
  if (username.trim() !== username)
    result.messages.push("Username cannot start or end with spaces.");
  if (!isUsername(username))
    result.messages.push(
      "Username can only contain letters, numbers, spaces, hyphens, and apostrophes."
    );

  result.isValid = result.messages.length === 0;
  return result;
};

export const validatePassword = (password: string): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    messages: [],
  };

  if (!isLengthAtLeast(password, PASSWORD_MIN_LENGTH))
    result.messages.push(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
    );
  if (!hasNumber(password))
    result.messages.push("Password must contain at least one number.");
  if (!hasUpperCase(password))
    result.messages.push(
      "Password must contain at least one uppercase letter."
    );
  if (!hasLowerCase(password))
    result.messages.push(
      "Password must contain at least one lowercase letter."
    );
  if (!hasSpecialChar(password))
    result.messages.push(
      "Password must contain at least one special character."
    );

  result.isValid = result.messages.length === 0;
  return result;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  const result: ValidationResult = {
    isValid: false,
    messages: [],
  };

  console.log(password, confirmPassword);

  if (password !== confirmPassword)
    result.messages.push("Passwords do not match.");

  console.log(result.messages);

  result.isValid = result.messages.length === 0;
  return result;
};

export const isImage = (file: File | null): boolean => {
  if (!file || !file.type) return false;

  const imageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  return imageMimeTypes.includes(file.type.toLowerCase());
};
