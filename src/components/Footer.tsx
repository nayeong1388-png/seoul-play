import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-black">
              SP
            </div>
            <span className="font-bold text-white text-base">SEOUL PLAY</span>
            <span className="text-slate-500 text-[11px]">서울시 문화행사 & 축제 큐레이션</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>출처: 서울열린데이터광장(data.seoul.go.kr)</span>
            <span>Next.js 14 + Supabase</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] leading-relaxed">
          <div>
            <h4 className="text-white font-semibold mb-2">서비스 안내</h4>
            <p>
              SEOUL PLAY는 서울시민과 방문객을 위해 2030 데이트 코스와 3040 아이 동반 가족 나들이를 위한 최적의 문화행사를 스마트하게 큐레이션합니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">공공데이터 & 라이선스 고지</h4>
            <p>
              현재 화면은 기획 단계의 샘플 데이터로 구성된 프로토타입입니다. 다음 단계에서 서울시 열린데이터광장 문화행사 OpenAPI 실시간 연동이 진행됩니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">개발 로드맵</h4>
            <p className="space-y-1">
              <span className="block text-emerald-400">✓ 1단계: 프론트엔드 및 행사 탐색 인터랙션 완료</span>
              <span className="block">⏳ 2단계: Supabase 데이터베이스 & 유저 북마크 동기화</span>
              <span className="block">⏳ 3단계: 서울시 공공데이터 API 실시간 수집 백엔드</span>
              <span className="block">⏳ 4단계: 카카오/네이버 지도 API 연동</span>
            </p>
          </div>
        </div>

        <div className="text-center text-slate-600 text-[10px] pt-4 border-t border-slate-800">
          &copy; 2026 SEOUL PLAY. All rights reserved. Sample Dataset for Demonstration.
        </div>

      </div>
    </footer>
  );
}
