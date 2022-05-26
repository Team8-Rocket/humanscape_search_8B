# MadUp 광고 데이터 통합 대시보드 및 매체 현황관리

## 📜 프로젝트 개요
Victory.js를 활용하여 광고 데이터 통합 대시보드 및 매체 현황관리 차트 생성
## 🔗 프로젝트 배포

### ⭐ Main API 🔗 https://madup-8b.netlify.app/

## ⚙ 기술 스택
  <img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
  <img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
  <img src="https://img.shields.io/badge/Redux-v8.0.1-blue"/>
  <img src="https://img.shields.io/badge/React Router Dom-v6.0-blue"/>
  
    📈차트 라이브러리: Victory.js📉

## 🎄 프로젝트 트리

```
src
 ┣ assets       // svg 및 json
 ┣ components   // 공통 컴포넌트
 ┣ hooks        // Custom Hooks
 ┣ routes       // 페이지
 ┣ states       // 전역 상태관리
 ┣ store        // 전역 상태
 ┣ styles       // style
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
## 🖼 실행 이미지
- 하단 구현방법에 상세 이미지와 함께 설명하였습니다. 
<p align="center">
<img width="500" alt="스크린샷 2022-05-26 오전 8 53 08" src="https://user-images.githubusercontent.com/87363088/170388030-52937e2d-d071-4099-b439-65c055c9cf02.gif" />
</p>

## 🔧 주요 기능

1) [통합 광고 현황](#1-통합-광고-현황)  
2) [매체 현황](#2-매체-현황)
3) [광고 관리](#3-광고-관리)


### 1) 통합 광고 현황
- 카테고리별로 설정한 기간의 총 합을 보여줌
- 2가지의 지표를 선택하여 라인차트로 비교 가능
- 주간, 일간별로 그래프 제공
- 그래프 위으 정확한 값을 툴팁으로 제공
<p align="center">
<img width="800" alt="매체 현황" src="https://user-images.githubusercontent.com/87363088/170390494-3ef2e774-07b1-4192-ac4a-5a8512c99648.gif">
</p>

### 2) 매체 현황
- 대시 보드에서 설정한 기간의 데이터를 축적하여 각 회사별로 카테고리에 따른 백분위를 확인 가능
- 스택 차트에 마우스 호버시 정확한 원하는 백분위 값을 알 수 있음
<p align="center">
<img width="800" alt="매체 현황" src="https://user-images.githubusercontent.com/87363088/170390491-e2d62421-6d6c-4de6-ab2a-3a91690d7466.gif">
</p>

### 3) 광고 관리
- **'전체 공고'**, **'진행 중'**, **'중단 됨'** 세 가지 상태에 따른 필터링 가능
<p align="center">
<img width="800" alt="광고 관리" src="https://user-images.githubusercontent.com/87363088/170390489-76dffe7d-b38e-404e-9a2a-6a2ace5a0b67.gif">
</p>


## 🔥 어려웠던 점 및 아쉬운 점
- Hook 의존성 관리의 어려움
- 데이터 구조 설계 각 차트 및 테이블을 그릴때 데이터를 뿌리기 쉽게 좀 더 생각해봐야함
- 


## 💎 현재 이슈
- 다른 날짜의 데이터를 조회하기 위해 DatePicker에서 시작 날짜 선택시 에러 발생, 끝나는 날짜 선택하면 정상 작동
- css 스타일링

## Built with
| ![Seung-wan](https://avatars.githubusercontent.com/u/51105841?v=4) | ![bu-geon](https://avatars.githubusercontent.com/u/87363088?v=4) | ![kyhyun](https://avatars.githubusercontent.com/u/77887712?v=4) | ![hsw824](https://avatars.githubusercontent.com/u/79175916?v=4) |
|:---:|:---:|:---:|:---:|
|[**유승완**](https://github.com/Seung-wan)|[**김부건**](https://github.com/bu-geon)|[**김영현**](https://github.com/kyhyun)|[**홍성우**](https://github.com/bisari31)|

