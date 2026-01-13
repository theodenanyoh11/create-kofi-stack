# create-kofi-stack

Scaffold opinionated full-stack projects with Next.js, Convex, Better-Auth, and shadcn/ui.

## Quick Start

```bash
npx create-kofi-stack@latest my-app
```

Or with options:

```bash
npx create-kofi-stack@latest my-app --monorepo -y
```

## Features

- **Next.js 16** with App Router and React 19
- **Convex** - Reactive backend-as-a-service
- **Better-Auth** - Authentication with Convex adapter
- **shadcn/ui** - Beautiful UI components (New York style)
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Full type safety
- **Biome** - Fast linter and formatter

## Project Structures

### Standalone

A single Next.js application with everything included.

```
my-app/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── convex/
└── package.json
```

### Monorepo

A Turborepo-powered monorepo with shared packages.

```
my-app/
├── apps/
│   └── web/          # Next.js application
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config-typescript/
│   └── config-biome/
├── convex/           # Backend functions
└── turbo.json
```

## CLI Options

| Option | Description |
|--------|-------------|
| `--monorepo` | Create a monorepo structure |
| `--standalone` | Create a standalone project (default) |
| `--marketing <type>` | Add marketing site: `nextjs` or `payload` |
| `--analytics <provider>` | Analytics: `posthog` or `vercel` |
| `--uploads <provider>` | File uploads: `uploadthing`, `s3`, or `vercel-blob` |
| `--rate-limiting` | Add Arcjet rate limiting |
| `--monitoring` | Add Sentry error monitoring |
| `-y, --yes` | Skip prompts, use defaults |

## After Creation

```bash
cd my-app
pnpm dev
```

This will:
1. Install dependencies (if needed)
2. Guide you through Convex setup
3. Start Next.js and Convex dev servers

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 |
| Backend | Convex |
| Auth | Better-Auth |
| UI | shadcn/ui |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Linting | Biome |
| Monorepo | Turborepo |

## Integrations

### Analytics
- **PostHog** - Product analytics and feature flags
- **Vercel Analytics** - Simple web analytics

### File Uploads
- **UploadThing** - Easy file uploads for Next.js
- **AWS S3** - S3-compatible object storage
- **Vercel Blob** - Edge-compatible blob storage

### Add-ons
- **Arcjet** - Rate limiting and bot protection
- **Sentry** - Error monitoring and performance

## Package Structure

This CLI is built as a monorepo with three packages:

- `create-kofi-stack` - The CLI tool
- `kofi-stack-template-generator` - Virtual filesystem and template engine
- `kofi-stack-types` - Shared TypeScript types and Zod schemas

## Development

```bash
# Clone the repo
git clone https://github.com/theodenanyoh11/create-kofi-stack.git
cd create-kofi-stack

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run the CLI locally
node packages/cli/dist/index.js my-test-app
```

## License

MIT
