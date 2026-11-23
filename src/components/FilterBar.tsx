'use client';

import React from 'react';
import { EventCategory } from '@/types/event';

interface FilterBarProps {
  category: EventCategory;
  onCategoryChange: (cat: EventCategory) => void;
  onlyFree: boolean;
  onToggleFree: () => void;
  onlyWeekend: boolean;
  onToggleWeekend: () => void;
  selectedTag: string | null;
  onToggleTag: (tag: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  resultCount: number;
  onReset: () => void;
}

const CATEGORIES: { label: string; value: EventCategory; icon: string }[] = [
  { label: '전체보기', value: '전체', icon: '✨' },
  { label: '축제 & 페스티벌', value: '축제', icon: '🎉' },
  { label: '전시 & 미술', value: '전시', icon: '🎨' },
  { label: '공연 & 콘서트', value: '공연', icon: '🎭' },
  { label: '체험 & 나들이', value: '체험', icon: '🏕️' },
];

export default function FilterBar({
  category,
  onCategoryChange,
  onlyFree,
  onToggleFree,
  onlyWeekend,
  onToggleWeekend,
  selectedTag,
  onToggleTag,
  sortBy,
  onSortChange,
  resultCount,
  onReset,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
      
      {/* 상단 카테고리 탭 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs font-semibold">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
              category === cat.value
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* 하단 필터 옵션 & 정렬 */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* 즉시 필터 토글 버튼 그룹 */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 무료 행사만 */}
          <button
            onClick={onToggleFree}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
              onlyFree
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyFree ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span>🎁 무료 행사만</span>
          </button>

          {/* 이번 주말 행사 */}
          <button
            onClick={onToggleWeekend}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
              onlyWeekend
                ? 'bg-pink-50 border-pink-500 text-pink-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:border-pink-500 hover:text-pink-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyWeekend ? 'bg-pink-500' : 'bg-slate-300'}`} />
            <span>🔥 이번 주말 행사</span>
          </button>

          {/* 주차 가능 */}
          <button
            onClick={() => onToggleTag('주차가능')}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
              selectedTag === '주차가능'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${selectedTag === '주차가능' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
            <span>🚗 주차 가능</span>
          </button>

          {/* 실내 / 날씨무관 */}
          <button
            onClick={() => onToggleTag('실내')}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
              selectedTag === '실내'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${selectedTag === '실내' ? 'bg-indigo-500' : 'bg-slate-300'}`} />
            <span>🏛️ 실내/날씨무관</span>
          </button>

          {/* 초기화 */}
          <button
            onClick={onReset}
            className="text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors flex items-center gap-1 text-xs"
          >
            <i className="fa-solid fa-rotate-right text-[10px]"></i> 초기화
          </button>
        </div>

        {/* 결과 수 & 정렬 셀렉트 */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-slate-400">
            총 <strong className="text-indigo-600 font-bold">{resultCount}</strong>건
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="py-1 px-2.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="recommended">추천순</option>
            <option value="recent">최신순</option>
            <option value="endingSoon">마감임박순</option>
            <option value="rating">평점높은순</option>
          </select>
        </div>

      </div>
    </div>
  );
}
