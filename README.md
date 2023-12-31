# CONCON

## 프로젝트 소개
<img width="500" alt="스크린샷 2023-07-08 오전 5 59 52" src="https://github.com/MintaekCho/consert-app/assets/105726931/6826c45b-bd8f-46c1-9f26-973403657f78">

<br />
<br />


- <b>CONCON</b>은 아티스트와 팬을 연결해주는 서비스입니다. 
- 내가 좋아하는 아티스트의 콘서트일정, 작업한 앨범 정보, 관련 유튜브 영상을 한눈에 볼 수 있고 아티스트를 응원하는 팬명록을 남기며 아티스트와 팬들끼리 커뮤니케이션 할 수 있습니다. 
- 크롤링한 데이터를 바탕으로 현재 인기있는 콘서트 TOP10과 콘서트 정보(캐스팅, 장소, 예매사이트 등)를 제공합니다. 


<br />
배포링크 - <a href="https://consert-app.vercel.app/" target="_blank">CONCON</a>
<br />
사용자 피드백 반영하여 깃허브로 버전관리 진행 -  
<a href="https://github.com/MintaekCho/consert-app/releases">릴리즈노트</a>

## 팀 소개

|    조민택    |    고은서   |
| :--------: | :--------: |
| <img width="220" height="220" alt="스크린샷 2023-07-08 오전 5 52 12" src="https://github.com/MintaekCho/consert-app/assets/105726931/867bb3d7-cdb1-4bc4-a387-c2fb658f1ed6">    |<img width="220" height="220" alt="스크린샷 2023-07-08 오전 5 52 37" src="https://github.com/MintaekCho/consert-app/assets/105726931/aec33733-99ec-4eca-8a8b-91ab6ab8d444">       |
|<a href="https://github.com/MintaekCho">깃허브</a> | <a href="https://github.com/MintaekCho">깃허브</a>   |
|<a href="https://portfolio-mintaekcho.vercel.app/">포트폴리오</a> | <a href="https://eunseo-portfolio.vercel.app/#Education">포트폴리오</a> |
<br>


## 기술 스택

| TypeScript |  NextJS  |  SWR    |  Tailwind |  Python |  Selenium |  mongoDB |
| :--------: | :------: | :-----: | :-----:   | :-----: | :-----:   | :-----:  |
|   ![ts]    | ![next]  | ![swr]  | ![tailwind]  | ![python] | ![selenium]  | ![mongodb] |

<br>

## 주요 기능

|                                                              |                                                              |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|     **로그인**    |    **아티스트 조회** |
| ![로그인](https://github.com/MintaekCho/consert-app/assets/105726931/96f55020-8e17-4485-bc71-ee31cc433105) | ![아티스트페이지](https://github.com/MintaekCho/consert-app/assets/105726931/829bde1a-2228-420f-a7e7-a5663675b02f) |
|     **팬명록**     |   **관련 유튜브 영상** |
| ![팬명록](https://github.com/MintaekCho/consert-app/assets/105726931/5b8e8df7-fd66-43d8-ad05-0f839c13af8c) | ![관련유튜브](https://github.com/MintaekCho/consert-app/assets/105726931/8c6f7caa-4265-48ee-b352-492f1f54e84c) |
|  **콘서트 조회** | **검색-(아티스트,콘서트)** |
| ![콘서트페이지](https://github.com/MintaekCho/consert-app/assets/105726931/9ec22180-7569-45d0-86de-d11bb26fcac5) | ![검색](https://github.com/MintaekCho/consert-app/assets/105726931/4dba4d70-1620-4984-b915-e2cf6a4b02d2) |
| **북마크** | **카카오지도** |
| ![북마크](https://github.com/MintaekCho/consert-app/assets/105726931/fd0fd393-d9f2-4b33-ab61-86001b818f8c) | ![카카오지도](https://github.com/MintaekCho/consert-app/assets/105726931/ee5b88d8-5276-4ad5-9e74-a2af9ca5bf6d)  |
|   **캘린더UI**    |    **Comming(다가오는 일정)** |
| ![2023-07-11 13 44 40](https://github.com/MintaekCho/consert-app/assets/105726931/d4c3555b-f085-46d3-8535-145f2b5b964b)|![2023-07-11 13 43 43](https://github.com/MintaekCho/consert-app/assets/105726931/18f35e3b-d9e7-4494-a818-db0f3e65aca3) |


<br>

## 역할 & 배운 점 & 아쉬운 점

### 조민택
#### [Frontend]
- 북마크 기능 구현 (Optimistic UI를 통한 사용자 UX 개선) - useSWR, Mutate
  - [블로그 링크](https://alsxor5.tistory.com/116)
- 팬명록 CRUD 구현
- 캘린더 UI 구현 - 캘린더 날짜 클릭 시 해당 날짜에 진행하는 콘서트 일정 제공
- NextAuth 라이브러리를 사용하여 구글 Oauth 로그인 구현
- Atomic Design Pattern 적용하여 컴포넌트 재사용성, 유지보수성 향상
- 카카오지도 API 사용하여 콘서트 장소 지도뷰 구현
  - 발생 이슈관련 [블로그 링크](https://alsxor5.tistory.com/117) 
- 유튜브 API 사용하여 아티스트 관련 유튜브 영상 구현

  
#### [Backend]
- 파이썬 셀레니움 이용한 데이터 크롤링(콘서트, 앨범, 아티스트)
- AWS Lambda, CloudWatch 이용한 크롤링 자동화 구현
  - [블로그 링크](https://alsxor5.tistory.com/118)
- 백엔드 API 구현 (콘서트, 아티스트, 앨범, 팬명록, 북마크, 랭킹 등) 

### 고은서 Frontend dev
- `검색` 기능 : FormData와 useSWR를 이용해 검색 기능 구현
  - [블로그 링크](https://velog.io/@koyk0408/react-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84-%EA%B2%80%EC%83%89%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
- `무한스크롤` 기능 : useSWRInfinite와 IntersectionObserver 사용해 무한스크롤 Hook 구현
  - [블로그 링크](https://velog.io/@koyk0408/react-%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4-2with-IntersectionObserver)
  - [관련PR 링크](https://github.com/MintaekCho/consert-app/pull/30)
- `페이지네이션` 기능 : useState, mutate 사용해 페이지네이션 기능 구현
  - [관련 PR 링크](https://github.com/MintaekCho/consert-app/pull/37)
- `tab` : 탭 Hook, UI 컴포넌트 구현
  - [관련 PR 링크](https://github.com/MintaekCho/consert-app/pull/46)
- 반응형 대응
- [디자인](https://www.figma.com/file/dQ5Aj0hLclSCgWdi3suSxL/Concert-service?type=design&node-id=0%3A1&mode=design&t=7rvlt3K7RydIeeI6-1)

<p align="justify">

</p>

<br>


### ✉️ Commit  Message  

|  Message   | 설명                                                  |
| :--------: | :---------------------------------------------------- |
|   [Feat]   | 새로운 기능을 추가할 경우 ex) [feat] 로그인 기능 추가 |
|   [Fix]    | 버그 수정에 대한 커밋 |
|   [init]   | 프로젝트 초기 생성 |
| [Refactor] | 효율을 위한 코드 리팩토링에 대한 커밋 |
| [Comment] | Comment |
|  [Design]  | CSS 등 사용자 UI 디자인 변경 |
|  [Style]  | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 |
|  [Chore]  | 위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등) |
|  [test]    | test 관련한 코드의 추가, 수정 |
|  [Rename] | 파일 혹은 폴더명 수정하거나 옮기는 경우 |
|  [Remove]  | 파일을 삭제하는 작업만 수행하는 경우 |

<!-- Stack Icon Refernces -->

[next]: https://github.com/MintaekCho/consert-app/assets/105726931/fcd8c7a7-2281-41d2-aae0-39fa085279e6
[ts]: https://github.com/MintaekCho/consert-app/assets/105726931/90341ec6-e155-419e-b9ca-6c3e0ca12469
[tailwind]: https://github.com/MintaekCho/consert-app/assets/105726931/92219ec8-3387-4da0-a055-b61aa891ee66
[swr]: https://github.com/MintaekCho/consert-app/assets/105726931/9c146140-f90f-4423-8d0c-a3cb3e7b93d7
[python]: https://github.com/MintaekCho/consert-app/assets/105726931/570427b4-06d4-4d1a-8ce3-89849a22bb89
[selenium]: https://github.com/MintaekCho/consert-app/assets/105726931/8bcfd05f-daa2-4da7-ae17-b9a4cc79126b
[mongodb]: https://github.com/MintaekCho/consert-app/assets/105726931/187b94ae-521d-4e06-9c9c-4054d4536501
