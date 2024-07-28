"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Start = () => {
  const sectionRef = useRef(null);
  const timeline = useRef<GSAPTimeline>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
          },
          defaults: { stagger: 0.2, duration: 0.3 },
        })
        .fromTo(
          ".text-animation",
          {
            y: 100,
          },
          {
            y: 0,
            delay: 0.5,
          }
        )
        .fromTo(
          ".description-animation",
          {
            scale: 0,
          },
          {
            scale: 1,
            ease: "back",
            duration: 0.3,
          }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="bg-main-2 min-h-dvh py-16 relative start-page-gradient"
    >
      <div
        ref={sectionRef}
        className="absolute max-w-lg m-auto w-full top-[20%] md:top-[50%] left-[50%] -translate-x-1/2 md:-translate-y-1/2 z-10"
      >
        <div className="bg-main-1 p-10 flex flex-col gap-4 justify-center items-center opacity-80 rounded-md">
          <div className="overflow-hidden">
            <div className="text-animation text-gradient leading-none text-4xl md:text-6xl font-semibold">
              Anisa
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="text-animation text-2xl md:text-4xl font-semibold">
              <span className="text-accent">Software </span>
              <span>Developer</span>
            </div>
          </div>

          <div className="description-animation w-[300px] md:w-[370px] relative z-30 inline-block bg-clip-text">
            A software developer skilled in front-end technologies like React,
            Vue, and TypeScript, with a strong background in test automation and
            a passion for creating efficient, user-friendly applications
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/waves.png"
          alt="main image"
          width={800}
          height={800}
          layout="responsive"
          priority
        />
      </div>
    </section>
  );
};
