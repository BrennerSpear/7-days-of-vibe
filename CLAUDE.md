# Development Standards

## Build & Development
- `npm run dev`: Start development server with Turbo
- `npm run build`: Build production-ready app
- `npm run preview`: Build and preview production app
- `npm run start`: Start production server

## Linting & Formatting
- `npm run lint`: Run Biome linter
- `npm run lint:fix`: Run Biome linter with auto-fix
- `npm run format:check`: Check formatting with Biome
- `npm run format:write`: Auto-format code with Biome
- `npm run typecheck`: Run TypeScript type check
- `npm run check`: Run both Biome check and typecheck

## Code Style
- TypeScript with strict typing, path aliases (`~/*` for `./src/*`)
- Biome for linting and formatting
- Type imports using inline style
- Unused variables prefixed with underscore

## Database (Prisma)
- `npm run db:generate`: Generate Prisma migrations
- `npm run db:migrate`: Deploy migrations
- `npm run db:push`: Push schema changes
- `npm run db:studio`: Open Prisma Studio

## Tech Stack
- T3 Stack: NextJS, Prisma, TailwindCSS, tRPC
- File extensions: .ts, .tsx, .js, .jsx, .mdx
- UI components in src/components with tailwind styling

# Files to not change
`biome.json`