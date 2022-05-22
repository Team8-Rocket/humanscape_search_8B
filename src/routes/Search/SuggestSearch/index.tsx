import { memo } from 'react'
import { useInfiniteQuery } from 'react-query'
import cx from 'classnames'

import { useAppSelector } from 'hooks'
import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'
import { getItemIndex } from 'store/searchIndex'
import Loading from 'components/Loading'

import styles from '../Search.module.scss'
import { SearchIcon } from 'assets'
import HighlightText from './HighlightText'

const SEARCH_URL = 'https://clinicaltrialskorea.com/studies?condition='

const SuggestSearch = ({ query }: { query: string }) => {
  const index = useAppSelector(getItemIndex)
  let prePageNumber: number = 0

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ['diseaseList', query],
    ({ pageParam = 1 }) => getDiseaseApi(query, pageParam),
    {
      refetchOnWindowFocus: false,
      enabled: !!query,
      staleTime: 6 * 10 * 1000,
      suspense: true,
      retryOnMount: false,
      useErrorBoundary: true,
      getNextPageParam: (lastPage) => {
        const { currentPage } = lastPage
        if (currentPage * 10 < lastPage.totalCount) return currentPage + 1
        return undefined
      },
    }
  )

  if (!isLoading && data!.pages[0].items.length === 0) return <span>{query} 검색 결과가 없습니다.</span>
  return (
    <>
      <span>추천 검색어</span>
      {data?.pages.map((page) => {
        prePageNumber = page.currentPage - 1
        return page.items.map((item: IItem, i: number) => (
          <li key={item.sickCd} className={cx({ [styles.isFocus]: index === i + prePageNumber * 10 })}>
            <SearchIcon />
            <a href={SEARCH_URL + item.sickNm}>
              <HighlightText query={query} text={item.sickNm} />
            </a>
          </li>
        ))
      })}
      {hasNextPage && (
        <button type='button' onClick={() => fetchNextPage()}>
          더 불러오기
        </button>
      )}
      {isFetchingNextPage && <Loading />}
    </>
  )
}

export default memo(SuggestSearch)
