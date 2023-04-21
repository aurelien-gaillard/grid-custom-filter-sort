import { Popover, Stack, Typography, TextField } from '@mui/material'
import React from 'react'
import { FilterModel } from './useFilterGrid'
import { ColumnId } from './Grid'

interface Props {
  filteringColumn: ColumnId | null
  filterModel: FilterModel[] | null
  setFilterModel: (filterModel: FilterModel[] | null) => void
}
const FilterMenu = ({
  filteringColumn,
  filterModel,
  setFilterModel,
}: Props) => {
  return (
    <Stack spacing={1} p={2}>
      <Typography>Filter contains</Typography>
      <TextField
        value={
          filterModel?.find((col) => col.column === filteringColumn)
            ?.contains ?? ''
        }
        onChange={(e) =>
          filteringColumn &&
          setFilterModel(
            filterModel?.find((col) => col.column === filteringColumn)
              ? [
                  ...filterModel.filter(
                    (item) => item.column !== filteringColumn
                  ),
                  { column: filteringColumn, contains: e.target.value },
                ]
              : [
                  ...(filterModel ?? []),
                  { column: filteringColumn, contains: e.target.value },
                ]
          )
        }
        label='Contains'
        variant='outlined'
      />
    </Stack>
  )
}

export default FilterMenu
