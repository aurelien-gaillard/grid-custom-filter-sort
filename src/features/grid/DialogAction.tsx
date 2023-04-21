import { Data } from '@/features/grid/useGetData'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
} from '@mui/material'
import React, { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  data: Data[]
  setData: (x: Data[]) => void
  modifyingRow: Data | null
}
const DialogAction = ({
  open,
  handleClose,
  modifyingRow,
  data,
  setData,
}: Props) => {
  const [userId, setUserId] = useState(modifyingRow?.userId ?? '')
  const [title, setTitle] = useState(modifyingRow?.title ?? '')

  const handleNewRow = () => {
    setData([
      ...data,
      {
        id: Math.floor(Math.random() * 100000000000), // Would be better to use uuid
        userId: Number(userId),
        title,
      },
    ])
    handleClose()
  }

  const handleUpdateRow = () => {
    const newData = data.map((row) => {
      if (row.id === modifyingRow?.id) {
        return {
          ...row,
          userId: Number(userId),
          title,
        }
      }
      return row
    })
    setData(newData)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle>{modifyingRow ? 'Edit Row' : 'Add a new Row'} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack spacing={2} width={350} p={1}>
            <TextField
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              label='User Id'
              variant='outlined'
              type='number'
            />
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label='Title'
              variant='outlined'
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {modifyingRow ? (
          <Button variant='outlined' onClick={handleUpdateRow}>
            Save changes
          </Button>
        ) : (
          <Button variant='outlined' onClick={handleNewRow}>
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default DialogAction
