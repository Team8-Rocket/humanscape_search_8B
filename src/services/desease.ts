import axios from 'axios'

const BASE_URL =
  'https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList'

export const getDiseaseApi = (query: string) =>
  axios.get(BASE_URL, {
    params: {
      ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
      pageNo: 1,
      numOfRows: 10,
      sickType: 1,
      mdeTp: 2,
      diseaseType: 'SICK_NM',
      searchText: query,
    },
  })
