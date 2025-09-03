---
title: "Moderne Webontwikkeling met Astro en React"
excerpt: "Ontdek hoe Astro's Islands Architecture de prestaties van je website revolutioneert door statische HTML te combineren met interactieve componenten."
date: "2024-01-15"
readTime: 5
category: "Webontwikkeling"
image: "/blog/astro-react.jpg"
featured: true
author: "Anisa"
tags: ["Astro", "React", "Performance", "SSG", "Islands Architecture"]
---

# Moderne Webontwikkeling met Astro en React

In het landschap van moderne webontwikkeling zoeken ontwikkelaars constant naar manieren om **prestaties** te verbeteren zonder de **ontwikkelaarservaring** op te offeren. Astro biedt een unieke benadering die het beste van beide werelden combineert.

## Wat is Astro?

Astro is een **statische site generator** die ontworpen is voor snelheid. Het genereert **zero-JavaScript** websites standaard, maar geeft je de flexibiliteit om interactiviteit toe te voegen waar nodig.

### Belangrijkste kenmerken:

- 🏝️ **Islands Architecture** - Hydrateer alleen wat interactief moet zijn
- 🚀 **Zero JS by default** - Stuur alleen JavaScript voor componenten die het nodig hebben
- 🔧 **Framework agnostic** - Gebruik React, Vue, Svelte, of gewoon HTML
- 📦 **Built-in optimalisaties** - Automatische code splitting en preloading

## Islands Architecture Uitgelegd

Het concept van Islands Architecture is eenvoudig maar krachtig:

```astro
---
// page.astro
import Header from '../components/Header.astro';
import InteractiveCart from '../components/Cart.tsx';
import Footer from '../components/Footer.astro';
---

<html>
  <body>
    <!-- Statische header - geen JavaScript -->
    <Header />

    <!-- Interactieve cart - alleen deze wordt gehydrateerd -->
    <InteractiveCart client:load />

    <!-- Statische footer - geen JavaScript -->
    <Footer />
  </body>
</html>
```

Alleen de `InteractiveCart` component krijgt JavaScript op de client, terwijl de rest van de pagina statische HTML blijft.

## Performance Voordelen

### Traditionele SPA vs Astro

```javascript
// Traditionele React app bundle grootte
- React Runtime: ~45kb
- Router: ~12kb
- State Management: ~8kb
- UI Library: ~25kb
- Your Code: ~50kb
// Totaal: ~140kb+ JavaScript

// Astro met selectieve hydratatie
- Basis pagina: 0kb JavaScript
- Alleen interactieve componenten: ~15kb
// Totaal: ~15kb JavaScript (90% reductie!)
```

## Astro Componenten vs React Componenten

### Astro Component (.astro)

```astro
---
// Server-side JavaScript
const greeting = "Hallo Wereld";
const items = await fetch('/api/items').then(r => r.json());
---

<!-- Template (wordt gerenderd naar statische HTML) -->
<div class="container">
  <h1>{greeting}</h1>
  <ul>
    {items.map(item => (
      <li>{item.name}</li>
    ))}
  </ul>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
```

### React Component (.tsx)

```tsx
// Draait op zowel server als client
import { useState, useEffect } from "react";

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Teller: {count}</p>
      <button onClick={() => setCount(count + 1)}>Verhoog</button>
    </div>
  );
}
```

## Client Directives

Astro geeft je precieze controle over wanneer componenten gehydrateerd worden:

```astro
<!-- Laad onmiddellijk -->
<Component client:load />

<!-- Laad wanneer zichtbaar -->
<Component client:visible />

<!-- Laad bij user interaction -->
<Component client:idle />

<!-- Laad op specifieke media query -->
<Component client:media="(max-width: 768px)" />

<!-- Laad alleen op de client -->
<Component client:only="react" />
```

## Integratie met Bestaande Tools

Astro werkt naadloos samen met je favoriete tools:

### Tailwind CSS

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [tailwind(), react()],
});
```

### TypeScript

```typescript
// src/components/BlogPost.astro
---
interface Props {
  title: string;
  publishDate: Date;
  author: string;
}

const { title, publishDate, author } = Astro.props;
---

<article>
  <h1>{title}</h1>
  <time>{publishDate.toLocaleDateString('nl-NL')}</time>
  <p>Door {author}</p>
</article>
```

## Content Collections

Organiseer je content met Astro's type-safe collections:

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<article>
  <h1>{entry.data.title}</h1>
  <Content />
</article>
```

## Deployment en Performance

Astro sites zijn geoptimaliseerd voor moderne hosting platforms:

```javascript
// Automatische optimalisaties:
- Image compression en resizing
- CSS en JS minification
- Automatische prefetching
- Service worker generatie (optioneel)
```

### Lighthouse Scores

Typische Astro site scores:

- **Performance**: 100/100
- **Accessibility**: 95+/100
- **Best Practices**: 100/100
- **SEO**: 100/100

## Wanneer Astro Gebruiken

✅ **Perfect voor:**

- Content-heavy websites (blogs, documentatie)
- Marketing sites
- E-commerce product pagina's
- Portfolio sites

❌ **Misschien niet ideaal voor:**

- Zeer interactieve dashboards
- Real-time applicaties
- Single Page Applications met complexe state

## Conclusie

Astro vertegenwoordigt een paradigmaverschuiving in webontwikkeling. Door **standaard statisch** te zijn en **selectief interactief** te worden, biedt het ongekende prestaties zonder de ontwikkelaarservaring op te offeren.

De combinatie van Astro met React geeft je het beste van beide werelden: de snelheid van statische sites en de kracht van moderne componenten wanneer je ze nodig hebt.

---

_Ben je klaar om je volgende project met Astro te bouwen? De toekomst van web performance begint hier._
