## Realtor App

Modern real estate app built with Next.js App Router, TypeScript, and Tailwind CSS. Includes unit tests for hooks, services, and major components using Jest + Testing Library.

### Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
- Jest + Testing Library (jsdom environment)

### Requirements
- Node.js 18+
- npm (or any compatible package manager)

### Installation
```bash
npm install
```

### Available Scripts
- `npm run dev`: Start the development server
- `npm run build`: Build the application
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npm test`: Run all tests once
- `npm run test:watch`: Run tests in watch mode

### Testing
The project uses Jest with jsdom and Testing Library.

- Config files:
  - `jest.config.mjs`
  - `jest.setup.ts`
- Test locations: `__tests__/` with the following structure:
  - `__tests__/services/` unit tests for API service modules
  - `__tests__/hooks/` unit tests for custom React hooks
  - `__tests__/components/` unit tests for larger UI components

Run tests:
```bash
npm test
# or
npm run test:watch
```

Notes:
- Network calls are mocked using `global.fetch = jest.fn()` in tests.
- `console.error` is silenced in service tests via `jest.spyOn(console, 'error')` to keep the output clean.
- For hooks that debounce or delay work, tests use Jest fake timers.

### Project Structure (excerpt)
- `app/` Next.js App Router code
  - `components/` UI library
    - `organisms/` major components (grids, modals)
    - `molecules/`, `atoms/`
  - `hooks/` custom hooks (`useOwners`, `useProperties`)
  - `services/` API services (`owners.service.ts`, `properties.service.ts`)
  - `api/` Next.js route handlers
  - `types/` shared TypeScript interfaces
- `__tests__/` unit tests

### Conventions
- Use absolute imports with the `@/` alias.
- Keep components and hooks pure and unit-testable.
- Validate user input in forms and surface errors in the UI.

### Troubleshooting
- If npm cache permission errors occur on your machine, fix your local npm cache permissions and retry installation.
