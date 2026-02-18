import { useState, useEffect } from 'react'

const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, isLoading, error }
}

export default useFetch