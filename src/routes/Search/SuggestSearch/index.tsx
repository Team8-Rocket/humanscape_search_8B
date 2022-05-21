import { memo } from 'react'
import { useQuery } from 'react-query'

import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'

import { SearchIcon } from 'assets'
import HighlightText from './HighlightText'

const SuggestSearch = ({ query }: { query: string }) => {
  const { data }: { data: IItem[] | undefined } = useQuery(['diseaseList', query], () => getDiseaseApi(query), {
    refetchOnWindowFocus: false,
    enabled: !!query,
    staleTime: 6 * 10 * 1000,
    suspense: true,
    retryOnMount: false,
  })
  // if (query.length && data.length === 0) return <li>{query} 값이 없습니다.</li>
  if (!data) return <li>{query} 값이 없습니다.</li>
  return (
    <>
      <span>추천 검색어</span>
      {data?.map((item: IItem) => (
        <li key={item.sickCd}>
          <SearchIcon />
          <HighlightText query={query} text={item.sickNm} />
        </li>
      ))}
    </>
  )
}

export default memo(SuggestSearch)
