'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, routing } from '@/i18n/routing';
import { useTransition } from 'react';

// Lets a user flip between fr-CA and en-CA. Per-user locale is persisted on the
// profile in Phase B; this switcher handles the in-session route change.
export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('localeSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{t('label')}</span>
      <select
        aria-label={t('label')}
        value={locale}
        disabled={isPending}
        onChange={(e) => onSelect(e.target.value)}
        className="rounded border border-slate-300 bg-white px-2 py-1"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc)}
          </option>
        ))}
      </select>
    </label>
  );
}
