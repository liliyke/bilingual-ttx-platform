import type { RegulationControl } from './types';

// Charter of the French Language, as amended by Bill 96. Secondary framework:
// the provisions that bear on incident communications and notifications to
// Quebec individuals (everyone must be able to be informed and served in French).
// These are representative references — confirm provision numbers with the
// francophone + compliance reviewers (OQLF guidance is authoritative).
export const bill96: RegulationControl[] = [
  {
    id: 'communications_to_individuals_fr',
    label_en: 'Communications to Quebec individuals in French',
    label_fr: 'Communications aux personnes au Québec en français',
    description_en:
      'Written communications to individuals in Quebec — including breach and incident notifications — must be available in French.',
    description_fr:
      'Les communications écrites aux personnes au Québec — y compris les avis d’atteinte et d’incident — doivent être disponibles en français.',
  },
  {
    id: 'consumer_contracts_fr',
    label_en: 'Consumer-facing documents in French',
    label_fr: 'Documents destinés aux consommateurs en français',
    description_en:
      'Consumer contracts and related documents are provided in French; an English version does not displace the French obligation.',
    description_fr:
      'Les contrats de consommation et documents connexes sont fournis en français; une version anglaise ne supprime pas l’obligation en français.',
  },
  {
    id: 'right_to_french_service',
    label_en: 'Right to be informed and served in French',
    label_fr: 'Droit d’être informé et servi en français',
    description_en:
      'The public has the right to be informed and served in French, which shapes incident communications timing and translation.',
    description_fr:
      'Le public a le droit d’être informé et servi en français, ce qui influence le minutage et la traduction des communications d’incident.',
  },
];
