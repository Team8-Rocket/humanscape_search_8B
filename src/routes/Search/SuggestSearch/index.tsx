import React from 'react'
import { useQuery } from 'react-query'

import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'

import { SearchIcon } from 'assets'

const SuggestSearch = ({ query }: { query: string }) => {
  const { data }: IItem[] | any = useQuery(['diseaseList', query], () => getDiseaseApi(query), {
    refetchOnWindowFocus: false,
    enabled: !!query,
    staleTime: 6 * 10 * 1000,
    suspense: true,
    retryOnMount: false,
  })

  if (query.length && data[0] === undefined) return <li>{query} 값이 없습니다.</li>
  return (
    <>
      <span>추천 검색어</span>
      {data?.map((item: IItem) => (
        <li key={item.sickCd}>
          <SearchIcon />
          {item.sickNm}
        </li>
      ))}
    </>
  )
}

export default React.memo(SuggestSearch)
