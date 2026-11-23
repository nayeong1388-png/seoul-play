'use client';

import React from 'react';

interface HeroSectionProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  district: string;
  onDistrictChange: (val: string) => void;
  onSearch: () => void;
  onHotTagClick: (tag: string) => void;
}

export const DISTRICTS = [
  'all', '종로구', '중구', '용산구', '성동구', '광진구',
  '동대문구', '중랑구', '성북구', '강북구', '도봉구',
  '노원구', '은평구', '서대문구', '마포구', '양천구',
  '강서구', '구로구', '금천구', '영등포구', '동작구',
  '관악구', '서초구', '강남구', '송파구', '강동구'
];

export default function HeroSection({
  keyword,
  onKeywordChange,
  district,
  onDistrictChange,
  onSearch,
  onHotTagClick,
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-pink-900 text-white relative overflow-hidden py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-pink-200 mb-4">
          <i className="fa-solid fa-map-pin text-pink-400"></i>
          <span>이번 주말 서울에서는 어떤 즐거움이 기다릴까요?</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight sm:leading-snug mb-3">
          설레는 데이트부터 아이와의 주말 나들이까지,<br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-emerald-300">
            서울의 모든 문화 축제
          </span>를 한눈에!
        </h1>
        
        <p className="text-sm sm:text-base text-indigo-100 max-w-2xl mx-auto mb-6 font-normal">
          서울시 공공데이터를 기반으로 25개 구의 축제, 전시, 공연, 체험 정보를 실시간 분석하고 AI가 핵심만 3줄로 짚어드립니다.
        </p>

        {/* 검색 바 */}
        <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-indigo-950/40 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder="행사명, 장소, 키워드 검색 (예: 봄꽃, 미디어아트, 성수)" 
              className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select 
              value={district}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="w-1/2 sm:w-36 py-2.5 px-3 text-xs font-medium text-slate-700 bg-slate-100 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">📍 서울시 전체</option>
              {DISTRICTS.filter(d => d !== 'all').map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button 
              onClick={onSearch}
              className="w-1/2 sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-pink-500/20 shrink-0"
            >
              검색하기
            </button>
          </div>
        </div>

        {/* 핫태그 */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-indigo-200">
          <span className="text-indigo-300 text-[11px]">인기 검색:</span>
          {['봄꽃', '미디어아트', '어린이', '성수', '야경'].map((tag) => (
            <button
              key={tag}
              onClick={() => onHotTagClick(tag)}
              className="hover:text-white underline underline-offset-4 decoration-pink-400 font-medium"
            >
              #{tag}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
