import {
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { Status, isStatus } from './types'

export const CustomAttributeEditor = observer(function CustomAttributeEditor({
  attributeValues,
  setAttribute,
  isNew = false,
}: {
  attributeValues?: string[]
  setAttribute: (newAttribute?: string[]) => void
  isNew?: boolean
}) {
  const [firstValue] = attributeValues ?? []
  const [status, setStatus] = useState<Status>(
    firstValue && isStatus(firstValue) ? firstValue : Status.New,
  )

  function handleChange(event: SelectChangeEvent) {
    const { value } = event.target
    if (isStatus(value)) {
      setStatus(value)
      return
    }
    setStatus(Status.New)
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-status-label">Status</InputLabel>
        <Select
          labelId="select-status-label"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={Status.New}>{Status.New}</MenuItem>
          <MenuItem value={Status.InProgress}>{Status.InProgress}</MenuItem>
          <MenuItem value={Status.ReadyForReview}>
            {Status.ReadyForReview}
          </MenuItem>
          <MenuItem value={Status.Approved}>{Status.Approved}</MenuItem>
        </Select>
      </FormControl>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setAttribute([status])
          }}
        >
          {isNew ? 'Add' : 'Update'}
        </Button>
        <Button
          variant="outlined"
          type="submit"
          onClick={() => {
            setAttribute()
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  )
})
