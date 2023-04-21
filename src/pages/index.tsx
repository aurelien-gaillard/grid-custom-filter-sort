import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import DialogAction from '../features/grid/DialogAction'
import { Data, useGetData } from '@/features/grid/useGetData'
import Grid, { Column } from '@/features/grid/Grid'

export default function Home() {
  const { data, setData } = useGetData()
  const [isDialog, setIsDialog] = useState(false)
  const [modifyingRow, setModifyingRow] = useState<Data | null>(null)

  const columns: Column[] = [
    { id: 'id', label: 'id', isNumeric: true },
    { id: 'userId', label: 'User Id', isNumeric: true },
    { id: 'title', label: 'Title' },
  ]

  return (
    <Box component='main' m={2}>
      {/* Dialog for Adding or updating Row */}
      {(isDialog || !!modifyingRow) && (
        <DialogAction
          open={isDialog || !!modifyingRow}
          handleClose={() => {
            setModifyingRow(null)
            setIsDialog(false)
          }}
          data={data}
          setData={setData}
          modifyingRow={modifyingRow}
        />
      )}

      <Typography variant='h5'>Grid Albums Example</Typography>
      <Button
        variant='outlined'
        onClick={() => setIsDialog(true)}
        sx={{ my: 2 }}
      >
        Add a new row
      </Button>
      {data && (
        <Grid
          rowData={data}
          columns={columns}
          setData={setData}
          setModifyingRow={setModifyingRow}
        />
      )}
    </Box>
  )
}
