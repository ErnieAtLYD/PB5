# Conventions for Next.js 14 Project with App Router

This document outlines the conventions to follow when developing with Next.js 14 and the App Router in this project. Adhering to these guidelines will help maintain consistency and improve collaboration among team members.

## Project Structure

```
/project-root
|-- /public           # Static files like images and icons
|-- /src              # Main source code
|   |-- /app          # App Router pages and layouts
|   |   |-- /api      # API routes
|   |-- /components   # Reusable React components
|   |-- /lib          # Utility functions and shared logic
|   |-- /hooks        # Custom hooks
|   |-- /styles       # Global styles
|   |-- /types        # TypeScript types and interfaces
|-- /tests            # End-to-end tests and other test configurations
|-- .env              # Environment variables
|-- next.config.mjs   # Next.js configuration
|-- package.json      # Project dependencies and scripts
|-- tsconfig.json     # TypeScript configuration
-- README.md          # Project overview and setup instructions
```

## App Router Conventions

### File and Folder Names

- Use `kebab-case` for route segment folders (e.g., `about-us`).
- Special files in the App Router:
  - `layout.tsx`: For shared layouts
  - `page.tsx`: For route components
  - `loading.tsx`: For loading UI
  - `error.tsx`: For error handling
  - `not-found.tsx`: For custom 404 pages

### Routing Structure

- Organize routes using nested folders in the `/app` directory.
- Use dynamic routes with square brackets (e.g., `[id]` for dynamic segments).
- Group related routes using route groups with parentheses (e.g., `(marketing)`).

Example:

```
/app
|-- layout.tsx
|-- page.tsx
|-- about
|   -- page.tsx
|-- blog
|   |-- layout.tsx
|   |-- page.tsx
|   |-- [slug]
|       -- page.tsx
|-- (dashboard)
    |-- layout.tsx
    |-- profile
    |   -- page.tsx
    |-- settings
        -- page.tsx
```

### Data Fetching

- Prefer Server Components for data fetching when possible.
- Use `async`/`await` in Server Components for data fetching:

```tsx
async function Page() {
  const data = await fetchData()
  return <main>{/* Use data */}</main>
}
```

- For client-side data fetching, use React Server Components with `use client` directive and SWR or React Query.

### Metadata

- Use the Metadata API for SEO optimization:

```tsx
export const metadata = {
  title: 'My Page',
  description: 'Description for my page',
}
```

## TypeScript Conventions

### Types and Interfaces

- Define types and interfaces in the `/src/types` directory.
- Use `interface` for objects and `type` for union types or function signatures.
- Prefer explicit typing over `any` and avoid using `unknown` unless necessary.

### Props and State

- Always type props and state in components:

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>
}
```

## Coding Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) or configure ESLint to enforce style.
- Use `const` and `let` instead of `var`.
- Prefer arrow functions for functional components.

## State Management

- Use React's built-in state and context for local state management.
- For more complex state, consider using libraries like Zustand or Jotai.

## API Routes

- Place API routes in the `/app/api` directory.
- Use Edge Runtime for API routes when possible for better performance:

```tsx
export const runtime = 'edge'

export async function GET(request: Request) {
  // Handle GET request
}
```

## Environment Variables

- Define environment variables in the `.env.local` file for local development.
- Use `NEXT_PUBLIC_` prefix for variables that need to be exposed to the browser.

## Testing

- Use Jest and React Testing Library for unit and integration tests.
- Place test files next to the components they test with a `.test.tsx` extension.

## Documentation

- Document complex components, hooks, and utilities with comments.
- Maintain a `README.md` with setup instructions and project details.

## Git Conventions

- Use meaningful commit messages, following the format: `type(scope): subject`.
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Branching Strategy

- Use `main` for production-ready code.
- Use feature branches prefixed with `feature/` for new features and `bugfix/` for bug fixes.

Remember to keep this document updated as new best practices emerge for Next.js and the App Router.
