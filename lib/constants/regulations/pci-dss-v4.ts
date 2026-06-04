import type { RegulationControl } from './types';

// PCI DSS v4.0 — the subset most plausibly exercised in a TTX: Requirement 12.10
// (incident response), plus payment-page integrity (6.4.3 / 11.6.1) for
// web-skimming scenarios. Not the full 300+ subrequirements — extend as scenarios
// demand and have the compliance reviewer (PCI experience) validate.
export const pciDssV4: RegulationControl[] = [
  {
    id: '12.10.1',
    label_en: '12.10.1 — Incident response plan exists and is ready to activate',
    label_fr: '12.10.1 — Un plan d’intervention existe et peut être activé',
    description_en:
      'An incident response plan exists and is ready to be activated in the event of a suspected or confirmed security incident.',
    description_fr:
      'Un plan d’intervention existe et peut être activé en cas d’incident de sécurité soupçonné ou confirmé.',
  },
  {
    id: '12.10.2',
    label_en: '12.10.2 — Incident response plan reviewed and tested annually',
    label_fr: '12.10.2 — Plan d’intervention révisé et mis à l’essai annuellement',
    description_en:
      'The incident response plan is reviewed and tested at least once every 12 months — the requirement a TTX program directly satisfies.',
    description_fr:
      'Le plan d’intervention est révisé et mis à l’essai au moins tous les 12 mois — l’exigence que le programme d’exercices satisfait directement.',
  },
  {
    id: '12.10.3',
    label_en: '12.10.3 — Designated personnel available 24/7',
    label_fr: '12.10.3 — Personnel désigné disponible en tout temps',
    description_en:
      'Specific personnel are designated to be available on a 24/7 basis to respond to suspected or confirmed incidents.',
    description_fr:
      'Du personnel précis est désigné pour être disponible en tout temps afin de répondre aux incidents soupçonnés ou confirmés.',
  },
  {
    id: '12.10.4',
    label_en: '12.10.4 — Incident response personnel are trained',
    label_fr: '12.10.4 — Le personnel d’intervention est formé',
    description_en:
      'Personnel responsible for responding to security incidents are appropriately and periodically trained.',
    description_fr:
      'Le personnel chargé de répondre aux incidents de sécurité reçoit une formation appropriée et périodique.',
  },
  {
    id: '12.10.5',
    label_en: '12.10.5 — Incident response includes monitoring and alerting',
    label_fr: '12.10.5 — L’intervention intègre la surveillance et les alertes',
    description_en:
      'The incident response plan includes monitoring and responding to alerts from security monitoring systems (including change-and-tamper detection on payment pages).',
    description_fr:
      'Le plan d’intervention inclut la surveillance et la réponse aux alertes des systèmes de surveillance de sécurité (y compris la détection d’altération des pages de paiement).',
  },
  {
    id: '12.10.7',
    label_en: '12.10.7 — Procedures for PAN found where not expected',
    label_fr: '12.10.7 — Procédures lorsque le PAN se trouve là où il ne devrait pas',
    description_en:
      'Incident response procedures are in place to be initiated upon detection of stored PAN where it is not expected.',
    description_fr:
      'Des procédures d’intervention sont prévues et déclenchées lorsqu’un PAN stocké est détecté à un endroit inattendu.',
  },
  {
    id: '6.4.3',
    label_en: '6.4.3 — Payment page scripts are managed',
    label_fr: '6.4.3 — Les scripts des pages de paiement sont gérés',
    description_en:
      'All payment page scripts loaded in the consumer browser are managed, with integrity assured and an inventory maintained.',
    description_fr:
      'Tous les scripts des pages de paiement chargés dans le navigateur du consommateur sont gérés, leur intégrité est assurée et un inventaire est tenu.',
  },
  {
    id: '11.6.1',
    label_en: '11.6.1 — Change-and-tamper detection on payment pages',
    label_fr: '11.6.1 — Détection des changements et altérations des pages de paiement',
    description_en:
      'A change-and-tamper detection mechanism alerts on unauthorized modification of the HTTP headers and content of payment pages (web-skimming defence).',
    description_fr:
      'Un mécanisme de détection alerte en cas de modification non autorisée des en-têtes HTTP et du contenu des pages de paiement (défense contre l’écrémage Web).',
  },
  {
    id: '12.5.2',
    label_en: '12.5.2 — PCI DSS scope is documented and confirmed',
    label_fr: '12.5.2 — La portée PCI DSS est documentée et confirmée',
    description_en:
      'PCI DSS scope is documented and confirmed at least every 12 months and upon significant change to the cardholder data environment.',
    description_fr:
      'La portée PCI DSS est documentée et confirmée au moins tous les 12 mois et lors de tout changement important à l’environnement des données de titulaires de carte.',
  },
];
