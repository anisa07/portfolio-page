---
title: "Uitgebreide Test Strategieën met Cypress en Jest"
excerpt: "Een diepgaande duik in test methodologieën die unit tests met Jest combineert met E2E tests met Cypress."
date: "2024-01-02"
readTime: 6
category: "Testing"
image: "/blog/testing.jpg"
featured: false
author: "Anisa"
tags: ["Testing", "Cypress", "Jest", "E2E", "Unit Testing"]
---

# Uitgebreide Test Strategieën met Cypress en Jest

Testen wordt vaak over het hoofd gezien in de vroege stadia van ontwikkeling, maar het implementeren van een solide test strategie vanaf het begin kan ontelbare uren debugging besparen en kritieke bugs voorkomen die productie bereiken.

## De Test Piramide

Een goed gestructureerde test strategie volgt de test piramide:

1. **Unit Tests** (70%) - Snel, geïsoleerd, talrijk
2. **Integratie Tests** (20%) - Gemiddelde snelheid, test component interacties
3. **E2E Tests** (10%) - Langzaam, duur, maar test echte gebruiker scenario's

## Unit Testing met Jest

Jest blinkt uit in unit en integratie testing. Zo structureer ik mijn Jest tests:

### Basis Setup

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/test/**/*",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### React Componenten Testen

```typescript
// UserProfile.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  const mockUser = {
    id: "1",
    name: "Jan Jansen",
    email: "jan@example.com",
  };

  it("toont gebruikersinformatie correct", () => {
    render(<UserProfile user={mockUser} />);

    expect(screen.getByText("Jan Jansen")).toBeInTheDocument();
    expect(screen.getByText("jan@example.com")).toBeInTheDocument();
  });

  it("roept onEdit aan wanneer bewerk knop wordt geklikt", () => {
    const mockOnEdit = jest.fn();
    render(<UserProfile user={mockUser} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByRole("button", { name: /bewerk/i }));

    expect(mockOnEdit).toHaveBeenCalledWith(mockUser.id);
  });
});
```

### Custom Hooks Testen

```typescript
// useUserData.test.ts
import { renderHook, act } from "@testing-library/react";
import { useUserData } from "./useUserData";

describe("useUserData", () => {
  it("haalt gebruikersdata op en retourneert deze", async () => {
    const { result } = renderHook(() => useUserData("123"));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      // Wacht tot de hook klaar is
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toBeDefined();
  });
});
```

## E2E Testing met Cypress

Cypress is perfect voor het testen van gebruiker workflows en ervoor zorgen dat je applicatie werkt zoals verwacht vanuit een gebruiker perspectief.

### Cypress Configuratie

```typescript
// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implementeer node event listeners hier
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
```

### E2E Tests Schrijven

```typescript
// cypress/e2e/gebruiker-registratie.cy.ts
describe("Gebruiker Registratie Flow", () => {
  beforeEach(() => {
    cy.visit("/registreren");
  });

  it("registreert succesvol een nieuwe gebruiker", () => {
    // Vul het registratie formulier in
    cy.get('[data-testid="naam-input"]').type("Jan Jansen");
    cy.get('[data-testid="email-input"]').type("jan@example.com");
    cy.get('[data-testid="wachtwoord-input"]').type("veiligWachtwoord123");
    cy.get('[data-testid="bevestig-wachtwoord-input"]').type(
      "veiligWachtwoord123"
    );

    // Verstuur het formulier
    cy.get('[data-testid="verstuur-knop"]').click();

    // Verifieer succesvolle registratie
    cy.url().should("include", "/dashboard");
    cy.get('[data-testid="welkom-bericht"]').should(
      "contain",
      "Welkom, Jan Jansen"
    );
  });

  it("toont validatie fouten voor ongeldige input", () => {
    cy.get('[data-testid="verstuur-knop"]').click();

    cy.get('[data-testid="naam-fout"]').should("be.visible");
    cy.get('[data-testid="email-fout"]').should("be.visible");
    cy.get('[data-testid="wachtwoord-fout"]').should("be.visible");
  });
});
```

### Custom Cypress Commands

```typescript
// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, wachtwoord: string): Chainable<void>;
      createUser(userData: UserData): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string, wachtwoord: string) => {
  cy.session([email, wachtwoord], () => {
    cy.visit("/inloggen");
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="wachtwoord-input"]').type(wachtwoord);
    cy.get('[data-testid="inlog-knop"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

## API Endpoints Testen

Voor API testing combineer ik Jest met supertest:

```typescript
// api/users.test.ts
import request from "supertest";
import { app } from "../app";

describe("POST /api/users", () => {
  it("maakt succesvol een nieuwe gebruiker aan", async () => {
    const userData = {
      name: "Jan Jansen",
      email: "jan@example.com",
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: userData.name,
      email: userData.email,
      createdAt: expect.any(String),
    });
  });

  it("retourneert validatie fout voor ongeldig email", async () => {
    const userData = {
      name: "Jan Jansen",
      email: "ongeldig-email",
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .expect(400);

    expect(response.body.error).toContain("Ongeldig email formaat");
  });
});
```

## Best Practices

### 1. **Gebruik Data Test IDs**

Gebruik altijd `data-testid` attributen in plaats van te vertrouwen op class namen of tekst content.

### 2. **Mock Externe Afhankelijkheden**

Mock API calls, third-party services en andere externe afhankelijkheden in je unit tests.

### 3. **Test Gebruiker Gedrag, Niet Implementatie**

Focus op het testen van wat de gebruiker ziet en doet, niet interne implementatie details.

### 4. **Onderhoud Test Data**

Gebruik factories of fixtures om consistente test data te maken:

```typescript
// test/factories/userFactory.ts
export const createUser = (overrides = {}) => ({
  id: "1",
  name: "Jan Jansen",
  email: "jan@example.com",
  createdAt: new Date().toISOString(),
  ...overrides,
});
```

### 5. **Parallelle Test Uitvoering**

Configureer je CI/CD pipeline om tests parallel uit te voeren voor snellere feedback.

## Test Coverage Monitoring

```typescript
// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open"
  }
}
```

### Coverage Rapportage

```javascript
// jest.config.js - uitgebreide coverage configuratie
module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/test/**/*",
    "!src/stories/**/*",
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/components/": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
```

## Integratie met CI/CD

### GitHub Actions Voorbeeld

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v1
```

## Performance Testing

```typescript
// performance.test.ts
describe("Performance Tests", () => {
  it("laadt gebruiker lijst binnen 2 seconden", async () => {
    const startTime = Date.now();

    await renderWithProviders(<UserList />);
    await waitFor(() => screen.getByText("Gebruikers geladen"));

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    expect(loadTime).toBeLessThan(2000);
  });
});
```

## Conclusie

Een uitgebreide test strategie met Jest voor unit/integratie tests en Cypress voor E2E tests geeft vertrouwen in de betrouwbaarheid van je applicatie. Begin met de meest kritieke gebruiker paths en breid geleidelijk je test coverage uit.

Onthoud: goede tests zijn een investering in de toekomstige onderhoudbaarheid van je applicatie en de productiviteit van je team.

### Voordelen van Deze Aanpak

- **Snellere ontwikkeling** door vroege bug detectie
- **Betrouwbaardere releases** met geautomatiseerde tests
- **Betere code kwaliteit** door test-driven development
- **Verminderde debugging tijd** in productie
- **Verhoogde team vertrouwen** bij code wijzigingen

---

_Welke test uitdagingen heb jij ondervonden in je projecten? Hoe balanceer jij test coverage met ontwikkelingssnelheid?_
