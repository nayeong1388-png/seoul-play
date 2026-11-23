'use client';

import React, { useState } from 'react';
import { SeoulEvent } from '@/types/event';
import EventCard from './EventCard';

interface RecommendSectionProps {
  events: SeoulEvent[];
  bookmarks: string[];
  schedule: string[];
  onToggleBookmark: (id: string) => void;
  onToggleSchedule: (id: string) => void;
  onOpenDetail: (event: SeoulEvent) => void;
  onOpenKakaoAlert: (eventName: string) => void;
}

export default function RecommendSection({
  events,
  bookmarks,
  schedule,
  onToggleBookmark,
  onToggleSchedule,
  onOpenDetail,
  onOpenKakaoAlert,
}: RecommendSectionProps) {
  const [theme, setTheme] = useState<'couple' | 'family' | 'free'>('couple');

  const filteredEvents = events.filter((e) => {
    if (theme === 'couple') return e.targetAudience === 'couple';
    if (theme === 'family') return e.targetAudience === 'family';
    return e.isFree;
  });

  const bannerText =
    theme === 'couple'
      ? '💑 2030 연인들을 위한 로맨틱 야경, 성수 핫플 팝업, 감성 미디어아트 전시 코스입니다.'
      : theme === 'family'
      ? '👨‍👩‍👧 3040 부모님을 위한 어린이 과학관, 생태 숲체험, 키즈 오케스트라 코스입니다.'
      : '🎁 입장료 전액 무료! 서울시 공공 지원으로 부담 없이 즐기는 알짜 문화축제 모음입니다.';

  return (
    <div className="space-y-6">
      {/* 헤더 배너 */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold text-pink-200">
            <i className="fa-solid fa-wand-magic-sparkles"></i> AI 맞춤 큐레이션 알고리즘
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">누구와 함께 가시나요?</h2>
          <p className="text-xs sm:text-sm text-indigo-100">
            2030 데이트 코스, 3040 아이 동반 가족 나들이, 그리고 지갑 부담 없는 무료 축제를 맞춤 추천해 드립니다.
          </p>
        </div>
      </div>

      {/* 3대 추천 탭 */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setTheme('couple')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all ${
            theme === 'couple'
              ? 'bg-indigo-600 text-white shadow-xs font-bold'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>💑</span> 2030 데이트 코스 추천
        </button>
        <button
          onClick={() => setTheme('family')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all ${
            theme === 'family'
              ? 'bg-indigo-600 text-white shadow-xs font-bold'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>👨‍👩‍👧</span> 3040 아이 동반 가족 나들이
        </button>
        <button
          onClick={() => setTheme('free')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all ${
            theme === 'free'
              ? 'bg-indigo-600 text-white shadow-xs font-bold'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>🎁</span> 서울시 무료 축제 베스트
        </button>
      </div>

      {/* 테마 안내 바 */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span>{bannerText}</span>
        <button
          onClick={() => onOpenKakaoAlert(`${theme === 'couple' ? '2030 데이트' : theme === 'family' ? '3040 키즈' : '무료 축제'} 맞춤 추천`)}
          className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <i className="fa-solid fa-comment"></i> 마감 전 카톡 알림 받기
        </button>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map((evt) => (
          <EventCard
            key={evt.id}
            event={evt}
            isBookmarked={bookmarks.includes(evt.id)}
            isScheduled={schedule.includes(evt.id)}
            onToggleBookmark={onToggleBookmark}
            onToggleSchedule={onToggleSchedule}
            onClick={onOpenDetail}
          />
        ))}
      </div>
    </div>
  );
}
