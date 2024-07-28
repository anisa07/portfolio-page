import { FiArrowRight } from "react-icons/fi";

interface Post {
  title: string;
  description: string;
  date: string;
  link: string;
  id: string;
}

const posts: Post[] = [
  {
    title: "Automating NestJS Deployment on Digital Ocean with GitHub Actions",
    description:
      "In this article, I'll walk you through the process of deploying a NestJS backend application on DigitalOcean and setting up GitHub Actions to automate the process of pulling new changes, rebuilding, and restarting the app. This setup ensures that your application stays up-to-date with minimal manual intervention, enhancing both efficiency and reliability",
    date: "2024-07-25",
    link: "",
    id: "1",
  },
  {
    title: "Building a Real-Time Vue 3 App with WebSocket Integration",
    description:
      "In this article, I'll guide you through the process of creating a Vue 3 application and integrating WebSocket for real-time communication, enabling instant updates and interactions within your app.",
    date: "2024-06-25",
    link: "",
    id: "2",
  },
  {
    title: "Exploring Next.js: A Journey into Static Site Generation",
    description:
      "In this article, I will share my experience and insights gained from attempting to clone a static site using Next.js and its powerful Static Generation capabilities. This process demonstrates how to efficiently generate static pages, improve performance, and enhance SEO for your web applications.",
    date: "2024-04-25",
    link: "",
    id: "3",
  },
];

export const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-main-2 min-h-dvh py-16 px-10 flex flex-col items-center gap-5 blog-page-gradient"
    >
      <p className="text-4xl font-bold text-center">Blog</p>
      <div className="flex flex-col gap-5 max-w-screen-lg ">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

const Post = ({ title, description, date, id }: Post) => {
  return (
    <a href={`/blog/${id}`}>
      <article className="transition ease-in-out delay-150 flex flex-col gap-2 hover:transition-all hover:scale-105 hover:bg-main-1 hover:shadow-lg hover:opacity-80 rounded-md p-5">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-xs text-text-1/65">Date {date}</p>
        <p className="text-justify">
          {description}{" "}
          <FiArrowRight
            size={20}
            className="inline text-accent animate-bounce-right"
          />
        </p>
      </article>
    </a>
  );
};
