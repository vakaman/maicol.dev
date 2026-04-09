import type { Locale } from "@/contexts/LocaleContext";
import { ptBrMessages } from "./locales/pt-br";
import { usEnMessages } from "./locales/us-en";

export const messages = {
  "pt-br": ptBrMessages,
  "us-en": usEnMessages,
} as const satisfies Record<Locale, typeof ptBrMessages>;
