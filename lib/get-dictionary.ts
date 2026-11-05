import type { Dictionary } from "@/lib/dictionary";
import { en } from "@/lib/dictionaries/en";
import { es } from "@/lib/dictionaries/es";
import { ptBr } from "@/lib/dictionaries/pt-br";
import type { Locale } from "@/lib/i18n";

const dictionaries: Record<Locale, Dictionary> = {
  "pt-br": ptBr,
  es,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
