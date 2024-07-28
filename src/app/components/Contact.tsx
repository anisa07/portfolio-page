"use client";

import { FiLinkedin, FiGithub } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Contacts = () => {
  const contactsRef = useRef(null);
  const timeline = useRef<GSAPTimeline>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: contactsRef.current,
          },
        })
        .to(".square-1", {
          rotate: 45,
        })
        .to(".square-2", { rotate: 45, left: "50.5%" })
        .to(".square-3", { rotate: 45, right: "50.5%" });
    }, contactsRef);

    return () => ctx.revert();
  }, [contactsRef]);

  return (
    <section
      id="contacts"
      ref={contactsRef}
      className="h-dvh bg-main-1 py-16 px-10 flex flex-col items-center justify-center gap-5 relative start-page-gradient"
    >
      <div className="square square-1 top-20 opacity-85"></div>
      <div className="square square-2 top-20"></div>
      <div className="square square-3 top-20 opacity-65"></div>
      <p className="text-4xl font-bold text-center text-accent animate-glow opacity-70">
        Let&apos;s get in touch!
      </p>
      <p className="text-xl max-w-lg text-center">
        I&apos;d love to hear from you! Whether you have a question, a project
        proposal, or just want to connect, feel free to reach out to me.
      </p>
      <ul className="contacts">
        <li>
          <a
            href="https://www.linkedin.com/in/anisa-askarova-b94878110"
            target="_blank"
            className="text-text-1 flex gap-1 mb-2"
          >
            <FiLinkedin size={20} className="text-accent" />
            <span className="font-semibold">LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/anisa07"
            target="_blank"
            className="text-text-1 flex gap-1"
          >
            <FiGithub size={20} className="text-accent" />
            <span className="font-semibold">GitHub</span>
          </a>
        </li>
      </ul>
    </section>
  );
};
