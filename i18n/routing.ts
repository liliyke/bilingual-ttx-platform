import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// French is the default locale; English is selectable. These are the only two
// supported locales (see docs/build-brief-v3.md — "Bilingual / locale requirements").
export const routing = defineRouting({
  locales: ['fr-CA', 'en-CA'],
  defaultLocale: 'fr-CA',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
