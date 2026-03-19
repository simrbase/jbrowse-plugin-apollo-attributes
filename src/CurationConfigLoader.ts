import type { CurationConfig } from './types'

const DEFAULT_CONFIG: CurationConfig = {
  attributes: [
    {
      key: 'curator_notes',
      label: 'Curator Notes',
      type: 'select+free',
      values: [
        'curator added new gene based on src_alignment',
        'curator assigned new name based on community name usage',
        'curator assigned new note based on community gene description usage',
        'curator assigned new name and note based on community name and description usage',
        'curator assigned new name and description based on homology and gene order in gene group cluster',
      ],
    },
    {
      key: 'source_alignment',
      label: 'Source Alignment',
      type: 'free',
      placeholder: 'e.g. KC_Nvec200_v1.4309.8.p1, XP_032220222.1',
    },
  ],
}

let configCache: CurationConfig | null = null

export async function loadCurationConfig(): Promise<CurationConfig> {
  if (configCache) return configCache
  try {
    const response = await fetch('./curation-config.json')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    configCache = (await response.json()) as CurationConfig
  } catch {
    console.warn(
      '[apollo-attributes] Could not load curation-config.json, using defaults.',
    )
    configCache = DEFAULT_CONFIG
  }
  return configCache
}

export function getCurationConfig(): CurationConfig | null {
  return configCache
}
