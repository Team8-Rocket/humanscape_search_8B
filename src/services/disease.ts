import axios from 'axios'
import { ISearchApiRes } from 'types/search'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
const BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`

const getDiseaseOptions = {
  ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
  pageNo: 1,
  sickType: 1,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

export const getDiseaseApi = async (query: string) => {
  console.log(`query요청: ${query}`)
  const response = await axios.get<ISearchApiRes>(BASE_URL, {
    params: {
      searchText: query,
      ...getDiseaseOptions,
    },
  })

  const data = response.data.response.body.items.item
  if (!Array.isArray(data)) {
    return [data]
  }
  return data
}
