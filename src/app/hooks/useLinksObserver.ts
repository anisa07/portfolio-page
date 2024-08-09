import { useEffect, useState } from "react";

export const useLinksObserver = (links: string[]) => {
  const [activeSection, setActiveSection] = useState("start");

  useEffect(() => {
    const sections: HTMLElement[] = [];

    links.forEach((link) => {
      const section = document.getElementById(link);
      section && sections.push(section);
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && links.includes(entry.target.id)) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections?.forEach((section) => {
      section && observer.observe(section);
    });
  }, []);

  return { activeSection };
};
