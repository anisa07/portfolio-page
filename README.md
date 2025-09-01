# Anisa's Portfolio

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

- **Hero Section** - Introduction with call-to-action
- **About Me** - Personal description with skills visualization
- **Projects** - Showcase of development work with tech stacks
- **Contact** - Contact form and social links

## 🛠️ Tech Stack Showcase

The portfolio demonstrates proficiency in:

- **Frontend**: React, Vue.js, TypeScript, Astro
- **Styling**: Tailwind CSS, CSS Variables, Responsive Design
- **Backend**: Node.js, NestJS, Firebase
- **Tools**: Next.js, WebSockets, Modern Build Tools

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional, for contact form)

   ```bash
   cp .env.example .env
   # Add your Web3Forms API key to .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - English: `http://localhost:4321/en`
   - Dutch: `http://localhost:4321/nl`

## 📧 Contact Form Setup

To enable the contact form:

1. Go to [Web3Forms](https://web3forms.com/platforms/react-contact-form)
2. Register with your email address
3. Copy your API key
4. Add it to `.env` file:
   ```
   PUBLIC_EMAIL_ACCESS_API_KEY=your_api_key_here
   ```

## 🌐 Internationalization

The portfolio supports multiple languages:

- 🇺🇸 English (`/en`)
- 🇳🇱 Dutch (`/nl`)

Language files are located in `src/i18n/messages/`.

## 🎨 Customization

### Adding New Projects

1. Add project images to `/public/` folder
2. Update project data in `src/components/Projects.astro`
3. Add translations in `src/i18n/messages/*/common.json`

### Modifying Content

- **Personal info**: Update translations in `src/i18n/messages/`
- **Skills**: Modify the skills array in `src/components/About.astro`
- **Social links**: Update links in `src/components/Footer.astro`

### Theme Customization

Colors and styling can be customized in:

- `tailwind.config.js` - Tailwind configuration
- `src/styles/global.css` - CSS variables and global styles

## 📝 Available Commands

| Command             | Action                                           |
| ------------------- | ------------------------------------------------ |
| `npm install`       | Install dependencies                             |
| `npm run dev`       | Start local dev server at `localhost:4321`       |
| `npm run build`     | Build production site to `./dist/`               |
| `npm run preview`   | Preview build locally                            |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🏆 Projects Featured

1. **Kanban Board** - React, Firebase, Chakra UI, TypeScript
2. **Chat Application** - Vue 3, WebSockets, Tailwind CSS, NestJS
3. **TestMaker AI** - React, Next.js, LLM, RAG

## � License

This project is open source and available under the MIT License.

---

Built with ❤️ using modern web technologies.
