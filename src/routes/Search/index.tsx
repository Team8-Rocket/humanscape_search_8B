import { ChangeEvent, useState } from 'react'
import { useQueryDebounce } from 'hooks'
import searchKeyWords from 'assets/json/searchKeyWords.json'

import SuggestSearch from './SuggestSearch'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets'
import { IItem } from 'types/search'
// import { result } from 'lodash'

const reESC = /[\\^$.*+?()[\]{}|]/g
const reChar = /[가-힣]/
const reConsonant = /[ㄱ-ㅎ]/
const offset = 44032

const con2syl = Object.fromEntries(
  'ㄱ:가,ㄲ:까,ㄴ:나,ㄷ:다,ㄸ:따,ㄹ:라,ㅁ:마,ㅂ:바,ㅃ:빠,ㅅ:사'.split(',').map((v) => {
    const entry: (string | number)[] = v.split(':')
    if (typeof entry[1] === 'string') {
      entry[1] = entry[1].charCodeAt(0)
    }
    return entry
  })
)

const chPattern = (ch: string) => {
  let r
  if (reConsonant.test(ch)) {
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ']
    const end = begin + 587
    r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  } else if (reChar.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset
    if (chCode % 28 > 0) return ch
    const begin = Math.floor(chCode / 28) * 28 + offset
    const end = begin + 27
    r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  } else r = ch.replace(reESC, '\\$&')
  return `(${r})`
}
const fuzzyFunc = (v: string) => {
  const pattern = new RegExp(v.split('').map(chPattern).join('.*?'), 'i')
  return pattern
}
const { items } = searchKeyWords.response.body

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [fuzzyArr, setFuzzyArr] = useState([{ sickCd: '0', sickNm: '' }])
  const debouncedSearchText = useQueryDebounce(searchText)

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
    const resultArr = items.item.filter((item) => fuzzyFunc(e.currentTarget.value).test(item.sickNm))
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
