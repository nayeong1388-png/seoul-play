'use client';

import React from 'react';
import { SeoulEvent } from '@/types/event';

interface EventCardProps {
  event: SeoulEvent;
  isBookmarked: boolean;
  isScheduled: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleSchedule: (id: string) => void;
  onClick: (event: SeoulEvent) => void;
}

export default function EventCard({
  event,
  isBookmarked,
  isScheduled,
  onToggleBookmark,
  onToggleSchedule,
  onClick,
}: EventCardProps) {
  const audienceTag =
    event.targetAudience === 'couple'
      ? '💑 2030 데이트'
      : event.targetAudience === 'family'
      ? '👨‍👩‍👧 3040 키즈'
      : '🌟 온가족·커플';

  return (
    <div
      onClick={() => onClick(event)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/5"
    >
      {/* 카드 이미지 영역 */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* 상단 뱃지 그룹: [샘플] 뱃지 확실하게 표기 */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 shadow-xs">
            샘플
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 backdrop-blur text-white">
            {event.category}
          </span>
          {event.isFree && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
              무료
            </span>
          )}
        </div>

        {/* 우측 상단 찜 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(event.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-slate-400 hover:text-pink-600 transition-colors shadow-sm z-10"
        >
          <i
            className={`fa-solid fa-heart text-sm transition-transform ${
              isBookmarked ? 'text-pink-500 scale-110' : ''
            }`}
          />
        </button>

        {/* 하단 자치구 & 타깃 뱃지 */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
          <span className="bg-indigo-900/80 backdrop-blur px-2 py-0.5 rounded-md font-semibold">
            📍 {event.district}
          </span>
          <span className="bg-black/60 backdrop-blur px-2 py-0.5 rounded-md text-[10px]">
            {audienceTag}
          </span>
        </div>
      </div>

      {/* 카드 콘텐츠 본문 */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-1.5">
            {event.title}
          </h3>

          <div className="space-y-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <i className="fa-regular fa-calendar text-slate-400 w-3.5"></i>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <i className="fa-solid fa-location-dot text-slate-400 w-3.5"></i>
              <span className="truncate">{event.place}</span>
            </div>
          </div>

          {/* AI 1줄 프리뷰 */}
          <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
            <span className="text-indigo-600 font-bold mr-1">
              <i className="fa-solid fa-sparkles"></i> AI 요약:
            </span>
            {event.aiSummary.p1}
          </div>
        </div>

        {/* 카드 하단 액션 바 */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          <span className="font-bold text-indigo-600 text-xs">
            {event.isFree ? '무료' : event.feeText.split('/')[0]}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSchedule(event.id);
            }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 ${
              isScheduled
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 bg-white'
            }`}
          >
            <i className={`fa-solid ${isScheduled ? 'fa-check' : 'fa-plus'} text-[10px]`}></i>
            <span>{isScheduled ? '담김' : '일정담기'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
