import type { RegulationControl } from './types';

// PIPEDA — federal privacy. Secondary framework: principles 4.7 (safeguards) and
// 4.9 (individual access), plus the breach-of-security-safeguards reporting
// provisions. Most Quebec scenarios lead with Law 25; PIPEDA maps where federal
// works or cross-border data make it applicable.
export const pipeda: RegulationControl[] = [
  {
    id: 'principle_4_7',
    label_en: 'Principle 4.7 — Safeguards',
    label_fr: 'Principe 4.7 — Mesures de sécurité',
    description_en:
      'Personal information is protected by security safeguards appropriate to the sensitivity of the information.',
    description_fr:
      'Les renseignements personnels sont protégés par des mesures de sécurité adaptées à leur degré de sensibilité.',
  },
  {
    id: 'principle_4_9',
    label_en: 'Principle 4.9 — Individual access',
    label_fr: 'Principe 4.9 — Accès individuel',
    description_en:
      'Upon request, an individual is informed of the existence, use and disclosure of their personal information and given access to it.',
    description_fr:
      'Sur demande, une personne est informée de l’existence, de l’utilisation et de la communication de ses renseignements personnels et y a accès.',
  },
  {
    id: 'breach_10_1',
    label_en: 's. 10.1 — Report a breach of security safeguards',
    label_fr: 'art. 10.1 — Déclarer une atteinte aux mesures de sécurité',
    description_en:
      'Report to the Office of the Privacy Commissioner any breach of security safeguards involving a real risk of significant harm.',
    description_fr:
      'Déclarer au Commissariat à la protection de la vie privée toute atteinte aux mesures de sécurité présentant un risque réel de préjudice grave.',
  },
  {
    id: 'breach_10_2',
    label_en: 's. 10.2 — Notify affected individuals',
    label_fr: 'art. 10.2 — Aviser les personnes concernées',
    description_en:
      'Notify affected individuals of a breach of security safeguards involving a real risk of significant harm.',
    description_fr:
      'Aviser les personnes concernées d’une atteinte aux mesures de sécurité présentant un risque réel de préjudice grave.',
  },
];
