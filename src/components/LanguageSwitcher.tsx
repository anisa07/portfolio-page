import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange?: (locale: Locale) => void;
  className?: string;
}

export default function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
  className = "",
}: LanguageSwitcherProps) {
  const { t, isLoading } = useTranslation(currentLocale, ["common", "ui"]);
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(currentLocale);

  const languages = locales.map((locale) => ({
    label: locale,
    value: locale,
  }));

  const handleLocaleChange = (newLocale: Locale) => {
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    } else {
      // Default behavior: navigate to the new locale path
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`);
      window.location.href = newPath;
    }
  };

  if (isLoading || !t) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <div className="btn btn-ghost btn-sm animate-pulse bg-muted"></div>
        <div className="btn btn-ghost btn-sm animate-pulse bg-muted"></div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-2 ${className}`}
      role="group"
      aria-label={t("nav.language_switcher", {}, "Language switcher")}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between h-full"
          >
            {currentLocale
              ? languages.find((language) => language.value === currentLocale)
                  ?.label
              : t("nav.select_language", {}, "Select language...")}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100px] p-0">
          <Command>
            {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
            <CommandList>
              <CommandEmpty>
                {t("nav.no_language_found", {}, "No language found.")}
              </CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    value={language.value}
                    onSelect={(value) => {
                      if (currentLocale === value) {
                        return;
                      }
                      handleLocaleChange(value as Locale);
                      setOpen(false);
                    }}
                  >
                    {language.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        currentLocale === language.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
