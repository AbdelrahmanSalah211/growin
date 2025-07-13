import { ValidationResult } from "@/utils/validate";
export interface FormFieldState {
  value: string;
  validationMethod?: (value: string) => ValidationResult;
  isValid: boolean;
  errors: string[];
}

export type FormState = Record<string, FormFieldState>;
