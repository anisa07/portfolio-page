"use client";

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
      <button
        className="rounded-md bg-white dark:bg-gray-800 p-2"
        onClick={() => setTheme("light")}
      >
        <FiSun size={20} className="text-black dark:text-white" />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button
        className="rounded-md bg-white dark:bg-gray-800 p-2"
        onClick={() => setTheme("dark")}
      >
        <FiMoon size={20} className="text-black dark:text-white" />
      </button>
    );
  }
};
