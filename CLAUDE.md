# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for the AI Beauty Salon Promotion Association (一般社団法人AIビューティーサロン推進協会), built with Next.js 15.3.3 and TypeScript. The site provides AI-powered business support services for beauty salons.

## Development Commands

**Start Development:**
```bash
npm run dev  # Starts dev server with Turbopack at http://localhost:3000
```

**Build & Production:**
```bash
npm run build  # Production build
npm run start  # Start production server
```

**Code Quality & Testing:**
```bash
npm run lint      # ESLint code checking
npm run test      # Jest unit tests
npm run test:watch  # Jest in watch mode
npm run test:e2e  # Playwright E2E tests
```

**Always run after making changes:** `npm run lint` and `npm run test` before considering work complete.

**Run specific tests:**
```bash
npm run test -- --testNamePattern="specific test name"  # Run specific test
npm run test -- --watch --testPathPattern="component.test.tsx"  # Watch specific file
```

## Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Email**: Resend + React Email
- **Testing**: Jest + Testing Library, Playwright for E2E

## Architecture

```
src/
├── app/                 # Next.js App Router pages
│   ├── contact/        # Contact form with server actions
│   ├── special-plan/   # Password-protected section
│   └── [other-pages]/
├── components/
│   ├── ui/             # shadcn/ui base components  
│   ├── layout/         # Header, Footer
│   ├── home/           # Homepage sections
│   └── common/         # Shared components
├── lib/                # Utilities, data, hooks
└── middleware.ts       # Auth middleware
```

## Key Patterns

**Component Structure:**
- Functional components with TypeScript interfaces
- PascalCase file naming (`ComponentName.tsx`)
- Feature-based organization (e.g., `home/`, `apps/`)
- UI components separate in `ui/` folder

**Path Aliases:**
- Use `@/components/...` instead of relative imports
- `@/*` maps to `./src/*`

**Authentication:**
- Special plan page uses cookie-based auth
- Password protection via server actions in `special-plan/actions.ts`

**Forms:**
- React Hook Form + Zod schemas (see `lib/schema.ts`)
- Server actions for form submission
- Consistent validation patterns

**Styling:**
- Tailwind CSS with CSS variables for theming
- Mobile-first responsive design
- `cn()` utility for conditional classes (`lib/utils.ts`)

## Security & Rate Limiting

- Email form includes rate limiting and input sanitization (`lib/security.ts`)
- SMTP-based email sending with enhanced security
- Password-protected special plan section with cookie-based auth

## Environment Setup

Required environment variables (copy `.env.example` to `.env.local`):
```env
SPECIAL_PLAN_PASSWORD=your_password  # For /special-plan access
RESEND_API_KEY=your_key             # Email functionality
RESEND_FROM_EMAIL=noreply@domain.com
CONTACT_FORM_TO_EMAIL=contact@domain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Important Files

- `src/app/layout.tsx` - Root layout with fonts, metadata, SEO setup
- `src/lib/constants.ts` - Site-wide constants and navigation
- `src/lib/plans.ts` - Pricing plan data
- `src/lib/security.ts` - Security utilities and rate limiting
- `src/lib/email-templates.ts` - Email template functions
- `src/lib/data/` - Static data files (services, apps, about)
- `tailwind.config.ts` - Tailwind configuration with custom theme
- `components.json` - shadcn/ui configuration

## SEO & Performance

- Comprehensive metadata in `layout.tsx`
- JSON-LD structured data in `components/seo/JsonLd.tsx`
- Next.js Image optimization throughout
- Accessibility compliance (WCAG, jsx-a11y linting)

## Testing

- Unit tests co-located in `__tests__` folders
- Jest configuration in `jest.config.js`
- Playwright E2E tests in `tests/` directory  
- Test setup file: `jest.setup.js`

## Data Management

- Static content organized in `src/lib/data/` directory
- Pricing plans centralized in `lib/plans.ts`
- Services and app data in separate data files
- Company information in `about-data.ts`

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.