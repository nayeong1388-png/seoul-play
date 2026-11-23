// 서울시 문화행사 공공데이터 및 SEOUL PLAY 핵심 데이터 모델 정의 (기획서 IA 기반)

export type MainMenuTab = 'explore' | 'schedule-map' | 'recommend' | 'my-tour';

export type EventCategory = '전체' | '축제' | '전시' | '공연' | '체험';

export type TargetAudience = 'all' | 'couple' | 'family';

export interface AISummary {
  p1: string; // 2030 데이트/핵심 추천 포인트
  p2: string; // 3040 가족/편의 추천 포인트
  p3: string; // 방문 전 필수 꿀팁 및 주차/예약 유의사항
}

export interface RecommendedCourse {
  name: string;
  dist: string;
}

export interface SeoulEvent {
  id: string;
  isSample: boolean; // 샘플 데이터 여부 ([샘플 데이터] 뱃지 출력용)
  title: string;
  category: '축제' | '전시' | '공연' | '체험';
  district: string; // 자치구 (예: 종로구, 중구, 성동구 등)
  place: string;
  address: string;
  subway: string;
  date: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isWeekend: boolean; // 이번 주말 진행 여부
  isFree: boolean; // 무료 행사 여부
  feeText: string;
  target: string;
  targetAudience: TargetAudience; // 2030 커플 / 3040 가족 / 전체
  rating: number;
  reviews: number;
  tags: string[];
  image: string;
  aiSummary: AISummary;
  description: string;
  course: RecommendedCourse[];
  orgLink?: string;
  lat?: number;
  lng?: number;
}

// 지난 활동 내역 모델
export interface TourHistory {
  id: string;
  eventTitle: string;
  place: string;
  date: string;
  rating: number;
  memo: string;
}

// 서울시 열린데이터광장(data.seoul.go.kr) 문화행사 원본 API 응답 인터페이스
export interface SeoulOpenApiRawEvent {
  CODENAME: string;       // 분류
  TITLE: string;          // 행사명
  DATE: string;           // 날짜/시간
  PLACE: string;          // 장소
  ORG_NAME: string;       // 기관명
  USE_TRGT: string;       // 이용대상
  USE_FEE: string;        // 이용요금
  PLAYER: string;         // 출연자
  PROGRAM: string;        // 프로그램소개
  ETC_DESC: string;       // 기타내용
  ORG_LINK: string;       // 홈페이지
  MAIN_IMG: string;       // 메인이미지
  RGSTDATE: string;       // 등록일
  TICKET: string;         // 신청방법
  STRTDATE: string;       // 시작일
  END_DATE: string;       // 종료일
  THEMECODE: string;      // 테마분류
  LOT: string;            // 위도
  LAT: string;            // 경도
  IS_FREE: string;        // 유무료 구분 (무료 / 유료)
  HMPG_ADDR: string;      // 문화포털상세URL
}
