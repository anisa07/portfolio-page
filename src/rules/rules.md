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
│   │   ├── ThemeToggle.tsx  # Theme switching component
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
│   ├── pages/               # File-based routing
│   │   ├── en/              # English pages
│   │   └── nl/              # Dutch pages (add more locales as needed)
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

### Page Translation Setup

```astro
---
// REQUIRED: Wrap all pages with IntlBaseLayout
import IntlBaseLayout from "@/layouts/IntlBaseLayout.astro";
import { getPageTranslations } from "@/i18n/i18n";

const locale = "en"; // or "nl", etc.
const { t } = await getPageTranslations(locale, ["common", "ui"]);
---

<IntlBaseLayout
  locale={locale}
  pageNS={["common", "ui"]}
  title={t("site.title", {}, "Fallback Title")}
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

  return <h1>{t("welcome.title", { name: "User" }, "Welcome")}</h1>;
}
```

### Translation File Structure

- **Location**: `src/i18n/messages/{locale}/{namespace}.json`
- **Naming**: Use nested keys: `"site.title"`, `"buttons.submit"`
- **Variables**: Use single braces: `"Welcome {name}"`
- **Fallbacks**: Always provide English fallback in code

### Page Creation Rules

- **MUST**: Create pages in `src/pages/{locale}/` subfolders
- **MUST**: Create equivalent page for EACH supported locale
- **Example**:
  - `src/pages/en/about.astro`
  - `src/pages/nl/about.astro`

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

## 🎨 Styling Guidelines

### Tailwind CSS Rules

- **❌ NEVER** use `@apply` directives (bad for debugging and performance)
- **✅ ALWAYS** use utility classes directly in HTML
- **✅ USE** semantic component classes: `btn-primary`, `card`, `input`, etc.
- **✅ USE** `cn()` utility (clsx + tailwind-merge) for safe class merging
- **✅ MAINTAIN** dark-mode support via CSS variables and component classes

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

```astro
<!-- GOOD: Using semantic component classes -->
<div class="container-wide py-16">
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">Welcome</h1>
      <p class="card-description">Description text</p>
    </div>
    <div class="card-content">
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

<!-- BAD: Hard-coded text -->
<h1>Welcome to our site</h1>

<!-- BAD: Missing locale structure -->
<Layout>
  <h1>{t('title')}</h1>
</Layout>
```

### ✅ DO

```astro
<!-- GOOD: Semantic component classes -->
<button class="btn btn-primary">
  {t('buttons.submit', {}, 'Submit')}
</button>

<!-- GOOD: Using component class system -->
<div class="card">
  <div class="card-header">
    <h2 class="card-title">{t('welcome.title', {}, 'Welcome')}</h2>
  </div>
  <div class="card-content">
    <input class="input" placeholder={t('forms.email', {}, 'Email')} />
  </div>
</div>

<!-- GOOD: Proper TypeScript -->
export interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

<!-- GOOD: Proper i18n setup -->
<IntlBaseLayout locale={locale} pageNS={["common"]}>
  <h1>{t('site.title', {}, 'Default Title')}</h1>
</IntlBaseLayout>
```

## 📋 Development Workflow

1. **Always** check existing components before creating new ones
2. **Always** use TypeScript interfaces and proper types
3. **Always** implement i18n support from the start
4. **Always** test in both light and dark themes
5. **Always** create responsive designs (mobile-first)
6. **Always** follow the established folder structure
7. **Always** use semantic HTML and proper accessibility

---

> **AI Note**: These rules should be followed strictly. When in doubt, prefer Astro over React, always implement i18n support, and maintain the established patterns and structure.
