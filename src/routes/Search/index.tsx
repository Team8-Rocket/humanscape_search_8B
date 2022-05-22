import { ChangeEvent, useState } from 'react'
import { useQueryDebounce } from 'hooks'
import searchKeyWords from 'assets/json/searchKeyWords.json'

import SuggestSearch from './SuggestSearch'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets'
import { IItem } from 'types/search'
import Fuzzy from './SuggestSearch/Fuzzy'
// import { result } from 'lodash'

const { items } = searchKeyWords.response.body

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [fuzzyArr, setFuzzyArr] = useState([{ sickCd: '0', sickNm: '' }])
  const debouncedSearchText = useQueryDebounce(searchText)

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
    const resultArr = items.item.filter((item) => Fuzzy(e.currentTarget.value).test(item.sickNm))
    setFuzzyArr(resultArr)
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
      <section className={styles.fuzzyDown}>
        <h3>추천 검색어</h3>
        <ul>
          {fuzzyArr.map((arr: IItem) => (
            <li key={arr.sickCd}>
              <button type='button'>{arr.sickNm}</button>
            </li>
          ))}
        </ul>
      </section>

      {/* <ul className={styles.dropdown}>
        <SuggestSearch query={debouncedSearchText} />
      </ul> */}
    </div>
  )
}

export default Search
