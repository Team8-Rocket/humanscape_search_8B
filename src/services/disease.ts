import axios from 'axios'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
const BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`

const getDiseaseOptions = {
  ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
  sickType: 1,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

let count = 0
export const getDiseaseApi = async (query: string, pageNo: number) => {
  count += 1
  // eslint-disable-next-line no-console
  console.log(`query요청: ${query}, api 요청 횟수: ${count}`)
  const response = await axios.get(BASE_URL, {
    params: {
      searchText: query,
      pageNo,
      ...getDiseaseOptions,
    },
  })
  const data = response.data.response.body.items.item
  const { pageNo: currentPage, totalCount } = response.data.response.body

  if (data === undefined) return { items: [], currentPage, totalCount }
  if (!Array.isArray(data)) return { items: [data], currentPage, totalCount }

  return { items: data, currentPage, totalCount }
}
