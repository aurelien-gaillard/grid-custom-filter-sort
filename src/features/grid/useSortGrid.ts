import { useState } from 'react'
import { Column, ColumnId } from './Grid'
import { Data } from './useGetData'

export const useSortGrid = (columns: Column[]) => {
  const [sortingModel, setSortingModel] = useState<{
    col: ColumnId
    asc: boolean
  } | null>({ col: 'id', asc: true })

  const handleSortColumn = (column: Column) => {
    // Column is already selected for sorting
    if (column.id === sortingModel?.col) {
      //   Column is ascending -> assign desc
      if (sortingModel.asc) {
        setSortingModel({ col: column.id, asc: false })
      }
      //   Column is descending -> assign null
      else {
        setSortingModel(null)
      }
    }
    // A new column is selected for sorting
    else {
      setSortingModel({ col: column.id, asc: true })
    }
  }

  const isSortedColumnNumeric =
    sortingModel &&
    columns.find((col) => col.id === sortingModel.col)?.isNumeric

  const sortRows = (rows: Data[]) =>
    sortingModel
      ? rows.slice().sort((a, b) =>
          isSortedColumnNumeric
            ? // Sorting Numeric column
              sortingModel.asc
              ? (a[sortingModel.col] as number) -
                (b[sortingModel.col] as number)
              : (b[sortingModel.col] as number) -
                (a[sortingModel.col] as number)
            : // Sorting String column
            sortingModel.asc
            ? (a[sortingModel.col] as string).localeCompare(
                b[sortingModel.col] as string
              )
            : (b[sortingModel.col] as string).localeCompare(
                a[sortingModel.col] as string
              )
        )
      : rows

  return { sortingModel, handleSortColumn, sortRows }
}
