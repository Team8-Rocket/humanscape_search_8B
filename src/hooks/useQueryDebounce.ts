import { useState, useEffect } from 'hooks'

const koreanRegexp = /[ㄱ-ㅎ]+/

export const useQueryDebounce = (value: string, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      if (koreanRegexp.test(value)) {
        return
      }
      setDebounceValue(value.trim())
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
