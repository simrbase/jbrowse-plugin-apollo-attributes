import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import * as React from 'react'

import { Status, isStatus } from './types'

const steps: Status[] = [
  Status.New,
  Status.InProgress,
  Status.ReadyForReview,
  Status.Approved,
]

interface AttributeViewerProps {
  values: string[] | undefined
}

export function CustomAttributeViewer({ values }: AttributeViewerProps) {
  if (!values) {
    return <Typography>Unknown</Typography>
  }
  const [firstValue] = values
  if (!isStatus(firstValue)) {
    return <Typography>Unknown</Typography>
  }
  let activeStep = steps.findIndex(v => v === firstValue)
  if (activeStep === steps.length - 1) {
    activeStep = steps.length
  }
  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map(step => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
