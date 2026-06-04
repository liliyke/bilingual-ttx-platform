import type { Framework, FrameworkKey, RegulationControl } from './types';
import { osfiB13 } from './osfi-b13';
import { quebecLaw25 } from './quebec-law-25';
import { nistCsfV2 } from './nist-csf-v2';
import { pciDssV4 } from './pci-dss-v4';
import { pipeda } from './pipeda';
import { bill96 } from './bill96';
import { soc2Tsc } from './soc2-tsc';

export type { Framework, FrameworkKey, RegulationControl } from './types';

// The seven frameworks the platform maps against, tiered per the build brief.
// The mapping picker (Phase C) renders one tab per framework in this order.
export const FRAMEWORKS: Framework[] = [
  {
    key: 'osfi_b13',
    tier: 'primary',
    label_en: 'OSFI Guideline B-13',
    label_fr: 'Ligne directrice B-13 du BSIF',
    controls: osfiB13,
  },
  {
    key: 'law25',
    tier: 'primary',
    label_en: 'Quebec Law 25',
    label_fr: 'Loi 25 (Québec)',
    controls: quebecLaw25,
  },
  {
    key: 'nist_csf_v2',
    tier: 'primary',
    label_en: 'NIST CSF v2.0',
    label_fr: 'NIST CSF v2.0',
    controls: nistCsfV2,
  },
  {
    key: 'pci_dss_v4',
    tier: 'primary',
    label_en: 'PCI DSS v4.0',
    label_fr: 'PCI DSS v4.0',
    controls: pciDssV4,
  },
  {
    key: 'pipeda',
    tier: 'secondary',
    label_en: 'PIPEDA',
    label_fr: 'LPRPDE',
    controls: pipeda,
  },
  {
    key: 'bill96',
    tier: 'secondary',
    label_en: 'Bill 96 / Charter of the French Language',
    label_fr: 'Loi 96 / Charte de la langue française',
    controls: bill96,
  },
  {
    key: 'soc2_tsc',
    tier: 'secondary',
    label_en: 'SOC 2 Type II (TSC)',
    label_fr: 'SOC 2 Type II (critères TSC)',
    controls: soc2Tsc,
  },
];

export const FRAMEWORKS_BY_KEY: Record<FrameworkKey, Framework> =
  Object.fromEntries(FRAMEWORKS.map((f) => [f.key, f])) as Record<
    FrameworkKey,
    Framework
  >;

/** Look up a single control by framework + id (e.g. for rendering AAR mappings). */
export function findControl(
  framework: FrameworkKey,
  id: string,
): RegulationControl | undefined {
  return FRAMEWORKS_BY_KEY[framework]?.controls.find((c) => c.id === id);
}
