import { useState } from 'react'
import { ColumnId } from './Grid'
import { Data } from './useGetData'

export type FilterModel = {
  column: ColumnId
  contains: string
}
export const useFilterGrid = () => {
  const [filterModel, setFilterModel] = useState<FilterModel[] | null>(null)

  const filterRows = (rows: Data[]) =>
    rows.filter((row) => {
      if (!filterModel) return true
      let isRowMatchingFilter = true
      filterModel.map((model) => {
        if (!row[model.column].toString().includes(model.contains)) {
          isRowMatchingFilter = false
        }
      })
      return isRowMatchingFilter
    })

  return { filterModel, filterRows, setFilterModel }
}
