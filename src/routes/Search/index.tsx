import { ChangeEvent, Suspense, useRef, useState } from 'react'
import { useQueryDebounce } from 'hooks'
import { useMount } from 'react-use'
import SuggestSearch from './SuggestSearch'
import Header from './Header/Header'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets'
import { ErrorBoundary } from 'react-error-boundary'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedSearchText = useQueryDebounce(searchText)
  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  useMount(() => {
    inputRef.current?.focus()
  })

  return (
    <div className={styles.searchContainer}>
      <Header />
      <p className={styles.description}>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </p>

      <div className={styles.searchInputWarrper}>
        <SearchIcon />
        <input
          ref={inputRef}
          className={styles.searchInput}
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder='질환명을 입력해 주세요.'
        />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </div>
      <ul className={styles.dropdown}>
        <ErrorBoundary fallback={<div>server error</div>}>
          <Suspense fallback={<div>loading...</div>}>
            <SuggestSearch query={debouncedSearchText} />
          </Suspense>
        </ErrorBoundary>
      </ul>
    </div>
  )
}

export default Search
