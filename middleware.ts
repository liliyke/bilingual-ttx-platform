import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Locale routing for every request. Supabase auth/session refresh and role-based
// routing to /[locale]/{role} are layered in here during Phase B (see
// docs/build-brief-v3.md) using lib/supabase/middleware.ts -> updateSession().
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
