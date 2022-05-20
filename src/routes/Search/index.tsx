import { ChangeEvent, useState } from 'react'

import { SearchIcon } from 'assets'
import styles from './Search.module.scss'

const Search = () => {
  const [searchText, setSearchText] = useState('')

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
        <span>추천 검색어</span>
      </ul>
    </div>
  )
}

export default Search
