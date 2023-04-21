import {
  Popover,
  Stack,
  Typography,
  TextField,
  IconButton,
} from '@mui/material'
import React, { useState } from 'react'
import { FilterModel } from './useFilterGrid'
import { ColumnId } from './Grid'
import { FilterAlt } from '@mui/icons-material'

interface Props {
  columnId: ColumnId
  filterModel: FilterModel[] | null
  setFilterModel: (filterModel: FilterModel[] | null) => void
}
const FilterMenu = ({ columnId, filterModel, setFilterModel }: Props) => {
  const [filteringColumn, setFilteringColumn] = useState<ColumnId | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handleCloseFilterMenu = () => {
    setAnchorEl(null)
  }

  const handleClickFilterMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    columnId: ColumnId
  ) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
    setFilteringColumn(columnId)
  }

  return (
    <>
      <IconButton onClick={(e) => handleClickFilterMenu(e, columnId)}>
        <FilterAlt />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilterMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
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
      </Popover>
    </>
  )
}

export default FilterMenu
