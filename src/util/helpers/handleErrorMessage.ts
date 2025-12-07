import { ErrorMessages } from "@/app/enums/error.enum";

export function handleErrorMessage(code: string): string {
  return ErrorMessages[code as keyof typeof ErrorMessages] || 'An unexpected error occurred. Please try again.';
}
