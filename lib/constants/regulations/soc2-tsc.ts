import type { RegulationControl } from './types';

// SOC 2 Type II — Trust Services Criteria (2017 TSC with 2022 points of focus).
// Common Criteria (CC) series in focus, especially CC7.x (system operations) and
// CC9.x (risk mitigation), plus optional categories (A1, C1, P, PI) the org may
// elect. TTX records become evidence for these criteria; they don't mandate TTXs
// the way PCI Req 12.10 does.
export const soc2Tsc: RegulationControl[] = [
  {
    id: 'CC7.2',
    label_en: 'CC7.2 — Monitoring for anomalies and security events',
    label_fr: 'CC7.2 — Surveillance des anomalies et des événements de sécurité',
    description_en:
      'The entity monitors system components for anomalies indicative of malicious acts, natural disasters and errors.',
    description_fr:
      'L’entité surveille les composants du système pour détecter les anomalies révélatrices d’actes malveillants, de sinistres ou d’erreurs.',
  },
  {
    id: 'CC7.3',
    label_en: 'CC7.3 — Evaluating security events and incidents',
    label_fr: 'CC7.3 — Évaluation des événements et incidents de sécurité',
    description_en:
      'The entity evaluates security events to determine whether they could or did result in a failure to meet objectives (an incident).',
    description_fr:
      'L’entité évalue les événements de sécurité pour déterminer s’ils pourraient compromettre ou ont compromis l’atteinte des objectifs (un incident).',
  },
  {
    id: 'CC7.4',
    label_en: 'CC7.4 — Responding to identified security incidents',
    label_fr: 'CC7.4 — Réponse aux incidents de sécurité recensés',
    description_en:
      'The entity responds to identified security incidents using a defined incident response program to understand, contain, remediate and communicate.',
    description_fr:
      'L’entité répond aux incidents de sécurité recensés au moyen d’un programme défini pour comprendre, contenir, corriger et communiquer.',
  },
  {
    id: 'CC7.5',
    label_en: 'CC7.5 — Recovery from identified security incidents',
    label_fr: 'CC7.5 — Rétablissement après les incidents de sécurité',
    description_en:
      'The entity identifies, develops and implements activities to recover from identified security incidents.',
    description_fr:
      'L’entité définit, élabore et met en œuvre les activités de rétablissement après les incidents de sécurité recensés.',
  },
  {
    id: 'CC9.2',
    label_en: 'CC9.2 — Vendor and business partner risk management',
    label_fr: 'CC9.2 — Gestion du risque lié aux fournisseurs et partenaires',
    description_en:
      'The entity assesses and manages risks associated with vendors and business partners.',
    description_fr:
      'L’entité évalue et gère les risques associés aux fournisseurs et aux partenaires d’affaires.',
  },
  {
    id: 'A1.2',
    label_en: 'A1.2 — Environmental and recovery controls for availability',
    label_fr: 'A1.2 — Contrôles environnementaux et de reprise (disponibilité)',
    description_en:
      'Backup, recovery and environmental protections support the entity’s availability commitments. (Elect Availability category.)',
    description_fr:
      'Les sauvegardes, la reprise et les protections environnementales soutiennent les engagements de disponibilité de l’entité. (Catégorie Disponibilité.)',
  },
  {
    id: 'C1.1',
    label_en: 'C1.1 — Identification and protection of confidential information',
    label_fr: 'C1.1 — Recensement et protection des renseignements confidentiels',
    description_en:
      'Confidential information is identified and protected to meet confidentiality commitments. (Elect Confidentiality category.)',
    description_fr:
      'Les renseignements confidentiels sont recensés et protégés afin de respecter les engagements de confidentialité. (Catégorie Confidentialité.)',
  },
  {
    id: 'P6.1',
    label_en: 'P6.1 — Privacy incident and breach handling',
    label_fr: 'P6.1 — Traitement des incidents et atteintes à la vie privée',
    description_en:
      'The entity addresses unauthorized use or disclosure of personal information, including breach response. (Elect Privacy category.)',
    description_fr:
      'L’entité traite l’utilisation ou la communication non autorisée de renseignements personnels, y compris la réponse aux atteintes. (Catégorie Vie privée.)',
  },
  {
    id: 'PI1.1',
    label_en: 'PI1.1 — Processing integrity objectives',
    label_fr: 'PI1.1 — Objectifs d’intégrité du traitement',
    description_en:
      'Processing is complete, valid, accurate, timely and authorized to meet objectives. (Elect Processing Integrity category — relevant to transaction-integrity/fraud scenarios.)',
    description_fr:
      'Le traitement est complet, valide, exact, opportun et autorisé pour atteindre les objectifs. (Catégorie Intégrité du traitement — scénarios de fraude/intégrité transactionnelle.)',
  },
];
