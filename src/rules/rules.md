# Mega Template Development Rules

> **AI Context**: These rules define the architecture, conventions, and best practices for the Mega Template project. Follow these strictly when making code changes, creating components, or adding features.

## 🏗️ Project Architecture

### Core Structure (MUST PRESERVE)

```text
/
├── public/                  # Static assets (images, icons, favicon)
├── src/
│   ├── components/          # Reusable components (Astro & React)
│   │   ├── ui/              # Base UI component library (shadcn-style)
│   │   ├── ThemeToggle.tsx  # Theme switch component
│   │   └── ContactForm.tsx  # Contact form with i18n
│   ├── hooks/               # React hooks for client-side logic
│   │   └── useTranslation.ts # Client-side translation hook
│   ├── i18n/                # Internationalization system
│   │   ├── config.ts        # i18n configuration & locale definitions
│   │   ├── utils.ts         # Translation utilities
│   │   ├── t.ts             # Core translation function factory
│   │   └── messages/        # Translation JSON files (en, nl, etc.)
│   ├── layouts/             # Page layouts
│   │   └── IntlBaseLayout.astro # Base layout with i18n support
│   ├── middleware.ts        # Server middleware (auth, rate limiting, i18n)
│   ├── pages/               # File-based routing with dynamic locales
│   │   └── [locale]/        # Dynamic locale routing
│   │       ├── index.astro  # Home page (handles /en, /nl, etc.)
│   │       └── about.astro  # About page (handles /en/about, /nl/about, etc.)
│   ├── styles/              # Global styles and CSS variables
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions and helpers
└── package.json
```

### Technology Stack

- **Framework**: Astro v5+ (primary) + React v19+ (for complex interactions)
- **Styling**: Tailwind CSS v3+ with CSS variables for theming
- **Types**: TypeScript (strict mode)
- **i18n**: Custom implementation with server-side translation
- **UI Components**: shadcn/ui style components when needed

## 📝 File Naming Conventions

| Type                      | Convention                  | Examples                               |
| ------------------------- | --------------------------- | -------------------------------------- |
| **Astro Components**      | PascalCase                  | `Header.astro`, `NavigationMenu.astro` |
| **React Components**      | PascalCase                  | `ThemeToggle.tsx`, `ContactForm.tsx`   |
| **UI Components (React)** | lowercase                   | `alert.tsx`, `button.tsx`, `input.tsx` |
| **UI Components (Astro)** | lowercase                   | `message.astro`, `card.astro`          |
| **Pages**                 | kebab-case                  | `about-us.astro`, `contact-form.astro` |
| **Utilities**             | camelCase                   | `formatDate.ts`, `apiHelpers.ts`       |
| **Types**                 | PascalCase                  | `User.ts`, `ApiResponse.ts`            |
| **Hooks**                 | camelCase with `use` prefix | `useTranslation.ts`, `useSendEmail.ts` |

## 🌍 Internationalization Rules

### Critical i18n Requirements

> **⚠️ NEVER use raw text without translation - ALL user-facing text MUST use the translation system**

### Page Translation Setup

```astro
---
// REQUIRED: Import necessary types and functions
import IntlBaseLayout from "@/layouts/IntlBaseLayout.astro";
import { getPageTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

// REQUIRED: Generate static paths for all supported locales
export async function getStaticPaths() {
  return locales.map((locale) => ({
    params: { locale },
  }));
}

// REQUIRED: Get locale from dynamic route params
// IntlBaseLayout will handle validation and redirect if needed
const { locale } = Astro.params;

// Get the translation function for this page
const { t } = await getPageTranslations(locale as Locale, ["common", "ui"]);
---

<IntlBaseLayout
  locale={locale}
  pageNS={["common", "ui"]}
  title={t("site.title", "Fallback Title")}
>
  <!-- Page content -->
</IntlBaseLayout>
```

### React Component Translation

```tsx
// REQUIRED: Use useTranslation hook in React components
import { useTranslation } from "@/hooks/useTranslation";

function MyComponent({ locale = "en" }) {
  const { t, isLoading } = useTranslation(locale, ["common", "ui"]);

  if (isLoading) return <Loading />;

  return <h1>{t("welcome.title", "Welcome {name}", { name: "User" })}</h1>;
}

<!-- GOOD: Input without visible label but with aria-label -->

<input
type="search"
aria-label={t("search.placeholder", "Search the site")}
placeholder={t("search.placeholder", "Search the site")}
/>

<!-- GOOD: Links for navigation -->
<a href="/about" class="btn btn-primary">
  {t("buttons.learnMore", "Learn More")}
</a>

<!-- BAD: Divs as buttons -->
<div onclick="handleClick()" class="btn"> ❌
  Click me
</div>

<!-- BAD: Input without label or aria-label -->

<input type="email" placeholder="Email" /> ❌

<!-- BAD: Button for navigation -->

<button onclick="location.href='/about'"> ❌
Learn More
</button>

```

### Heading Hierarchy (REQUIRED)

```astro
<!-- GOOD: Proper heading hierarchy -->
<main>
  <h1>{t("page.title", "Page Title")}</h1>

  <section>
    <h2>{t("section.title", "Section Title")}</h2>
    <h3>{t("subsection.title", "Subsection")}</h3>
    <h3>{t("subsection.title2", "Another Subsection")}</h3>
  </section>

  <section>
    <h2>{t("section.title2", "Another Section")}</h2>
  </section>
</main>

<!-- BAD: Skipping heading levels -->
<h1>Page Title</h1>
<h3>Subsection</h3> ❌ (skipped h2)

<!-- BAD: Using headings for styling only -->
<h3 class="small-text">Not actually a heading</h3> ❌
```

### ARIA and Accessibility (REQUIRED)

```astro
<!-- GOOD: Proper ARIA usage -->
<nav aria-label={t("nav.breadcrumb", "Breadcrumb")}>
  <ol role="list">
    <li><a href="/">{t("nav.home", "Home")}</a></li>
    <li><a href="/blog">{t("nav.blog", "Blog")}</a></li>
    <li aria-current="page">{t("nav.current", "Current Page")}</li>
  </ol>
</nav>

<!-- GOOD: Modal with proper ARIA -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">{t("modal.title", "Modal Title")}</h2>
  <p id="modal-description">{t("modal.description", "Modal description")}</p>
  <button aria-label={t("buttons.close", "Close modal")}>×</button>
</div>

<!-- GOOD: Loading states -->
<button aria-busy="true" disabled>
  <span aria-hidden="true">⏳</span>
  {t("buttons.loading", "Loading...")}
</button>

<!-- GOOD: Error states -->
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<div id="email-error" role="alert">
  {t("errors.invalidEmail", "Please enter a valid email")}
</div>
```

### SEO-Optimized Lists and Tables

```astro
<!-- GOOD: Structured lists -->
<section aria-labelledby="features-title">
  <h2 id="features-title">{t("features.title", "Features")}</h2>
  <ul role="list">
    <li>
      <h3>{t("features.feature1", "Feature 1")}</h3>
      <p>{t("features.description1", "Description")}</p>
    </li>
  </ul>
</section>

<!-- GOOD: Accessible tables -->
<table>
  <caption>{t("table.caption", "Pricing comparison")}</caption>
  <thead>
    <tr>
      <th scope="col">{t("table.plan", "Plan")}</th>
      <th scope="col">{t("table.price", "Price")}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{t("plans.basic", "Basic")}</th>
      <td>$10/month</td>
    </tr>
  </tbody>
</table>
```

### Technology Stack

- **Framework**: Astro v5+ (primary) + React v19+ (for complex interactions)
- **Styling**: Tailwind CSS v3+ with CSS variables for theming
- **Types**: TypeScript (strict mode)
- **i18n**: Custom implementation with server-side translation
- **UI Components**: shadcn/ui style components when needed

## 📝 File Naming Conventions

| Type                      | Convention                  | Examples                               |
| ------------------------- | --------------------------- | -------------------------------------- |
| **Astro Components**      | PascalCase                  | `Header.astro`, `NavigationMenu.astro` |
| **React Components**      | PascalCase                  | `ThemeToggle.tsx`, `ContactForm.tsx`   |
| **UI Components (React)** | lowercase                   | `alert.tsx`, `button.tsx`, `input.tsx` |
| **UI Components (Astro)** | lowercase                   | `message.astro`, `card.astro`          |
| **Pages**                 | kebab-case                  | `about-us.astro`, `contact-form.astro` |
| **Utilities**             | camelCase                   | `formatDate.ts`, `apiHelpers.ts`       |
| **Types**                 | PascalCase                  | `User.ts`, `ApiResponse.ts`            |
| **Hooks**                 | camelCase with `use` prefix | `useTranslation.ts`, `useSendEmail.ts` |

## 🌍 Internationalization Rules

### Technology Stack

- **Framework**: Astro v5+ (primary) + React v19+ (for complex interactions)
- **Styling**: Tailwind CSS v3+ with CSS variables for theming
- **Types**: TypeScript (strict mode)
- **i18n**: Custom implementation with server-side translation
- **UI Components**: shadcn/ui style components when needed

## 📝 File Naming Conventions

| Type                      | Convention                  | Examples                               |
| ------------------------- | --------------------------- | -------------------------------------- |
| **Astro Components**      | PascalCase                  | `Header.astro`, `NavigationMenu.astro` |
| **React Components**      | PascalCase                  | `ThemeToggle.tsx`, `ContactForm.tsx`   |
| **UI Components (React)** | lowercase                   | `alert.tsx`, `button.tsx`, `input.tsx` |
| **UI Components (Astro)** | lowercase                   | `message.astro`, `card.astro`          |
| **Pages**                 | kebab-case                  | `about-us.astro`, `contact-form.astro` |
| **Utilities**             | camelCase                   | `formatDate.ts`, `apiHelpers.ts`       |
| **Types**                 | PascalCase                  | `User.ts`, `ApiResponse.ts`            |
| **Hooks**                 | camelCase with `use` prefix | `useTranslation.ts`, `useSendEmail.ts` |

## 🌍 Internationalization Rules

### Critical i18n Requirements

> **⚠️ NEVER use raw text without translation - ALL user-facing text MUST use the translation system**

### Page Translation Setup

```astro
---
// REQUIRED: Import necessary types and functions
import IntlBaseLayout from "@/layouts/IntlBaseLayout.astro";
import { getPageTranslations } from "@/i18n/i18n";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

// REQUIRED: Generate static paths for all supported locales
export async function getStaticPaths() {
  return locales.map((locale) => ({
    params: { locale },
  }));
}

// REQUIRED: Get locale from dynamic route params
// IntlBaseLayout will handle validation and redirect if needed
const { locale } = Astro.params;

// Get the translation function for this page
const { t } = await getPageTranslations(locale as Locale, ["common", "ui"]);
---

<IntlBaseLayout
  locale={locale}
  pageNS={["common", "ui"]}
  title={t("site.title", "Fallback Title")}
>
  <!-- Page content -->
</IntlBaseLayout>
```

### React Component Translation

```tsx
// REQUIRED: Use useTranslation hook in React components
import { useTranslation } from "@/hooks/useTranslation";

function MyComponent({ locale = "en" }) {
  const { t, isLoading } = useTranslation(locale, ["common", "ui"]);

  if (isLoading) return <Loading />;

  return <h1>{t("welcome.title", "Welcome {name}", { name: "User" })}</h1>;
}
```

### Translation File Structure

- **Location**: `src/i18n/messages/{locale}/{namespace}.json`
- **Naming**: Use nested keys: `"site.title"`, `"buttons.submit"`
- **Variables**: Use single braces: `"Welcome {name}"`
- **Fallbacks**: Always provide English fallback in code

### Page Creation Rules

- **MUST**: Create pages using dynamic routes: `src/pages/[locale]/page.astro`
- **MUST**: Implement `getStaticPaths()` to define all supported locale paths
- **MUST**: Get locale from `Astro.params` and pass to `IntlBaseLayout`
- **MUST**: Let `IntlBaseLayout` handle locale validation and redirects
- **MUST**: Create equivalent page structure for EACH supported locale via dynamic routing
- **Example**:
  - `src/pages/[locale]/index.astro` (handles /en, /nl, etc.)
  - `src/pages/[locale]/about.astro` (handles /en/about, /nl/about, etc.)

## 🧩 Component Development Guidelines

### Framework Choice Decision Tree

```
Is it a simple, static component? → Use Astro
├─ Does it need client-side state? → Use React
├─ Does it need event handlers? → Use React
├─ Is it just markup + styles? → Use Astro
└─ Complex forms/interactions? → Use React + custom hooks
```

### Component Creation Rules

1. **ALWAYS** create reusable components for repeated logic
2. **PREFER** Astro components over React when possible
3. **PLACE** components in `src/components/` folder
4. **USE** TypeScript interfaces for all props
5. **EXTRACT** custom hooks for complex React logic
6. **USE** `lucide` for icons in Astro components, `lucide-react` for React components

### Markdown Content Styling Rules

- **MUST**: Wrap markdown content with `prose.astro` component for proper styling
- **USE CASE**: Blog posts, documentation, articles, or any `.md` file content
- **PURPOSE**: Overrides default markdown styles with consistent design system
- **LOCATION**: `src/components/ui/prose.astro`

```astro
---
// GOOD: Wrapping markdown content with prose component
import Prose from "@/components/ui/prose.astro";
---

<Prose>
  <!-- Markdown content goes here -->
  <Content />
</Prose>

<!-- GOOD: For blog posts -->
<Prose>
  <article>
    <h1>{frontmatter.title}</h1>
    <Content />
  </article>
</Prose>

<!-- BAD: Raw markdown without prose wrapper -->
<Content />
```

### Astro Component Best Practices

```astro
---
// REQUIRED: TypeScript interface for props
export interface Props {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isVisible?: boolean;
  class?: string;
}

// REQUIRED: Destructure with defaults
const {
  title,
  variant = 'primary',
  isVisible = true,
  class: className = ''
} = Astro.props;
---

<!-- GOOD: Use semantic HTML -->
<article
  class={`card card--${variant} ${className}`}
  data-visible={isVisible}
>
  <h2 class="card-title">{title}</h2>
  <slot />
</article>

<style>
  /* GOOD: Component-scoped styles without @apply */
  .card {
    border-radius: 0.5rem;
    border: 1px solid rgb(var(--color-border));
    background-color: rgb(var(--color-card));
    color: rgb(var(--color-card-foreground));
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
</style>
```

### React Component Patterns

```tsx
// REQUIRED: Proper TypeScript interfaces
interface ComponentProps {
  locale?: string;
  className?: string;
}

// GOOD: Import existing hooks from hooks folder
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useTranslation } from "@/hooks/useTranslation";

// GOOD: Clean component using existing hooks
export default function ContactForm({ locale = "en" }: ComponentProps) {
  const { t } = useTranslation(locale, ["common", "forms"]);
  const { submit, isSubmitting } = useFormSubmission();

  return <form onSubmit={submit}>{/* Form content */}</form>;
}
```

## 🎯 Icon Usage Guidelines

### Icon Framework Rules

- **Astro Components**: Use `lucide` package (static SVG icons)
- **React Components**: Use `lucide-react` package (React icon components)
- **Consistent Icon Set**: ONLY use Lucide icons for visual consistency

### Astro Icon Implementation

```astro
---
// GOOD: Import from lucide for Astro components
import { Menu, X, ChevronDown } from 'lucide';

export interface Props {
  icon: 'menu' | 'close' | 'chevron-down';
  size?: number;
  class?: string;
}

const { icon, size = 24, class: className = '' } = Astro.props;

const iconMap = {
  'menu': Menu,
  'close': X,
  'chevron-down': ChevronDown
};

const IconComponent = iconMap[icon];
---

<!-- GOOD: Use lucide icon component -->
<IconComponent size={size} class={className} />
```

### React Icon Implementation

```tsx
// GOOD: Import from lucide-react for React components
import { Menu, X, ChevronDown, type LucideIcon } from "lucide-react";

interface IconProps {
  icon: "menu" | "close" | "chevron-down";
  size?: number;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  menu: Menu,
  close: X,
  "chevron-down": ChevronDown,
};

export function Icon({ icon, size = 24, className = "" }: IconProps) {
  const IconComponent = iconMap[icon];
  return <IconComponent size={size} className={className} />;
}
```

### Icon Best Practices

- **ALWAYS** use Lucide icons for consistency
- **CREATE** icon map objects for reusable icon components
- **USE** semantic icon names: `'menu'`, `'close'`, `'chevron-down'`
- **PROVIDE** size and className props for flexibility
- **MAINTAIN** TypeScript types for icon names

## 🎨 Styling Guidelines

### Tailwind CSS Rules

- **❌ NEVER** use `@apply` directives (bad for debugging and performance)
- **✅ ALWAYS** use utility classes directly in HTML
- **✅ USE** semantic component classes: `btn-primary`, `card`, `input`, etc.
- **✅ USE** `cn()` utility (clsx + tailwind-merge) for safe class merging
- **✅ MAINTAIN** dark-mode support via CSS variables and component classes
- **✅ USE** `:global()` selector in Astro components for theme classes: `:global(.dark) .my-component {}`
- **✅ USE** `text-justify` for long text blocks (paragraphs, articles, descriptions)

### Theming System

```css
/* REQUIRED: Use CSS variables for theming */
:root {
  --color-primary: 220 90% 56%;
  --color-background: 0 0% 100%;
  --color-foreground: 240 10% 3.9%;
}

.dark {
  --color-primary: 217 91% 60%;
  --color-background: 240 10% 3.9%;
  --color-foreground: 0 0% 98%;
}
```

### Theme Switcher Configuration

- **MUST**: Use a unique generated theme key for localStorage persistence
- **PURPOSE**: Prevents conflicts with other applications using the same localStorage
- **LOCATION**: Define in `src/config/variables.ts` or similar configuration file
- **FORMAT**: Use a unique identifier like `'mega-template-theme'` or generate with project prefix

```typescript
// GOOD: Unique theme key in config
export const THEME_STORAGE_KEY = "mega-template-theme-v1";

// GOOD: Project-specific theme key
export const THEME_STORAGE_KEY = "your-project-name-theme";

// BAD: Generic theme key (potential conflicts)
export const THEME_STORAGE_KEY = "theme";
export const THEME_STORAGE_KEY = "darkMode";
```

### Astro Component Theming Rules

```astro
<style>
  /* REQUIRED: Use :global() for theme selectors in Astro components */
  .hero-section {
    background-color: rgb(var(--color-background));
    color: rgb(var(--color-foreground));
  }

  /* GOOD: Theme-specific overrides using :global() */
  :global(.dark) .hero-section {
    background-color: rgb(var(--color-dark-background));
    border-color: rgb(var(--color-dark-border));
  }

  /* GOOD: Multiple theme states */
  :global(.light) .hero-section {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  :global(.dark) .hero-section {
    box-shadow: 0 1px 3px rgba(255, 255, 255, 0.05);
  }
</style>
```

```astro
<!-- GOOD: Using semantic component classes -->
<div class="container-wide py-16">
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">Welcome</h1>
      <p class="card-description text-justify">This is a longer description that benefits from justified text alignment for better readability across multiple lines of content.</p>
    </div>
    <div class="card-content">
      <p class="text-justify mb-4">{t('content.longDescription', 'Long paragraph content that should be justified for optimal reading experience when spanning multiple lines.')}</p>
      <button class="btn btn-primary">Primary Action</button>
      <button class="btn btn-secondary">Secondary Action</button>
      <input class="input" placeholder="Enter text" />
    </div>
  </div>
</div>
```

## 🔌 API and Services

### Service Creation Rules

- **CREATE** separate service per business logic unit (e.g., `CustomerService`, `EmailService`)
- **USE** `FetchService` as wrapper over native fetch
- **PLACE** services in `src/services/` or `src/utils/` folder
- **IMPLEMENT** proper error handling and TypeScript types

```typescript
// EXAMPLE: Service pattern
class CustomerService {
  private fetchService = new FetchService();

  async getCustomers(): Promise<Customer[]> {
    return this.fetchService.get<Customer[]>("/api/customers");
  }
}
```

## 🔍 SEO Guidelines

### SEO Package Requirements

- **MUST**: Use `astro-seo` package for comprehensive SEO management
- **INSTALL**: `npm install astro-seo`
- **LOCATION**: Import and configure in page layouts or individual pages
- **PURPOSE**: Provides structured meta tags, Open Graph, Twitter Cards, and JSON-LD

### SEO Implementation in Layouts

```astro
---
// REQUIRED: Import astro-seo in layouts
import { SEO } from "astro-seo";

// SEO props interface
interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
}
---

<SEO
  title={title}
  description={description}
  canonical={canonical}
  noindex={noindex}
  nofollow={nofollow}
  openGraph={{
    basic: {
      title: openGraph?.title || title,
      type: openGraph?.type || "website",
      image: openGraph?.image || "/og-default.jpg",
      url: openGraph?.url || canonical,
    },
    optional: {
      description: openGraph?.description || description,
      siteName: "Your Site Name",
    },
  }}
  twitter={{
    card: twitter?.card || "summary_large_image",
    site: twitter?.site || "@yoursite",
    creator: twitter?.creator || "@yourcreator",
  }}
  extend={{
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "generator", content: Astro.generator },
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "sitemap", href: "/sitemap-index.xml" },
    ],
  }}
/>
```

### Page-Level SEO Configuration

```astro
---
// GOOD: Page-specific SEO configuration
import IntlBaseLayout from "@/layouts/IntlBaseLayout.astro";
import { getPageTranslations } from "@/i18n/i18n";

const { locale } = Astro.params;
const { t } = await getPageTranslations(locale, ["common", "seo"]);

// SEO data for this page
const seoData = {
  title: t("page.title", "Default Page Title"),
  description: t("page.description", "Default page description for SEO"),
  canonical: `${Astro.site}${locale}/about`,
  openGraph: {
    title: t("page.ogTitle", "Open Graph Title"),
    description: t("page.ogDescription", "Open Graph Description"),
    image: "/images/about-og.jpg",
    type: "article",
  },
};
---

<IntlBaseLayout
  locale={locale}
  pageNS={["common", "seo"]}
  seoData={seoData}
>
  <!-- Page content -->
</IntlBaseLayout>
```

### Site-Wide SEO Configuration

```json
// REQUIRED: Configure src/config/siteData.json for default SEO values
{
  "default": {
    "name": "Mega Template",
    "title": "Mega Template - Modern Astro + React Starter",
    "description": "A powerful, production-ready template built with Astro v5, React v19, TypeScript, Tailwind CSS, and comprehensive i18n support. Perfect for building fast, accessible, and SEO-optimized websites.",
    "openGraph": {
      "title": "Mega Template - Modern Astro + React Starter",
      "description": "Build lightning-fast websites with our comprehensive Astro template featuring React integration, TypeScript, Tailwind CSS, and built-in internationalization support.",
      "type": "website",
      "url": "https://mega-template.dev",
      "image": "/images/og-image.jpg"
    },
    "twitter": {
      "title": "Mega Template - Modern Astro + React Starter 🚀",
      "description": "⚡ Lightning-fast Astro template with React, TypeScript & Tailwind CSS. Built for modern web development with i18n support out of the box.",
      "creator": "@megatemplate"
    }
  }
}
```

```astro
---
// GOOD: Using siteData defaults in layouts
import SiteData from "@/config/siteData.json";
import { SEO } from "astro-seo";

// Fallback to siteData when page-specific SEO not provided
<SEO
  title={seo?.title || SiteData.default.title}
  description={seo?.description ?? SiteData.default.description}
  openGraph={seo?.openGraph ?? SiteData.default.openGraph}
  twitter={seo?.twitter ?? SiteData.default.twitter}
/>
---
```

### Sitemap Configuration

```javascript
// REQUIRED: Configure sitemap in astro.config.mjs for international sites
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mega-template.dev", // REQUIRED for sitemap generation
  integrations: [
    sitemap({
      // i18n configuration for multi-locale sites
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          nl: "nl",
        },
      },
      // Filter out pages you don't want in sitemap
      filter: (page) => {
        return !page.includes("/test/") && !page.includes("/draft/");
      },
      // Customize sitemap entries
      serialize: (item) => {
        item.lastmod = new Date().toISOString();

        // Set priority based on page type
        if (item.url.includes("/blog/")) {
          item.priority = 0.8;
        } else if (item.url.endsWith("/")) {
          item.priority = item.url === "https://mega-template.dev/" ? 1.0 : 0.9;
        }

        return item;
      },
```

```javascript
// REQUIRED: Configure sitemap and robots.txt in astro.config.mjs
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  site: "https://mega-template.dev", // REQUIRED for sitemap generation
  integrations: [
    sitemap({
      // i18n configuration for multi-locale sites
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", nl: "nl" },
      },
      // Filter out unwanted pages
      filter: (page) => {
        return !page.includes("/test/") && !page.includes("/draft/");
      },
      // Customize sitemap entries
      serialize: (item) => {
        item.lastmod = new Date().toISOString();

        // Set priority based on page type
        if (item.url.includes("/blog/")) {
          item.priority = 0.8;
        } else if (item.url.endsWith("/")) {
          item.priority = item.url === "https://mega-template.dev/" ? 1.0 : 0.9;
        }

        return item;
      },
    }),
    robotsTxt({
      // GOOD: Automated robots.txt generation
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/*.json$", "/src/", "/.env", "/node_modules/"],
        },
      ],
      sitemap: true, // Automatically includes sitemap reference
    }),
  ],
});
```

```txt
# Generated robots.txt (automatic via astro-robots-txt)
User-agent: *
Disallow: /api/
Disallow: /*.json$
Disallow: /src/
Disallow: /.env
Disallow: /node_modules/
Allow: /
Sitemap: https://mega-template.dev/sitemap-index.xml
```

```astro
---
// GOOD: Reference sitemap in layout head
<link rel="sitemap" href="/sitemap-index.xml" />
---
```

### SEO Best Practices

- **ALWAYS** provide unique titles and descriptions for each page
- **USE** translated SEO content for internationalized sites
- **INCLUDE** relevant Open Graph images (minimum 1200x630px)
- **SET** appropriate canonical URLs to prevent duplicate content
- **ADD** structured data (JSON-LD) for rich snippets when applicable
- **MAINTAIN** consistent site name and branding across meta tags
- **VALIDATE** meta tags using tools like Facebook Debugger and Twitter Card Validator

### SEO Translation Structure

```json
// src/i18n/messages/en/seo.json
{
  "home": {
    "title": "Home - Your Site Name",
    "description": "Welcome to our site. Discover amazing content and services.",
    "ogTitle": "Your Site Name - Home",
    "ogDescription": "The best place for amazing content and services."
  },
  "about": {
    "title": "About Us - Your Site Name",
    "description": "Learn more about our company, mission, and team.",
    "ogTitle": "About Our Company",
    "ogDescription": "Discover our story, mission, and the team behind our success."
  }
}
```

### Structured Data (JSON-LD) Examples

```astro
---
// GOOD: Adding structured data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": Astro.site?.href,
  "logo": `${Astro.site?.href}logo.png`,
  "description": t("seo.organization.description", "Company description"),
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  }
};
---

<SEO
  title={title}
  description={description}
  extend={{
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(organizationSchema),
      },
    ],
  }}
/>
```

## 📧 Contact Form Integration

### Web3Forms Setup

When implementing contact forms:

1. **MUST** ask user to get API key from: https://web3forms.com/platforms/react-contact-form
2. **MUST** use user's own email address for registration
3. **MUST** add API key to `.env` file as `PUBLIC_EMAIL_ACCESS_API_KEY=your_api_key_here`
4. **MUST** store API key in environment variables
5. **USE** `useFormSubmission` hook for form handling

### Environment Setup

```bash
# .env file - REQUIRED for contact forms
PUBLIC_EMAIL_ACCESS_API_KEY=your_web3forms_api_key_here
```

```tsx
// REQUIRED: Contact form pattern
const { submit } = useFormSubmission();

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  formData.append("access_key", import.meta.env.PUBLIC_EMAIL_ACCESS_API_KEY);
  await submit(formData);
};
```

### Contact Form Checklist

- [ ] User has registered at web3forms.com with their email
- [ ] API key is added to `.env` file
- [ ] Environment variable is properly referenced in code
- [ ] Form includes access_key in FormData
- [ ] Form validation is implemented
- [ ] Success/error states are handled

## 🔄 Refactoring Guidelines

### Step-by-Step Process

1. **Identify Duplication**: Look for repeated HTML structures, CSS classes, or logic
2. **Extract Incrementally**: Start with simple components, gradually extract complex patterns
3. **Parameterize Differences**: Use props to handle variations between similar components
4. **Add Documentation**: Include JSDoc comments for prop types and usage examples
5. **Test Thoroughly**: Ensure extracted components work in all previous contexts

### Code Quality Checklist

- [ ] Component has TypeScript interface for props
- [ ] Proper fallbacks for translations
- [ ] Reusable and parameterized design
- [ ] Follows naming conventions
- [ ] Uses appropriate framework (Astro vs React)
- [ ] Implements proper error handling
- [ ] Has clean, readable code structure

## 🚨 Common Anti-Patterns to Avoid

### ❌ DON'T

```astro
<!-- BAD: Using @apply -->
<style>
  .my-button {
    @apply bg-blue-500 text-white px-4 py-2;
  }
</style>

<!-- BAD: Missing TypeScript -->
const { title, color } = Astro.props;

<!-- BAD: Hard-coded text WITHOUT translation -->
<h1>Welcome to our site</h1>
<button>Submit</button>
<p>Please enter your email address</p>

<!-- BAD: Missing locale structure -->
<Layout>
  <h1>{t('title')}</h1>
</Layout>

<!-- BAD: Text in attributes without translation -->
<input placeholder="Enter your name" />
<img alt="Company logo" />

<!-- BAD: Using different icon libraries -->
<i class="fas fa-menu"></i>
<SomeOtherIcon name="close" />

<!-- BAD: Raw markdown content without prose wrapper -->
<Content />
<div>{markdownContent}</div>

<!-- BAD: Missing or poor SEO configuration -->
<title>Page</title>
<meta name="description" content="A page" />
<!-- No Open Graph, no structured data -->
```

### ✅ DO

```astro
<!-- GOOD: Semantic component classes -->
<button class="btn btn-primary">
  {t('buttons.submit', 'Submit')}
</button>

<!-- GOOD: Using component class system -->
<div class="card">
  <div class="card-header">
    <h2 class="card-title">{t('welcome.title', 'Welcome')}</h2>
  </div>
  <div class="card-content">
    <input class="input" placeholder={t('forms.email', 'Email')} />
  </div>
</div>

<!-- GOOD: ALL text with translations and fallbacks -->
<h1>{t('site.title', 'Default Title')}</h1>
<button>{t('buttons.submit', 'Submit')}</button>
<p>{t('forms.emailInstruction', 'Please enter your email address')}</p>

<!-- GOOD: Proper TypeScript -->
export interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

<!-- GOOD: Proper i18n setup -->
<IntlBaseLayout locale={locale} pageNS={["common"]}>
  <h1>{t('site.title', 'Default Title')}</h1>
</IntlBaseLayout>

<!-- GOOD: Translated attributes -->
<input placeholder={t('forms.namePlaceholder', 'Enter your name')} />
<img alt={t('images.logoAlt', 'Company logo')} />

<!-- GOOD: Using Lucide icons consistently -->
<Menu size={24} class="menu-icon" />
<Icon icon="close" size={20} className="close-btn" />

<!-- GOOD: Markdown content wrapped with prose component -->
<Prose>
  <Content />
</Prose>

<!-- GOOD: Blog post with proper prose styling -->
<Prose>
  <article>
    <h1>{frontmatter.title}</h1>
    <Content />
  </article>
</Prose>

<!-- GOOD: Comprehensive SEO with astro-seo -->
<SEO
  title={t("page.title", "Default Title")}
  description={t("page.description", "Default description")}
  canonical={canonicalUrl}
  openGraph={{
    basic: {
      title: title,
      type: "website",
      image: ogImage,
      url: canonicalUrl,
    },
    optional: {
      description: description,
      siteName: "Site Name",
    },
  }}
  twitter={{
    card: "summary_large_image",
    site: "@yoursite",
  }}
/>
```

## ✅ SEO & Accessibility Checklist

### 🖼️ Images & Media

- ✅ **USE** `<Image>` or `<Picture>` components from `astro:assets`
- ✅ **PROVIDE** meaningful alt text via translation: `alt={t("images.hero", "Hero description")}`
- ✅ **OPTIMIZE** for modern formats (WebP, AVIF) with fallbacks
- ✅ **SET** proper dimensions and aspect ratios
- ❌ **NEVER** use plain `<img>` tags for content images
- ❌ **NEVER** leave alt attributes empty unless decorative (`alt=""` + `aria-hidden="true"`)

### 🏗️ Semantic HTML

- ✅ **USE** proper semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- ✅ **MAINTAIN** proper heading hierarchy: h1 → h2 → h3 (no skipping)
- ✅ **USE** `<button>` for actions, `<a>` for navigation
- ✅ **PROVIDE** `aria-label` for buttons without text content
- ❌ **NEVER** use `<div>` with click handlers instead of `<button>`
- ❌ **NEVER** use headings purely for styling
- ❌ **NEVER** use generic containers where semantic elements exist

### 📝 Forms & Inputs

- ✅ **ASSOCIATE** labels with inputs: `<label for="email">` + `<input id="email">`
- ✅ **USE** `aria-label` when visual labels aren't present
- ✅ **PROVIDE** `aria-describedby` for help text and errors
- ✅ **MARK** required fields with `required` attribute
- ✅ **INDICATE** errors with `aria-invalid="true"` and `role="alert"`
- ❌ **NEVER** have unlabeled inputs (no label OR aria-label)
- ❌ **NEVER** use placeholder as the only label

### 🎯 Interactive Elements

- ✅ **USE** `<button type="button">` for JavaScript actions
- ✅ **USE** `<button type="submit">` for form submissions
- ✅ **USE** `<a href="">` for navigation and external links
- ✅ **PROVIDE** clear focus indicators (`:focus-visible`)
- ✅ **ENSURE** adequate contrast ratios (4.5:1 minimum)
- ❌ **NEVER** make non-interactive elements clickable with JavaScript
- ❌ **NEVER** remove focus indicators without providing alternatives

### 🗣️ ARIA & Screen Readers

- ✅ **USE** `aria-label` for buttons with only icons
- ✅ **USE** `aria-labelledby` to reference heading IDs
- ✅ **USE** `aria-describedby` for additional descriptions
- ✅ **USE** `role="list"` when removing list styling affects semantics
- ✅ **USE** `aria-current="page"` for current navigation items
- ✅ **USE** `aria-hidden="true"` for decorative icons
- ❌ **NEVER** use ARIA to fix poor HTML structure
- ❌ **NEVER** override semantic meaning unnecessarily

### 📄 Page Structure

- ✅ **INCLUDE** unique `<title>` for each page
- ✅ **PROVIDE** meta description (150-160 characters)
- ✅ **SET** proper `lang` attribute on `<html>`
- ✅ **USE** one `<h1>` per page
- ✅ **INCLUDE** skip links for keyboard navigation
- ✅ **PROVIDE** breadcrumb navigation where appropriate
- ❌ **NEVER** have duplicate page titles
- ❌ **NEVER** have missing or empty meta descriptions

## 📋 Development Workflow

1. **Always** check existing components before creating new ones
2. **Always** use TypeScript interfaces and proper types
3. **Always** implement i18n support from the start
4. **NEVER** use raw text without translation - ALL user-facing text MUST use t() function
5. **Always** test in both light and dark themes
6. **Always** create responsive designs (mobile-first)
7. **Always** follow the established folder structure
8. **Always** use semantic HTML with proper accessibility (buttons, links, headings, ARIA)
9. **Always** optimize images with `<Image>` or `<Picture>` components from `astro:assets`
10. **Always** provide meaningful alt text and labels for all interactive elements
11. **Always** provide English fallbacks in t() function calls
12. **Always** use Lucide icons: `lucide` for Astro, `lucide-react` for React components
13. **Always** implement proper SEO with astro-seo package for meta tags and Open Graph
14. **Always** test keyboard navigation and screen reader compatibility

---

> **AI Note**: These rules should be followed strictly. When in doubt, prefer Astro over React, always implement i18n support, use semantic HTML with proper accessibility, optimize images with astro:assets, and maintain the established patterns and structure. Every page must be accessible, SEO-optimized, and properly internationalized.
