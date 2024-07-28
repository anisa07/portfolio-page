import { on } from "events";

export interface NavLinks {
  links: string[];
  activeSection: string;
  onNavClick?: () => void;
}

export const Nav = ({ links, activeSection, onNavClick }: NavLinks) => {
  return (
    <nav>
      <ul className="flex flex-col md:flex-row gap-5 items-center">
        {links.map((link, index) => (
          <a
            href={`#${link}`}
            key={index}
            className={`px-5 cursor-pointer capitalize ${
              activeSection === link && "text-accent"
            } transition-all duration-300 ease-in-out hover:scale-110`}
            onClick={() => {
              if (onNavClick) onNavClick();
            }}
          >
            {link}
          </a>
        ))}
      </ul>
    </nav>
  );
};
