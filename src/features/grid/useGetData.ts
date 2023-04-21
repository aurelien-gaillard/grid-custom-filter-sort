import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

export type Data = {
  id: number
  title: string
  userId: number
}

export const useGetData = () => {
  const [data, setData] = useState<Data[]>([])

  const {
    isLoading,
    error,
    data: queryData,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://jsonplaceholder.typicode.com/albums')
        .then((res) => res.data as Data[]),
  })

  useEffect(() => {
    if (queryData) {
      setData(queryData)
    }
  }, [queryData])

  return { data, setData }
}
