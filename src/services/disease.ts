import axios from 'axios'
import { ISearchApiRes } from 'types/search'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
const BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`

const getDiseaseOptions = {
  ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
  sickType: 1,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

export const getDiseaseApi = (query: string, pageNo: number) =>
  axios.get<ISearchApiRes>(BASE_URL, {
    params: {
      searchText: query,
      pageNo,
      ...getDiseaseOptions,
    },
  })
