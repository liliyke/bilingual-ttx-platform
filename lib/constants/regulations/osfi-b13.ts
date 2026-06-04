import type { RegulationControl } from './types';

// OSFI Guideline B-13 — Technology and Cyber Risk Management.
// Starter subset focused on the domains a TTX plausibly exercises (technology
// resilience, incident/problem management, cyber detection-response-recovery).
// Reconcile exact section numbering against the published guideline before an
// audit; flag gaps in framework-mappings-needed.md (see content-review-sop-v2.md).
export const osfiB13: RegulationControl[] = [
  {
    id: 'b13_1_1',
    label_en: 'Domain 1.1 — Accountability and organizational structure',
    label_fr: 'Domaine 1.1 — Responsabilité et structure organisationnelle',
    description_en:
      'Clear accountability for technology and cyber risk, including senior management and board oversight.',
    description_fr:
      'Responsabilité claire à l’égard du risque technologique et cyber, y compris la surveillance par la haute direction et le conseil.',
  },
  {
    id: 'b13_1_3',
    label_en: 'Domain 1.3 — Technology and cyber risk management framework',
    label_fr: 'Domaine 1.3 — Cadre de gestion du risque technologique et cyber',
    description_en:
      'A framework to identify, assess, manage, monitor and report on technology and cyber risk.',
    description_fr:
      'Cadre permettant de cerner, d’évaluer, de gérer, de surveiller et de déclarer le risque technologique et cyber.',
  },
  {
    id: 'b13_2_3',
    label_en: 'Domain 2.3 — Technology resilience',
    label_fr: 'Domaine 2.3 — Résilience technologique',
    description_en:
      'Disaster recovery and the ability to deliver technology services through disruption within approved tolerances.',
    description_fr:
      'Reprise après sinistre et capacité de maintenir les services technologiques en cas de perturbation, dans les tolérances approuvées.',
  },
  {
    id: 'b13_2_4',
    label_en: 'Domain 2.4 — Incident and problem management',
    label_fr: 'Domaine 2.4 — Gestion des incidents et des problèmes',
    description_en:
      'Detect, log, manage, resolve and learn from technology incidents to limit impact and recurrence.',
    description_fr:
      'Détecter, consigner, gérer, résoudre et tirer des leçons des incidents technologiques afin d’en limiter l’incidence et la récurrence.',
  },
  {
    id: 'b13_3_2',
    label_en: 'Domain 3.2 — Cyber security posture and controls',
    label_fr: 'Domaine 3.2 — Posture et contrôles de cybersécurité',
    description_en:
      'Maintain a defensible cyber posture proportionate to the institution’s risk profile.',
    description_fr:
      'Maintenir une posture de cybersécurité défendable et proportionnée au profil de risque de l’institution.',
  },
  {
    id: 'b13_3_4',
    label_en: 'Domain 3.4 — Detect, respond, recover',
    label_fr: 'Domaine 3.4 — Détecter, répondre, rétablir',
    description_en:
      'Capabilities to detect cyber events, respond effectively and recover operations; supports OSFI incident reporting expectations.',
    description_fr:
      'Capacités de détection des cyberévénements, d’intervention efficace et de rétablissement; soutient les attentes de déclaration d’incident de l’OSFI.',
  },
];
