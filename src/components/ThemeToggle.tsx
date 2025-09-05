import React, { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import type { Locale } from "@/i18n/config";
import { Loading } from "./ui/loading";
import { Sun, Moon } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/config/variables";

interface ThemeToggleProps {
  className?: string;
  locale?: Locale;
}

export default function ThemeToggle({
  className = "",
  locale = "en",
}: ThemeToggleProps) {
  const [theme, setTheme] = useState(
    window.localStorage.getItem(THEME_STORAGE_KEY) || "light"
  );
  const { t, isLoading } = useTranslation(locale, ["common", "ui"]);

  useEffect(() => {
    if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
    if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
      window.document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setTheme(newTheme);
    window.document.documentElement.classList.toggle("dark");
  };

  // Helper function to render the theme icon and text
  const renderThemeContent = () =>
    theme === "dark" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Moon className="h-4 w-4" />
    );

  // If translations aren't loaded yet, show loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-outline btn-md flex items-center gap-2 ${className}`}
      aria-label={t ? t("theme.toggle", {}, "Toggle theme") : "Toggle theme"}
    >
      {renderThemeContent()}
    </button>
  );
}
