import { Start } from "./components/Start";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Blog } from "./components/Blog";
import { Contacts } from "./components/Contact";
import { MainPageHeader } from "./components/MainPageHeader";

export default function Home() {
  return (
    <main>
      <MainPageHeader />
      <Start />
      <About />
      <Projects />
      <Blog />
      <Contacts />
    </main>
  );
}
