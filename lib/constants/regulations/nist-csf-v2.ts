import type { RegulationControl } from './types';

// NIST Cybersecurity Framework v2.0 — subcategories across the six functions
// (GV, ID, PR, DE, RS, RC). Starter subset weighted toward the Respond and
// Recover functions that incident-response TTXs exercise most directly.
export const nistCsfV2: RegulationControl[] = [
  {
    id: 'GV.OC-01',
    label_en: 'GV.OC-01 — Organizational mission and risk context understood',
    label_fr: 'GV.OC-01 — Mission organisationnelle et contexte de risque compris',
    description_en:
      'The organizational mission is understood and informs cybersecurity risk management.',
    description_fr:
      'La mission de l’organisation est comprise et oriente la gestion du risque de cybersécurité.',
  },
  {
    id: 'GV.RR-02',
    label_en: 'GV.RR-02 — Roles and responsibilities for risk are established',
    label_fr: 'GV.RR-02 — Rôles et responsabilités en matière de risque établis',
    description_en:
      'Roles, responsibilities and authorities for cybersecurity risk are established and communicated.',
    description_fr:
      'Les rôles, responsabilités et pouvoirs liés au risque de cybersécurité sont établis et communiqués.',
  },
  {
    id: 'ID.RA-01',
    label_en: 'ID.RA-01 — Vulnerabilities are identified and recorded',
    label_fr: 'ID.RA-01 — Les vulnérabilités sont cernées et consignées',
    description_en:
      'Vulnerabilities in assets are identified, validated and recorded.',
    description_fr:
      'Les vulnérabilités des actifs sont cernées, validées et consignées.',
  },
  {
    id: 'DE.AE-02',
    label_en: 'DE.AE-02 — Potentially adverse events are analyzed',
    label_fr: 'DE.AE-02 — Les événements potentiellement défavorables sont analysés',
    description_en:
      'Potentially adverse events are analyzed to understand associated activity.',
    description_fr:
      'Les événements potentiellement défavorables sont analysés afin de comprendre l’activité associée.',
  },
  {
    id: 'DE.CM-01',
    label_en: 'DE.CM-01 — Networks and services are monitored',
    label_fr: 'DE.CM-01 — Les réseaux et services sont surveillés',
    description_en:
      'Networks and network services are monitored to find potentially adverse events.',
    description_fr:
      'Les réseaux et les services réseau sont surveillés pour détecter des événements potentiellement défavorables.',
  },
  {
    id: 'RS.MA-01',
    label_en: 'RS.MA-01 — The incident response plan is executed',
    label_fr: 'RS.MA-01 — Le plan d’intervention en cas d’incident est exécuté',
    description_en:
      'The incident response plan is executed in coordination with relevant third parties once an incident is declared.',
    description_fr:
      'Le plan d’intervention est exécuté en coordination avec les tiers concernés dès qu’un incident est déclaré.',
  },
  {
    id: 'RS.CO-02',
    label_en: 'RS.CO-02 — Internal and external stakeholders are notified',
    label_fr: 'RS.CO-02 — Les parties prenantes internes et externes sont avisées',
    description_en:
      'Internal and external stakeholders are notified of incidents consistent with response plans.',
    description_fr:
      'Les parties prenantes internes et externes sont avisées des incidents conformément aux plans d’intervention.',
  },
  {
    id: 'RS.AN-03',
    label_en: 'RS.AN-03 — Analysis determines what occurred',
    label_fr: 'RS.AN-03 — L’analyse établit ce qui s’est produit',
    description_en:
      'Analysis is performed to establish what took place during an incident and the root cause.',
    description_fr:
      'Une analyse est réalisée pour établir le déroulement de l’incident et sa cause fondamentale.',
  },
  {
    id: 'RS.MI-01',
    label_en: 'RS.MI-01 — Incidents are contained',
    label_fr: 'RS.MI-01 — Les incidents sont contenus',
    description_en: 'Incidents are contained to limit their impact.',
    description_fr: 'Les incidents sont contenus afin d’en limiter l’incidence.',
  },
  {
    id: 'RC.RP-01',
    label_en: 'RC.RP-01 — The recovery portion of the plan is executed',
    label_fr: 'RC.RP-01 — La portion de rétablissement du plan est exécutée',
    description_en:
      'The recovery portion of the incident response plan is executed once initiated.',
    description_fr:
      'La portion de rétablissement du plan d’intervention est exécutée une fois amorcée.',
  },
  {
    id: 'RC.CO-04',
    label_en: 'RC.CO-04 — Public updates on recovery are shared',
    label_fr: 'RC.CO-04 — Communication publique sur le rétablissement',
    description_en:
      'Public updates on incident recovery are shared using approved methods and messaging.',
    description_fr:
      'Les mises à jour publiques sur le rétablissement sont diffusées au moyen de méthodes et de messages approuvés.',
  },
];
