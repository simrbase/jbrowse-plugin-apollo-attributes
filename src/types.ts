export interface AttributeConfig {
  key: string
  label: string
  type: 'select+free' | 'free'
  values?: string[]
  placeholder?: string
}

export interface CurationConfig {
  attributes: AttributeConfig[]
}
