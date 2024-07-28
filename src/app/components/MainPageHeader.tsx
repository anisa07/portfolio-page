"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLinksObserver } from "../hooks/useLinksObserver";
import { Nav } from "./Nav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { MobileNav } from "./MobileNav";

export const MainPageHeader = () => {
  const headerRef = useRef(null);
  const links = ["home", "about", "projects", "blog", "contacts"];
  const { activeSection } = useLinksObserver(links);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { top: -120 },
      { top: 0, duration: 0.7, delay: 1.2, ease: "Power0.easeNone" }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-[6px]"
    >
      <div className="w-full h-auto bg-gray-50/85 shadow-sm dark:bg-transparent min-h-[4.5rem] flex justify-end items-center px-[16px] gap-5">
        <div className="hidden md:block">
          <Nav links={links} activeSection={activeSection} />
        </div>
        <div className="block md:hidden">
          <MobileNav links={links} activeSection={activeSection} />
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
