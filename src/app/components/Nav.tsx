export interface NavLinks {
  links: string[];
  activeSection: string;
}

export const Nav = ({ links, activeSection }: NavLinks) => {
  return (
    <nav>
      <ul className="flex gap-5 items-center">
        {links.map((link, index) => (
          <a
            href={`#${link}`}
            key={index}
            className={`px-5 cursor-pointer capitalize ${
              activeSection === link && "text-accent"
            } transition-all duration-300 ease-in-out hover:scale-110`}
          >
            {link}
          </a>
        ))}
      </ul>
    </nav>
  );
};
