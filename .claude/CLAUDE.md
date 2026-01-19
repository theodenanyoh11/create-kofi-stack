# Project Rules for create-kofi-stack

## Version Management

**CRITICAL**: When making changes to templates or core functionality:

1. **Always update the VERSION in `scripts/publish.mjs`** before publishing
2. **The publish script automatically syncs versions** for:
   - All package.json `version` fields
   - All `kofi-stack-*` dependencies (template-generator, types)
   - All `workspace:*` dependencies

3. **Never hardcode old versions** in package.json dependencies for internal packages
   - The CLI must always use the latest template-generator
   - The template-generator must always use the latest types

## Publishing Workflow

1. Make your changes to templates/code
2. Bump VERSION in `scripts/publish.mjs`
3. Run `node scripts/publish.mjs` to build and publish all packages
4. Commit and push changes to GitHub

## Template Structure

The marketing/payload templates use the **DirectoryHub** structure:
- Blocks: FeatureGrid, BentoFeatures, FAQAccordion, etc. (NOT the old Features.ts)
- Seed: Uses `seedDirectoryHub` from `seed/directoryhub/`
- All icon options must be consistent between block configs and seed data
