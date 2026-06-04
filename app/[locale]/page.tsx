import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LocaleSwitcher } from '@/components/locale-switcher';

const ROLE_KEYS = [
  'facilitator',
  'participant',
  'evaluator',
  'compliance_reviewer',
  'observer',
  'admin',
] as const;

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tRoles = await getTranslations('roles');

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
          <p className="mt-2 text-slate-600">{t('tagline')}</p>
        </div>
        <LocaleSwitcher />
      </header>

      <section className="rounded-lg border border-slate-200 p-5">
        <h2 className="text-lg font-medium">{t('rolesHeading')}</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ROLE_KEYS.map((role) => (
            <li key={role} className="text-sm text-slate-700">
              <span className="font-medium">{tRoles(`${role}.name`)}</span>
              {' — '}
              {tRoles(`${role}.purpose`)}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 p-5">
        <h2 className="text-lg font-medium">{t('statusHeading')}</h2>
        <p className="mt-2 text-sm text-slate-700">{t('statusBody')}</p>
      </section>
    </main>
  );
}
