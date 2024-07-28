"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".text-animation",
        {
          y: 100,
        },
        {
          y: 0,
          scrollTrigger: {
            trigger: aboutRef.current,
          },
          defaults: { stagger: 0.2, duration: 0.3, delay: 2.2 },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="about"
      ref={aboutRef}
      className="bg-main-1 min-h-dvh py-16 px-10 flex flex-col items-center gap-10"
    >
      <div className="max-w-screen-lg flex flex-col items-center gap-10">
        <div className="w-full flex flex-col-reverse md:flex-row items-center gap-20 md:gap-2 lg:gap-10">
          <div className="w-full flex flex-col items-start gap-7 md:gap-9">
            <div className="relative">
              <div className="overflow-hidden">
                <div className="text-animation text-3xl md:text-4xl font-bold text-accent">
                  About me
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 z-10">
              <div className="overflow-hidden">
                <div className="text-animation text-justify">
                  I am a developer skilled with front-end technologies like
                  React and Vue, proficient with test automation using Cypress
                  and Selenium, and experienced with Angular and React Native,
                  as well as backend development with Java and Node.js. In my
                  free time, I learn Python.
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="text-animation text-xl font-semibold">
                  Latest certificates and cources
                </div>
              </div>
              <div className="flex gap-1 flex-col items-start">
                <div className="font-semibold relative text-accent">
                  Vue 3 Certificate
                </div>
                <div className="overflow-hidden">
                  <div className="text-animation">
                    Successfully passed Vue.js 3 examination on{" "}
                    <span className="font-bold"> certificates.dev</span>.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center image-animation">
            <div className="w-[350px] h-[300px] image-reflection rounded-md"></div>
          </div>
        </div>

        <TechStack />
      </div>
    </div>
  );
};

const TechStack = () => {
  const technologies = [
    "React.JS",
    "Next.JS",
    "TypeScript",
    "JavaScript",
    "Tailwind",
    "GraphQL",
    "Firebase",
    "Vue.JS",
    "React Native",
    "Node.js",
    "Nest.js",
    "Cypress",
  ];
  return (
    <div className="flex items-center gap-x-10 gap-y-5 flex-wrap lg:overflow-hidden">
      <div className="font-semibold relative text-accent">My tech stack</div>
      {technologies.map((tech) => (
        <div key={tech} className="z-10">
          <div className="text-lg font-medium hover:animate-wiggle">{tech}</div>
        </div>
      ))}
    </div>
  );
};
