import { KeyboardEvent, ChangeEvent, Suspense, useRef, useState } from 'react'
import { useMount } from 'react-use'
import { ErrorBoundary } from 'react-error-boundary'
import { useAppDispatch, useAppSelector, useQueryDebounce } from 'hooks'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets'

import { getItemIndex, setItemIndex } from 'store/searchIndex'
import SuggestSearch from './SuggestSearch'
import Loading from 'components/Loading'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedSearchText = useQueryDebounce(searchText)
  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const keyIndexRef = useRef<HTMLUListElement>(null)
  const index = useAppSelector(getItemIndex)
  const dispatch = useAppDispatch()

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    let currentValue
    const isCorrectKey = e.key === 'ArrowDown' || 'ArrowUp' || 'Escape'
    if (!isCorrectKey) return
    if (!debouncedSearchText || e.key === 'Escape') dispatch(setItemIndex(-1))

    if (e.key === 'ArrowDown') {
      dispatch(setItemIndex(index + 1))
      currentValue = keyIndexRef.current?.childNodes[index + 2]?.textContent
    }

    if (e.key === 'ArrowUp') {
      dispatch(setItemIndex(index - 1))
      currentValue = keyIndexRef.current?.childNodes[index]?.textContent
      if (index < 0) dispatch(setItemIndex(-1))
    }

    if (currentValue === undefined || currentValue === null) currentValue = searchText
    setSearchText(currentValue)
  }

  useMount(() => {
    inputRef.current?.focus()
  })

  return (
    <div className={styles.searchContainer}>
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
          onKeyDown={handleKeyDown}
          placeholder='질환명을 입력해 주세요.'
        />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </div>
      {debouncedSearchText.trim().length > 0 && (
        <ul className={styles.dropdown} ref={keyIndexRef}>
          <ErrorBoundary fallback={<span>server error</span>}>
            <Suspense fallback={<Loading />}>
              <SuggestSearch query={debouncedSearchText} />
            </Suspense>
          </ErrorBoundary>
        </ul>
      )}
    </div>
  )
}

export default Search
