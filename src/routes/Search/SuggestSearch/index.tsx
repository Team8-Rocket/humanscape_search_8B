import { memo } from 'react'
import { useQuery } from 'react-query'
import cx from 'classnames'

import { useAppSelector } from 'hooks'
import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'
import { getItemIndex } from 'store/searchIndex'

import styles from '../Search.module.scss'
import { SearchIcon } from 'assets'
import HighlightText from './HighlightText'

const SuggestSearch = ({ query }: { query: string }) => {
  const index = useAppSelector(getItemIndex)
  const searchUrl = 'https://clinicaltrialskorea.com/studies?condition='

  const { data = [], isLoading }: { data: IItem[] | undefined; isLoading?: boolean } = useQuery(
    ['diseaseList', query],
    () => getDiseaseApi(query),
    {
      refetchOnWindowFocus: false,
      enabled: !!query,
      staleTime: 6 * 10 * 1000,
      suspense: true,
      retryOnMount: false,
    }
  )
  if (!isLoading && data.length === 0) return <span>{query} 검색 결과가 없습니다.</span>

  return (
    <>
      <span>추천 검색어</span>
      {data?.map((item: IItem, i: number) => (
        <li key={item.sickCd} className={cx({ [styles.isFocus]: index === i })}>
          <SearchIcon />
          <a href={searchUrl + item.sickNm}>
            <HighlightText query={query} text={item.sickNm} />
          </a>
        </li>
      ))}
    </>
  )
}

export default memo(SuggestSearch)
