import { memo } from 'react'
import { useQuery } from 'react-query'
import cx from 'classnames'

import { useAppSelector } from 'hooks'
import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'
import { getItemIndex } from 'store/searchIndex'

import styles from '../Search.module.scss'
import { SearchIcon } from 'assets'

const SuggestSearch = ({ query }: { query: string }) => {
  const index = useAppSelector(getItemIndex)
  const searchUrl = 'https://clinicaltrialskorea.com/studies?condition='

  const { data }: { data: IItem[] | undefined } = useQuery(['diseaseList', query], () => getDiseaseApi(query), {
    refetchOnWindowFocus: false,
    enabled: !!query,
    staleTime: 6 * 10 * 1000,
    suspense: true,
    retryOnMount: false,
  })
  // if (query.length && data.length === 0) return <span>{query} 값이 없습니다.</span>
  if (!data) return <span>{query} 검색 결과가 없습니다.</span>
  return (
    <>
      <span>추천 검색어</span>
      {data?.map((item: IItem, i: number) => (
        <li key={item.sickCd} className={cx({ [styles.isFocus]: index === i })}>
          <SearchIcon />
          <a href={searchUrl + item.sickNm}>{item.sickNm}</a>
        </li>
      ))}
    </>
  )
}

export default memo(SuggestSearch)
