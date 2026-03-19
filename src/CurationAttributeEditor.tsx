import {
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import type { AttributeConfig } from './types'

const CUSTOM_VALUE = '__custom__'

export const CurationAttributeEditor = observer(
  function CurationAttributeEditor({
    attributeValues,
    setAttribute,
    isNew = false,
    attributeConfig,
  }: {
    attributeValues?: string[]
    setAttribute: (newAttribute?: string[]) => void
    isNew?: boolean
    attributeConfig: AttributeConfig
  }) {
    const [firstValue] = attributeValues ?? []
    const presets = attributeConfig.values ?? []
    const isPreset = firstValue && presets.includes(firstValue)

    const [selected, setSelected] = useState<string>(
      attributeConfig.type === 'select+free'
        ? isPreset
          ? firstValue
          : firstValue
            ? CUSTOM_VALUE
            : ''
        : '',
    )
    const [customText, setCustomText] = useState<string>(
      attributeConfig.type === 'select+free' && !isPreset ? (firstValue ?? '') : '',
    )
    const [freeText, setFreeText] = useState<string>(firstValue ?? '')

    function getCurrentValue(): string {
      if (attributeConfig.type === 'free') return freeText
      if (selected === CUSTOM_VALUE) return customText
      return selected
    }

    if (attributeConfig.type === 'free') {
      return (
        <>
          <TextField
            fullWidth
            label={attributeConfig.label}
            placeholder={attributeConfig.placeholder ?? ''}
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
          />
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setAttribute([freeText])}
              disabled={!freeText.trim()}
            >
              {isNew ? 'Add' : 'Update'}
            </Button>
            <Button variant="outlined" onClick={() => setAttribute()}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )
    }

    // select+free
    return (
      <>
        <FormControl fullWidth>
          <InputLabel id={`${attributeConfig.key}-label`}>
            {attributeConfig.label}
          </InputLabel>
          <Select
            labelId={`${attributeConfig.key}-label`}
            value={selected}
            label={attributeConfig.label}
            onChange={(e: SelectChangeEvent) => setSelected(e.target.value)}
          >
            {presets.map(v => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
            <MenuItem value={CUSTOM_VALUE}>
              <em>Custom...</em>
            </MenuItem>
          </Select>
        </FormControl>
        {selected === CUSTOM_VALUE && (
          <TextField
            fullWidth
            label="Custom value"
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            sx={{ mt: 1 }}
          />
        )}
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              const val = getCurrentValue()
              if (val.trim()) setAttribute([val])
            }}
            disabled={!getCurrentValue().trim()}
          >
            {isNew ? 'Add' : 'Update'}
          </Button>
          <Button variant="outlined" onClick={() => setAttribute()}>
            Cancel
          </Button>
        </DialogActions>
      </>
    )
  },
)
