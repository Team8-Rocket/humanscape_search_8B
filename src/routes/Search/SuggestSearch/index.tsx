import { useInfiniteQuery } from 'react-query'
import { useRef } from 'react'

import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'
import { useObserver } from 'hooks'

import { SearchIcon } from 'assets'

const SuggestSearch = ({ query }: { query: string }) => {
  const pageEndPointRef = useRef<HTMLDivElement>(null)
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['diseaseList', query],
    ({ pageParam = 1 }) => getDiseaseApi(query, pageParam),
    {
      refetchOnWindowFocus: false,
      enabled: !!query,
      staleTime: 6 * 10 * 1000,
      suspense: true,
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.data.response.body.pageNo
        const totalPage = Math.ceil(lastPage.data.response.body.totalCount / 10)
        return currentPage < totalPage ? currentPage + 1 : undefined
      },
    }
  )

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage()
  useObserver({
    target: pageEndPointRef,
    onIntersect,
    hasNextPage,
  })

  return (
    <>
      <span>추천 검색어</span>
      {data?.pages.map((page) =>
        page.data.response.body.items.item.map((item: IItem) => (
          <li key={item.sickCd}>
            <SearchIcon />
            {item.sickNm}
          </li>
        ))
      )}
      <div ref={pageEndPointRef} />
    </>
  )
}

export default SuggestSearch
