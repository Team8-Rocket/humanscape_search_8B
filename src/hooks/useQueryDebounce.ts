import { useState, useEffect } from 'hooks'

export const useQueryDebounce = (value: string, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value.trim())
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
