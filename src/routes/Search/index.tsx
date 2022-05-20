import { ChangeEvent, useState } from 'react'
import { useQueryDebounce } from 'hooks'

import SuggestSearch from './SuggestSearch'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useQueryDebounce(searchText)

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

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
      <ul className={styles.dropdown}>
        <SuggestSearch query={debouncedSearchText} />
      </ul>
    </div>
  )
}

export default Search
