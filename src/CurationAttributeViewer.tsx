import { Typography } from '@mui/material'
import React from 'react'

interface AttributeViewerProps {
  values: string[] | undefined
}

export function CurationAttributeViewer({ values }: AttributeViewerProps) {
  if (!values?.length) {
    return <Typography color="text.secondary">—</Typography>
  }
  return <Typography>{values.join(', ')}</Typography>
}
