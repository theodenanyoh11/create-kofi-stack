<p align="center">
  <br />
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/theodenanyoh11/create-kofi-stack/main/.github/assets/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/theodenanyoh11/create-kofi-stack/main/.github/assets/logo-light.svg">
    <img alt="create-kofi-stack" src="https://raw.githubusercontent.com/theodenanyoh11/create-kofi-stack/main/.github/assets/logo-light.svg" width="400">
  </picture>
  <br />
</p>

<h3 align="center">
  Scaffold opinionated full-stack projects with ease
</h3>

<p align="center">
  Next.js 16 + Convex + Better-Auth + shadcn/ui + Tailwind CSS v4
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-kofi-stack"><img src="https://img.shields.io/npm/v/create-kofi-stack.svg?style=flat&colorA=18181b&colorB=28cf8d" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/create-kofi-stack"><img src="https://img.shields.io/npm/dm/create-kofi-stack.svg?style=flat&colorA=18181b&colorB=28cf8d" alt="npm downloads" /></a>
  <a href="https://github.com/theodenanyoh11/create-kofi-stack/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/create-kofi-stack.svg?style=flat&colorA=18181b&colorB=28cf8d" alt="license" /></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#whats-included">What's Included</a> •
  <a href="#cli-options">CLI Options</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Philosophy

- **Opinionated but Flexible** — Sensible defaults with room to customize
- **Modern Stack** — Latest versions of Next.js 16, Tailwind v4, and shadcn/ui
- **Real-time First** — Convex for instant data sync out of the box
- **Production Ready** — Auth, testing, and linting pre-configured

## Quick Start

```bash
# Using pnpm (recommended)
pnpm create kofi-stack my-app

# Using npx
npx create-kofi-stack my-app

# Using bun
bunx create-kofi-stack my-app
```

Or with specific options:

```bash
npx create-kofi-stack my-app --monorepo --analytics posthog -y
```

## What's Included

### Always Included (Zero Config)

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org) with App Router & TypeScript |
| **Database** | [Convex](https://convex.dev) — Real-time database with Better-Auth integration |
| **Auth** | [Better-Auth](https://better-auth.com) — Email/password + OAuth providers |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (New York style) |
| **Linting** | [Biome](https://biomejs.dev) — Fast linting and formatting |
| **Testing** | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) |

### Optional Features

<details>
<summary><strong>Project Structure</strong></summary>

Choose between a simple single app or a full monorepo setup:

- **Standalone** — Simple, single Next.js application
- **Monorepo** — Turborepo with shared packages (`ui`, `backend`, `config`)

</details>

<details>
<summary><strong>Marketing Site</strong> (Monorepo only)</summary>

Add a marketing site to your monorepo:

- **Payload CMS** — Headless CMS for content management
- **Next.js** — Simple static/SSG marketing site

</details>

<details>
<summary><strong>Integrations</strong></summary>

| Category | Options |
|----------|---------|
| **Analytics** | PostHog, Vercel Analytics |
| **File Uploads** | UploadThing, AWS S3, Vercel Blob |
| **Rate Limiting** | Arcjet |
| **Error Monitoring** | Sentry |

</details>

## CLI Options

```bash
npx create-kofi-stack [project-name] [options]
```

| Option | Description |
|--------|-------------|
| `--monorepo` | Use monorepo structure with Turborepo |
| `--standalone` | Use single app structure (default) |
| `--marketing <type>` | Marketing site: `payload`, `nextjs`, `none` |
| `--analytics <provider>` | Analytics: `posthog`, `vercel`, `none` |
| `--uploads <provider>` | Uploads: `uploadthing`, `s3`, `vercel-blob`, `none` |
| `--rate-limiting` | Add Arcjet rate limiting |
| `--monitoring` | Add Sentry error monitoring |
| `-y, --yes` | Skip prompts, use defaults |

## Project Structure

<details>
<summary><strong>Standalone</strong></summary>

```
my-project/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Auth pages
│   │   ├── (dashboard)/  # Protected pages
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utilities
├── convex/               # Convex backend
├── components.json       # shadcn/ui config
└── package.json
```

</details>

<details>
<summary><strong>Monorepo</strong></summary>

```
my-project/
├── apps/
│   └── web/              # Main Next.js app
├── packages/
│   ├── ui/               # Shared UI components
│   ├── config-biome/     # Shared Biome config
│   └── config-typescript/# Shared TypeScript config
├── convex/               # Convex backend (shared)
├── turbo.json
└── pnpm-workspace.yaml
```

</details>

## Getting Started

After creating your project:

```bash
cd my-project
pnpm dev
```

This will automatically:
- Install dependencies (if needed)
- Guide you through Convex setup
- Start Next.js and Convex dev servers

## Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies** with `pnpm install`
3. **Create a branch** for your feature or fix

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-fix
```

### Development

```bash
# Build all packages
pnpm build

# Test locally
node packages/cli/dist/index.js my-test-project -y
```

### Guidelines

- **Code Style** — We use Biome for linting and formatting
- **Commits** — Write clear, concise commit messages
- **Documentation** — Update the README if changing CLI options

### Pull Requests

1. Make sure your code builds without errors (`pnpm build`)
2. Update documentation if needed
3. Open a PR with a clear description of your changes

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/theodenanyoh11/create-kofi-stack/issues/new) with:

- A clear title and description
- Steps to reproduce (for bugs)
- Your environment (OS, Node version, etc.)

## Documentation

- [Convex Docs](https://docs.convex.dev)
- [Better-Auth Docs](https://www.better-auth.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## License

MIT © [theodenanyoh](https://github.com/theodenanyoh11)
