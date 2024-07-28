"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiClock } from "react-icons/fi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <FiClock size={20} className="text-black dark:text-white" />;

  if (resolvedTheme === "dark") {
    return (
      <Button variant="outline" onClick={() => setTheme("light")}>
        <FiSun size={20} className="text-black dark:text-white" />
      </Button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <Button variant="outline" onClick={() => setTheme("dark")}>
        <FiMoon size={20} className="text-black dark:text-white" />
      </Button>
    );
  }
};
