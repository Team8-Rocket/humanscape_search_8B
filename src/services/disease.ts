import axios from 'axios'
import { ISearchApiRes } from 'types/search'

const BASE_URL = '/B551182/diseaseInfoService/getDissNameCodeList'

const getDiseaseOptions = {
  ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
  pageNo: 1,
  sickType: 2,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

export const getDiseaseApi = (query: string) =>
  axios.get<ISearchApiRes>(BASE_URL, {
    params: {
      searchText: query,
      ...getDiseaseOptions,
    },
  })
