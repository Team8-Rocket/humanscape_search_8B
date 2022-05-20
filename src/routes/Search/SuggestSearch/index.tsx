import { useQuery } from 'react-query'

import { getDiseaseApi } from 'services/disease'
import { IItem } from 'types/search'

import { SearchIcon } from 'assets'

const SuggestSearch = ({ query }: { query: string }) => {
  const { data } = useQuery(['diseaseList', query], () => getDiseaseApi(query), {
    refetchOnWindowFocus: false,
    enabled: !!query,
    staleTime: 6 * 10 * 1000,
    suspense: true,
  })

  return (
    <>
      <span>추천 검색어</span>
      {data?.data.response.body.items.item.map((item: IItem) => (
        <li key={item.sickCd}>
          <SearchIcon />
          {item.sickNm}
        </li>
      ))}
    </>
  )
}

export default SuggestSearch
