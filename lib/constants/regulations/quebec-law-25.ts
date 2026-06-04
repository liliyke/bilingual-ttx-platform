import type { RegulationControl } from './types';

// Quebec Law 25 — references into the Act respecting the protection of personal
// information in the private sector, focused on confidentiality incidents and
// breach notification. Validate article numbers against the current consolidated
// version with the francophone + compliance reviewers.
export const quebecLaw25: RegulationControl[] = [
  {
    id: 'art_3_5',
    label_en: 'Art. 3.5 — Confidentiality incident notification',
    label_fr: 'Art. 3.5 — Notification d’un incident de confidentialité',
    description_en:
      'Where an incident presents a risk of serious injury, notify the Commission d’accès à l’information and the affected individuals with diligence.',
    description_fr:
      'Lorsqu’un incident présente un risque de préjudice sérieux, aviser avec diligence la Commission d’accès à l’information et les personnes concernées.',
  },
  {
    id: 'art_3_6',
    label_en: 'Art. 3.6 — Measures to reduce risk of injury',
    label_fr: 'Art. 3.6 — Mesures pour réduire le risque de préjudice',
    description_en:
      'Take reasonable measures to reduce the risk of injury and to prevent new incidents of the same nature.',
    description_fr:
      'Prendre les mesures raisonnables pour diminuer le risque de préjudice et éviter que de nouveaux incidents de même nature ne surviennent.',
  },
  {
    id: 'art_3_7',
    label_en: 'Art. 3.7 — Notification content',
    label_fr: 'Art. 3.7 — Contenu de l’avis',
    description_en:
      'Content required in notifications to the Commission and to affected individuals.',
    description_fr:
      'Contenu exigé dans les avis transmis à la Commission et aux personnes concernées.',
  },
  {
    id: 'art_3_8',
    label_en: 'Art. 3.8 — Register of confidentiality incidents',
    label_fr: 'Art. 3.8 — Registre des incidents de confidentialité',
    description_en:
      'Maintain a register of confidentiality incidents and provide a copy to the Commission on request.',
    description_fr:
      'Tenir un registre des incidents de confidentialité et en transmettre copie à la Commission sur demande.',
  },
  {
    id: 'art_63_1',
    label_en: 'Art. 63.1 — Powers of the Commission',
    label_fr: 'Art. 63.1 — Pouvoirs de la Commission',
    description_en:
      'Commission inquiry powers relevant to incident handling and compliance.',
    description_fr:
      'Pouvoirs d’enquête de la Commission liés au traitement des incidents et à la conformité.',
  },
];
