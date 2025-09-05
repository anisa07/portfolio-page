# Anisa's Portfolio

A modern, responsive portfolio website built with **Astro**, **React**, **TypeScript**, and **Tailwind CSS**, featuring internationalization support, comprehensive SE## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📬 Contact

- **Website**: [https://www.anisa-sd.org](https://www.anisa-sd.org)
- **GitHub**: [https://github.com/anisa07](https://github.com/anisa07)
- **LinkedIn**: [https://www.linkedin.com/in/anisa-askarova-b94878110](https://www.linkedin.com/in/anisa-askarova-b94878110)

---

Built with ❤️ using modern web technologies and AI assistance.a modern design system.

🌐 **Live Site**: [https://www.anisa-sd.org](https://www.anisa-sd.org)

## ✨ Features

- **🚀 Astro v5.13.3** - Fast, modern static site generation with islands architecture
- **⚛️ React v19.1.1** - Interactive components where needed
- **📘 TypeScript** - Full type safety throughout the application
- **🎨 Tailwind CSS v3.4.17** - Utility-first styling with custom theming system
- **🌍 Internationalization** - English and Dutch language support with proper hreflang
- **🌙 Dark/Light Mode** - Theme switching with persistent state and no-flash loading
- **📱 Responsive Design** - Mobile-first approach with modern UI patterns
- **🎭 Modern UI** - Clean, professional design with smooth animations and gradients
- **📧 Contact Form** - Integrated contact system with form validation
- **🔍 SEO Optimized** - Complete SEO setup with OpenGraph, sitemap, and robots.txt
- **⚡ Performance** - Optimized images, compressed assets, and purged CSSolio

A modern, responsive portfolio website built with **Astro**, **React**, **TypeScript**, and **Tailwind CSS**, featuring internationalization support and a comprehensive component system.

## ✨ Features

- **🚀 Astro v5.13.3** - Fast, modern static site generation
- **⚛️ React v19.1.1** - Interactive components where needed
- **📘 TypeScript** - Full type safety throughout
- **🎨 Tailwind CSS v3.4.17** - Utility-first styling with custom theming
- **🌍 Internationalization** - English and Dutch language support
- **🌙 Dark/Light Mode** - Theme switching with persistent state
- **📱 Responsive Design** - Mobile-first approach
- **🎭 Modern UI** - Clean, professional design with smooth animations
- **� Contact Form** - Integrated with Web3Forms for email handling

## 🏗️ Portfolio Sections

- **Hero Section** - Animated introduction with gradient backgrounds and floating elements
- **About Me** - Personal description with interactive skills progress bars
- **Projects** - Showcase of 4 key development projects with hover effects
- **Blog** - Technical blog posts with proper typography and reading time
- **Contact** - Interactive contact form with real-time validation
- **Footer** - Social links and site navigation

## 🛠️ Tech Stack Showcase

The portfolio demonstrates expertise in:

- **Frontend**: React.js (90%), Vue.js (87%), TypeScript (88%), Next.js (85%)
- **Mobile**: React Native (82%)
- **Backend**: Node.js (84%), NestJS, Firebase (83%)
- **AI/ML**: AI Prompt Engineering (85%), RAG Systems (80%), LLM Integration
- **Testing**: Cypress (85%), Jest, E2E Testing Strategies
- **DevOps**: GitHub Actions (80%), CI/CD Pipelines, Cloud Infrastructure
- **Styling**: Tailwind CSS, CSS Variables, Responsive Design, Design Systems

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/anisa07/portfolio-page.git
   cd portfolio-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional, for contact form)

   ```bash
   cp .env.example .env
   # Add your contact form configuration to .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - English: `http://localhost:4321/en`
   - Dutch: `http://localhost:4321/nl`
   - Root (redirects to EN): `http://localhost:4321`

## 📧 Contact Form Setup

The contact form is integrated with a custom backend service. To enable it:

1. Configure your contact form endpoint in the environment variables
2. Update the API configuration in `src/config/api.ts`
3. The form includes real-time validation and user feedback

## 🌐 Internationalization

The portfolio supports multiple languages with complete translations:

- 🇺🇸 **English** (`/en`) - Primary language
- 🇳🇱 **Dutch** (`/nl`) - Secondary language

**Features:**

- Automatic locale detection and routing
- Proper hreflang attributes for SEO
- Localized 404 pages
- Language switcher component
- Complete UI translations

Language files are located in `src/i18n/messages/` with namespaced translations for better organization.

## 🎨 Customization

### Adding New Projects

1. Add project images to `/public/` folder
2. Update project data in the i18n translation files
3. Add translations in `src/i18n/messages/*/common.json` under the `projects` section
4. Images are automatically optimized during build

### Modifying Content

- **Personal info**: Update translations in `src/i18n/messages/*/home.json`
- **Skills**: Modify the skills array in `src/components/About.astro`
- **Social links**: Update links in footer component
- **Blog posts**: Add new markdown files in `src/data/posts/`

### Theme Customization

Colors and styling can be customized in:

- `tailwind.config.js` - Tailwind configuration with CSS variable mapping
- `src/styles/global.css` - CSS variables, theme tokens, and global styles
- `src/config/variables.ts` - Centralized configuration constants

**Theme System:**

- HSL-based color tokens for UI elements
- RGB-based brand colors (primary, secondary, accent)
- Automatic dark/light mode with no-flash loading
- Responsive design utilities and component classes

## 📝 Available Commands

| Command             | Action                                           |
| ------------------- | ------------------------------------------------ |
| `npm install`       | Install dependencies                             |
| `npm run dev`       | Start local dev server at `localhost:4321`       |
| `npm run build`     | Build production site to `./dist/`               |
| `npm run preview`   | Preview build locally                            |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🚀 Production Features

- **SEO Optimized**: Complete meta tags, OpenGraph, Twitter Cards
- **Sitemap**: Auto-generated XML sitemap with internationalization
- **Robots.txt**: Configured for search engine crawling
- **Performance**: Image optimization, CSS purging, compression
- **Analytics Ready**: Easy integration with tracking services
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 🏆 Projects Featured

1. **Kanban Board** - React, Firebase, Chakra UI, TypeScript
   - Task management with drag-and-drop functionality
   - Real-time data synchronization

2. **Chat Application** - Vue 3, WebSockets, Tailwind CSS, NestJS
   - Real-time messaging with participant rooms
   - Offline support and message persistence

3. **QAIGen** - React, Next.js, LLM, RAG, Node.js, Digital Ocean
   - AI-powered test case generation from requirements
   - Advanced prompt engineering and RAG systems

4. **AI Builder** - Astro, React, PostgreSQL, OpenAI API, AI Agents
   - Generates websites and apps from natural language descriptions
   - This portfolio was built using AI Builder

## 🔧 Architecture

- **Static Site Generation**: Astro's island architecture for optimal performance
- **Component System**: Reusable UI components with TypeScript
- **Internationalization**: Complete i18n setup with proper routing
- **Theme Management**: CSS variables with persistent theme switching
- **SEO Strategy**: Comprehensive meta tags and structured data

## License

This project is open source and available under the MIT License.

---

Built with ❤️ using modern web technologies.
