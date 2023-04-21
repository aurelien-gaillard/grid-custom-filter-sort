import React, { useState } from 'react'
import {
  ArrowDownward,
  ArrowUpward,
  Delete,
  Edit,
  FilterAlt,
} from '@mui/icons-material'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  IconButton,
  Popover,
  Stack,
  TextField,
  Button,
} from '@mui/material'
import { useSortGrid } from './useSortGrid'
import { Data } from './useGetData'
import { useFilterGrid } from './useFilterGrid'
import FilterMenu from './FilterMenu'

export type ColumnId = 'id' | 'userId' | 'title'
export type Column = { id: ColumnId; label: string; isNumeric?: boolean }

interface Props {
  rowData: Data[]
  setData: (x: Data[]) => void
  columns: Column[]
  setModifyingRow: (x: Data | null) => void
}
const Grid = ({ rowData, columns, setData, setModifyingRow }: Props) => {
  const { sortingModel, handleSortColumn, sortRows } = useSortGrid(columns)
  const { filterModel, setFilterModel, filterRows } = useFilterGrid()

  const [filteringColumn, setFilteringColumn] = useState<ColumnId | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleCloseFilterMenu = () => {
    setAnchorEl(null)
  }

  const handleDeleteRow = (id: number) => {
    setData(rowData.filter((row) => row.id !== id))
  }

  const handleClickFilterMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    columnId: ColumnId
  ) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
    setFilteringColumn(columnId)
  }

  const sortedRows = sortRows(rowData)
  const filteredRows = filterRows(sortedRows)

  return (
    <>
      <Box py={2} display='flex' alignItems='center' gap={1}>
        <Typography>
          Current filtered Columns:{' '}
          {filterModel ? filterModel.map((i) => i.column).join(', ') : 'None'}
        </Typography>
        {filterModel && (
          <Button size='small' onClick={() => setFilterModel(null)}>
            Clear filter
          </Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseFilterMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <FilterMenu
            filteringColumn={filteringColumn}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
          />
        </Popover>

        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align='center'
                  onClick={() => handleSortColumn(col)}
                  sx={{
                    borderLeft: '1px solid grey',
                    borderRight: '1px solid grey',
                    width: col.id !== 'title' ? 140 : undefined, //Column title will be flex
                  }}
                >
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    height={30}
                  >
                    <Box display='flex' alignItems='center' gap={0.5}>
                      <Typography variant='body2'>{col.label}</Typography>
                      {sortingModel?.col === col.id &&
                        (sortingModel?.asc ? (
                          <ArrowDownward />
                        ) : (
                          <ArrowUpward />
                        ))}
                    </Box>
                    <IconButton
                      onClick={(e) => handleClickFilterMenu(e, col.id)}
                    >
                      <FilterAlt />
                    </IconButton>
                  </Box>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.id} align='center'>
                    {row[col.id]}
                  </TableCell>
                ))}
                <TableCell align='center'>
                  <Box display='flex' gap={1}>
                    <IconButton
                      size='small'
                      onClick={() => setModifyingRow(row)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Grid
