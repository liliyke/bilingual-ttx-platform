// A single mappable control / article / requirement within a framework.
// Bilingual by construction: English and Quebec French labels live side by side
// so the multi-framework mapping picker (Phase C) can render in either locale.
export interface RegulationControl {
  /** Stable ID as cited in scenario mappings, e.g. "12.10.4", "RS.MA-01", "art_3_5". */
  id: string;
  label_en: string;
  label_fr: string;
  description_en: string;
  description_fr: string;
}

// Keys match the per-framework arrays in the `regulatory_mappings` jsonb column.
export type FrameworkKey =
  | 'osfi_b13'
  | 'law25'
  | 'nist_csf_v2'
  | 'pci_dss_v4'
  | 'pipeda'
  | 'bill96'
  | 'soc2_tsc';

export interface Framework {
  key: FrameworkKey;
  /** Tier per the build brief: primary frameworks drive scenario design. */
  tier: 'primary' | 'secondary';
  label_en: string;
  label_fr: string;
  controls: RegulationControl[];
}
