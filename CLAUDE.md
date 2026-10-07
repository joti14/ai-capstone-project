# CLAUDE.md

Guidance for AI-assisted development in this repository.

## Project Context

- This is the capstone project for the **Frontend AI Engineering** track.
- The project is in the **early setup stage**. The tooling is set up, and the app currently contains only a placeholder `App` component and one test. No features have been built yet.

## Technology

- **React** (19) with **JavaScript** (`.jsx`, no TypeScript)
- **Vite**: build tool and dev server
- **Tailwind CSS** (v4), added through the `@tailwindcss/vite` plugin. There is no `tailwind.config.js`; Tailwind is loaded by `@import "tailwindcss";` in `src/index.css`.
- **Vitest** with **React Testing Library**, running in a **jsdom** environment

Do not assume any other frameworks, libraries, databases, or backend technologies. Only treat something as part of the stack once it has actually been added to the project.

## Project Structure

```
index.html          Vite entry HTML
vite.config.js      Vite plugins (React, Tailwind) and Vitest config
package.json        Dependencies and npm scripts
src/
  main.jsx          Mounts <App /> into #root
  index.css         Tailwind import
  App.jsx           Root component (placeholder)
  App.test.jsx      Test for App
```

## Commands

- `npm install`: install dependencies
- `npm run dev`: start the Vite dev server
- `npm run build`: production build to `dist/`
- `npm run preview`: serve the production build locally
- `npm test`: run Vitest in watch mode
- `npm run test:run`: run all tests once (use this to verify changes)

## Testing Conventions

- Put test files next to the code they test, named `*.test.jsx`.
- Vitest globals are not enabled: import `describe`, `it`, `expect`, and `afterEach` from `vitest`, and call `afterEach(cleanup)` in files that render components.
- `@testing-library/jest-dom` is not installed, so matchers like `toBeInTheDocument()` are not available. Use the built-in Vitest matchers instead (for example, `getByRole` throws if the element is missing).
- Prefer accessible queries such as `getByRole` and `getByLabelText`.

## Code Conventions

- Write clear, readable JavaScript.
- Use functional React components.
- Extract reusable components where it makes sense, but don't abstract early.
- Use meaningful names for components, functions, and variables.
- Avoid unnecessary dependencies and complexity.

## Styling Conventions

- Use Tailwind CSS for styling.
- Keep the UI responsive across screen sizes.
- Keep the UI accessible: use semantic HTML, label form controls, support keyboard navigation, and keep color contrast sufficient.

## AI-Assisted Development Rules

- Before making significant changes, explain what will change and why.
- Do not modify files unrelated to the current task.
- Do not add a dependency without explaining why it is needed.
- Preserve existing functionality when modifying code.
- When there are several reasonable approaches, briefly explain the trade-offs.
- Prefer simple solutions that fit the project's current stage.

## Git Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/) (for example `feat:`, `fix:`, `docs:`, `chore:`).
- Keep each commit focused on one change, with a descriptive message.
- Do not create commits unless explicitly asked.
