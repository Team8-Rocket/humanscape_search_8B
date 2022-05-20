import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { SearchIcon } from 'assets'
import styles from './Search.module.scss'

import useQueryDebounce from 'hooks/useQueryDebounce'
import { getDiseaseApi } from 'services/desease'
import { useQuery } from 'react-query'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const debounceText = useQueryDebounce(searchText)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data, isFetching, isError } = useQuery(['DiseasesName', debounceText], () => getDiseaseApi(debounceText), {
    cacheTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    useErrorBoundary: false,
    // placeholderData: [],
    suspense: true,
    enabled: searchText.length >= 1,
  })

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className={styles.searchContainer}>
      <p className={styles.description}>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </p>

      <div className={styles.searchInputWarrper}>
        <SearchIcon />
        <input
          className={styles.searchInput}
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder='질환명을 입력해 주세요.'
        />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </div>
    </div>
  )
}

export default Search
