# 🌸 SEOUL PLAY (서울플레이)

> **서울시 공공데이터 기반 무료·지역별 축제 및 문화행사 맞춤형 큐레이션 서비스**  
> 기획서 **User Flow** 및 **사이트맵 IA**의 화면과 기능 구조를 100% 반영하여 구축된 웹 서비스입니다.

---

## 🎯 기획서 대비 구현 매핑표 (100% 반영)

| 기획서 사이트맵 IA (4단계) | User Flow 단계 | 구현된 기능 및 화면 |
| :--- | :--- | :--- |
| **1. 행사 탐색** | • 3초 필터 검색<br>• 행사 상세 페이지<br>• AI 3줄 요약 | • **3초 필터 검색**: 자치구 선택, 무료 여부, 카테고리(축제·전시·공연·체험)<br>• **행사 카드 그리드**: [샘플 데이터] 뱃지 및 AI 1줄 프리뷰<br>• **상세 모달**: 공공 API 규격 정보 + **복잡한 공고문을 AI로 3줄 요약** + 1.5km 연계 코스 |
| **2. 일정 & 지도** | • 달력 & 지도 통합 뷰 | • **달력 보기**: 이번 주말 행사 캘린더 (날짜별 행사 모아보기)<br>• **지도 보기**: 랜드마크 권역별 핀 마커 표시 & 상세 장소 찾기 |
| **3. 맞춤 추천** | • AI 맞춤 큐레이션<br>• 마감 전 알림 및 푸시 | • **AI 맞춤 3대 테마**: 2030 데이트 코스 / 3040 아이 동반 가족 / 무료 축제 베스트<br>• **마감 전 카카오톡 알림 받기**: D-3일 전, 주말 알림톡 신청 모달 |
| **4. 내 나들이** | • 알림 및 동선 저장<br>• 나들이 계획 완료 | • **즐겨찾기**: 찜한 행사 모아보기<br>• **나들이 동선 저장**: 1코스, 2코스 타임라인 이동 경로 계획 & 카톡 복사<br>• **활동 내역**: 지난 나들이 기록 및 별점/한줄평<br>• **나들이 계획 완료 모달**: 성공적인 외출 준비 완료! 축하 팝업 |
| **공통 (상단 GNB)** | • 로그인 / 회원가입 | • **소셜 로그인 모달**: 카카오 / 네이버 / 구글 (Supabase Auth 연동 준비) |

---

## 🚀 지금 바로 브라우저에서 실행하기 (초보자용)

내 컴퓨터에서 아래 파일을 **더블 클릭**하시면 크롬이나 엣지 브라우저에서 기획서의 모든 플로우를 바로 체험하실 수 있습니다:
- **경로**: `C:\Users\nayou\.gemini\antigravity\scratch\seoul-play\preview.html`
- **파일 링크**: [preview.html 열기](file:///C:/Users/nayou/.gemini/antigravity/scratch/seoul-play/preview.html)
- **Antigravity 아티팩트 링크**: [seoul-play-preview.html](file:///C:/Users/nayou/.gemini/antigravity/brain/fc61acf4-9f1b-44f4-88f2-c7954c5a25e2/seoul-play-preview.html)

---

## 📂 Next.js 프로젝트 구성 안내

`C:\Users\nayou\.gemini\antigravity\scratch\seoul-play\`
- `src/app/page.tsx` : 사이트맵 4대 메뉴(행사 탐색, 일정&지도, 맞춤추천, 내 나들이) 통합 제어
- `src/components/Header.tsx` : 상단 네비게이션 & 소셜 로그인 버튼
- `src/components/HeroSection.tsx` : 3초 필터 검색 바
- `src/components/FilterBar.tsx` : 카테고리 탭 & 정렬
- `src/components/EventDetailModal.tsx` : 공공 API 정보 + AI 3줄 요약 + 동선저장/카톡알림 분기
- `src/components/RecommendSection.tsx` : AI 맞춤 큐레이션 (2030 / 3040 / 무료)
- `src/components/MyTourSection.tsx` : 찜 목록, 이동 동선 타임라인, 지난 활동 내역
- `src/components/SocialLoginModal.tsx` : 카카오/네이버/구글 소셜 로그인
- `src/components/KakaoAlertModal.tsx` : 마감 전 카카오톡 알림톡 설정
- `src/components/PlanSuccessModal.tsx` : 성공적인 외출 준비 완료 축하 팝업
- `src/lib/supabase.ts` : Supabase 연동 클라이언트 및 테이블 DDL 스키마
- `src/lib/seoulApi.ts` : 서울시 공공데이터포털(culturalEventInfo) 연동 어댑터
