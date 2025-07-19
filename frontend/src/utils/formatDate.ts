export interface IDateFormat {
  year?: "numeric" | "2-digit";
  month?: "short" | "long" | "numeric";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
}

export function formatDate(date: string, locale: string, format: IDateFormat) {
  return new Date(date).toLocaleDateString(locale, format);
}
