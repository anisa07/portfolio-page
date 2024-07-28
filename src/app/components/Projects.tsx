import Image from "next/image";
import { FiGithub } from "react-icons/fi";

interface Project {
  imgSrc: string;
  techStack: string[];
  title: string;
  description: string;
  github: string;
}

const projects: Project[] = [
  {
    imgSrc: "/kanban.png",
    techStack: ["React", "Firebase", "Chakra UI", "TypeScript"],
    title: "Kanban Board",
    description:
      "An app allows users to manage tasks visually using a board with columns representing different stages of task completion.",
    github: "https://github.com/anisa07/dashboard",
  },
  {
    imgSrc: "/chat-app.png",
    techStack: ["Vue 3", "Websokets", "Tailwind CSS", "NestJS"],
    title: "Chat App",
    description:
      "A real time chat application, with participants rooms and offline support.",
    github: "https://github.com/anisa07/chat-web-app",
  },
  {
    imgSrc: "/ai-assistant.jpeg",
    techStack: ["React", "LLM"],
    title: "TestMaker",
    description:
      "An app aims to streamline and enhance the testing process by providing intelligent test generation capabilities and a user-friendly interface.",
    github: "",
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-dvh py-16 px-10 flex flex-col items-center gap-10 bg-main-1"
    >
      <p className="text-4xl font-bold text-center">Projects</p>
      <div className="flex flex-col md:flex-row align-middle flex-wrap gap-5 max-w-screen-lg">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

const Project = ({
  imgSrc,
  techStack,
  title,
  description,
  github,
}: Project) => {
  return (
    <article className="flex flex-col flex-1 shadow-lg bg-main-2 rounded-md project">
      <div className="overlay"></div>
      <div className="h-56 relative">
        <Image
          src={imgSrc}
          alt={title}
          // width={500}
          // height={500}
          priority
          fill
          sizes="(min-width: 80px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
          className="absolute z-10 w-full h-full rounded-tl-md rounded-tr-md"
        />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-5 z-10">
        <h4 className="text-lg font-semibold flex gap-2 justify-between items-center">
          {title}
          {github ? (
            <a href={github} target="_blank" className="inline text-text-1">
              <FiGithub className="inline" size={20} />
            </a>
          ) : (
            <span className="text-sm text-text-1">(Coming soon)</span>
          )}
        </h4>
        <p className="text-justify flex-1">{description}</p>
        <p className="text-xs text-text-1">
          {techStack.map((tech, index) => (
            <span key={index} className="mr-2 last:mr-0 ">
              {tech}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
};
