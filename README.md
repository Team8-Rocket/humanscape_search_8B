# Humanscape 검색어 추천이 있는 검색창

## 📜 프로젝트 개요
API로 불러온 질병명 검색 추천어를 제시
## 🔗 프로젝트 배포

### ⭐ Main API 🔗 https://8b-humanscape.netlify.app/

- 초성검색 구현버전
Develop JSON 🔗 https://8b-humanscape-develop.netlify.app/

## ⚙ 기술 스택
  <img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
  <img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
  <img src="https://img.shields.io/badge/Redux/toolkit-v1.8.1-blue"/>
  <img src="https://img.shields.io/badge/React Router Dom-v6.3.0-blue"/>

```
그 외 추가 라이브러리
  axios, classnames, react-error-boundary, react-query, react-use, store, uuid
```

## 🎄 프로젝트 트리

```
src
 ┣ assets       // svg 파일
 ┣ components   // 공통으로 사용하는 컴포넌트
 ┣ hooks        // Custom Hooks
 ┣ routes       // 페이지
 ┣ services     // API 호출 관련
 ┣ store        // 전역 상태
 ┣ styles       // 전역 style
 ┣ types        // 필요한 type 정의
```
## 📍 Getting Started / 어떻게 시작하나요?

1. yarn 설치하기
```sh
$ npm i yarn
```

2. Repository 클론
```sh
$ git clone git@github.com:Team8-Rocket/humanscape_search_8B.git
```

3. Dependecies 설치
```sh
$ yarn install
```

4. Run 실행
```sh
$ yarn start
```

※ **.env 키 추가**

1. https://www.data.go.kr/data/15001675/openapi.do 해당 API에서 '질병명칭/코드조회 API' 키 발급 (디코딩키 사용해주시면 당신은 아름다운 사람).
2. `.env` 파일 생성 후 키 값 넣기. (`.env.copy` 에서 복사)
## 🖼 실행 이미지
- 하단 구현방법에 상세 이미지와 함께 설명하였습니다. 
<p align="center">
<img
  src="https://user-images.githubusercontent.com/87363088/169679052-bc7fd74e-a787-4a71-ad37-466233a956f5.gif"
  width="300" alt="반응형 UI 디자인"
/></p>

1. 검색창에 찾고자 하는 질환명을 입력합니다.

2. 검색한 질환명에 따라 추천 검색어가 검색창 하단에 보이게 됩니다.

3. 추천 검색어는 키보드와 마우스로 이동이 가능하며 스크롤 최하단으로 이동 시 자동으로 다음 추천 검색어들이 노출됩니다.


---
## 🔧구현 방법

<목차>

1) [질환명 검색시 추천](#1-질환명-검색시-추천)  
2) [검색어 없을 시 '검색어 없음'](#2-검색어-없을-시-검색어-없음)   
3) [API 호출 최적화](#3-api-호출-최적화)
4) [키보드로 추천 검색어 이동](#4-키보드로-추천-검색어-이동) 
5) [도전 과제: 배포](#5-도전-과제-배포) 
6) [도전 과제: 퍼지 문자열 검색](#6-도전-과제-퍼지-문자열-검색) 
7) [도전 과제: 사용자가 입력한 질환명 볼드처리](#7-도전-과제-사용자가-입력한-질환명-bold-처리) 
8) [추가 작업: Pagenation](#8-추가-작업-pagenation)  
9) [추가 작업: 다크모드](#9-추가) 
10) [추가 작업: 검색결과 클릭시 실제 검색 연결](#10-추가-작업-검색결과-클릭시-실제-검색-연결)

---
### 1) 질환명 검색시 추천
- `useInfiniteQuery`로 api 호출후에 검색 결과를 반환하면 렌더링을하고, 캐시에도 추가

### 2) 검색어 없을 시 '검색어 없음'
- api에서 해당 검색어가 없을 시 falsy값을 반환하여 검색어 없음 노출

### 3) API 호출 최적화
- react-query를 이용하여 옵션에 staleTime를 지정하여 10 분 동안 데이터를 저장
- refetchOnWindowFocus와 retryOnMount를 설정하여 창이 focus될때마다 랜더링을 하지 않게 설정하였다.
- react suspense와 errorboundary를 이용하여 데이터에 상태에 따라 페이지를 처리
- api 서버 요청 에러 상황(데이터가 없거나, 서버 오류 등)은 react-query에서 error 반환시 상위 에러 바운더리에서 에러 캐치
- 로컬 캐시에 저장된 내용은 api를 다시 호출하지 않고, 바로 캐시를 불러옴
### 4) 키보드로 추천 검색어 이동
<p align="center">
<img
  src="https://user-images.githubusercontent.com/87363088/169676251-5116b718-abef-4df8-9745-0233145c2fa8.gif"
  width="300" alt="키보드다운이벤트"
/>
</p>

- 컴포넌트 분리로 인해 `Redux Toolkit`을 사용하여 전역관리
 
`const index = useAppSelector(getItemIndex)`

- KeyboardEvent로 입력받은 키로 컨트롤.

```
// map으로 접근한 li 요소의 index값 증가
if (e.key === 'ArrowDown') {
  dispatch(incrementItemIndex())
  ...
}

// map으로 접근한 li 요소의 index값 감소
if (e.key === 'ArrowUp'){
  dispatch(decrementItemIndex())
  ...
}

// pagination으로 인한 hover 스크롤 이동 구현
keyIndexRef.current?.scrollTo({ ... })

prePageNumber = page.currentPage - 1
cx({ [styles.isFocus]: index === i + prePageNumber * 10 })

```
- Mac에서 한글로 입력시 2번씩 호출되는 문제 해결
`e.nativeEvent.isComposing`
- 맨 처음 시작했을 때 Input에 focus
`inputRef.current?.focus()`


### 5) 도전 과제: 배포
- netlify를 활용하여 배포
- secret key를 환경변수로 분리함
- CORS 문제로 다음 설정을 추가함.
- `/package.json`에 `"proxy": "http://apis.data.go.kr"` 추가
- `/netlify.toml`에 `[[redirects]]` 추가
- axios 호출 부분에 하단 내용 추가
```
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
```

### 6) 도전 과제: 퍼지 문자열 검색
- JSON 데이터로 초성검색 구현 

### 7) 도전 과제: 사용자가 입력한 질환명 Bold 처리
- 사용자가 입력한 Query로 검색된 문자열을 `split()`한 후, `reduce()`를 이용해서 각 문자열  사이에 `<strong>{query}</strong>`를 push해서 합침
- 처음에 `replace()`와 정규표현식을 이용해서 한번에 바꿨지만, 해당 리턴값이 문자열이여서 추가적인 작업이 필요해서 패스
- `split()`한 문자열에 `join(<strong>{query}</strong>)`로 합치려고 시도해봤지만, 해당 결과도 `join()`의 `seperator`로 문자열만 들어갈수 있어서 해당 방법도 패스
- 어쩔수 `reduce()`사용

### 8) 추가 작업: Pagenation
<p align="center">
<img
  src="https://user-images.githubusercontent.com/87363088/169679743-4bd24d84-08d4-4b2a-8a2f-6a2d6e02b21c.gif"
  width="300" alt="페이지네이션"
/></p>

- `useInfinityQuery`를 이용해서 Pagenation 구현
- 더 불러오기를 클릭하면 `fetchNextPage` 함수가 실행되어 다음 페이지를 가져옴
- `InterSectionObserver` API로 무한 스크롤을 구현했으나, 스크롤에 따라 API 호출이 발생하는 문제로 인해 버튼 이벤트로 `fetchNextPage` 함수가 동작되도록 해서 API 호출을 제한하였음


### 9) 추가 
<p align="center">
<img
  src="https://user-images.githubusercontent.com/87363088/169679130-7ed16ff8-57f7-40a9-b36a-80f17f2b9f3c.gif"
  width="300" alt="테마 다크모드"
/></p>

- redu에 initial값을 `{darkMode:false}`로 지정하고, action을 추가하여  
button click시 darkmode 값을 변경, toolkit과 loc에 저장e 데이컴포넌트가 마운트 될 때 localstorage에서 값을 가져온 후 setAttribute을 이용하여<br/>documentElement에 mode값을 저장
- 저장된 속성을 가지고 css에서 색상을 지정한 후 css적용

### 10) 추가 작업: 검색결과 클릭시 실제 검색 연결
<p align="center">
<img
  src="https://user-images.githubusercontent.com/87363088/169676431-97d425ce-cde1-41f4-8171-ec48ff0bff14.gif"
  width="300" alt="검색결과 클릭시 실제 검색 연결"
/></p>

- a 태그로 li 요소 클릭시, 실제 검색내용을 받아 이동할 수 있도록 구현.
```
const SEARCH_URL = 'https://clinicaltrialskorea.com/studies?condition='
<a href={SEARCH_URL + item.sickNm}>
```
## 🔥 어려웠던 점
- 배포시 CORS 적용
- API에서 발생된 다양한 에러 처리
- git 협업에서 merge
- 검색어 추천 개수가 10개보다 많은 경우, 무한스크롤 적용시 api를 여러번 호출하는 이슈를 잡아내기 어려워서 클릭시 다음 페이지를 로드하도록 구현

## 💎 현재 이슈
- 키보드 클릭 이벤트로 리스트 이동시 가능 범위를 벗어남

## Built with
| ![lisarnjs](https://avatars.githubusercontent.com/u/92686349?v=4) |![bu-geon](https://avatars.githubusercontent.com/u/87363088?v=4)|![zellytozelly](https://avatars.githubusercontent.com/u/51311690?v=4)|![kyhyun](https://avatars.githubusercontent.com/u/77887712?v=4)|![bisari31](https://avatars.githubusercontent.com/u/98396758?v=4)|
|:---:|:---:|:---:|:---:|:---:|
|[**권은서**](https://github.com/lisarnjs)|[**김부건**](https://github.com/bu-geon)|[**김수진**](https://github.com/zellytozelly)|[**김영현**](https://github.com/kyhyun)|[**이상원**](https://github.com/bisari31)|
