'use client';

import React, { useState } from 'react';
import { SeoulEvent } from '@/types/event';

interface EventDetailModalProps {
  event: SeoulEvent | null;
  onClose: () => void;
  isBookmarked: boolean;
  isScheduled: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleSchedule: (id: string) => void;
  onOpenKakaoAlert: (eventName: string) => void;
}

export default function EventDetailModal({
  event,
  onClose,
  isBookmarked,
  isScheduled,
  onToggleBookmark,
  onToggleSchedule,
  onOpenKakaoAlert,
}: EventDetailModalProps) {
  if (!event) return null;

  const targetBadge =
    event.targetAudience === 'couple'
      ? '2030 데이트 코스'
      : event.targetAudience === 'family'
      ? '3040 아이와 함께'
      : '온가족 나들이';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* 모달 커버 이미지 & 타이틀 */}
        <div className="relative bg-slate-900 text-white h-52 sm:h-60 overflow-hidden shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* 상단 닫기 & 찜 버튼 */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 shadow-md">
              <i className="fa-solid fa-flask mr-1"></i> [샘플 데이터]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(event.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                  isBookmarked
                    ? 'bg-white text-pink-500'
                    : 'bg-white/20 backdrop-blur hover:bg-white text-white hover:text-pink-600'
                }`}
              >
                <i className="fa-solid fa-heart text-sm" />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* 하단 행사 타이틀 */}
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500 text-white">
                {event.category}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500 text-white">
                {event.isFree ? '무료 행사' : '유료'}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-pink-500/90 text-white">
                {targetBadge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* 모달 본문 */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5 text-xs sm:text-sm">
          {/* 복잡한 공고문을 AI로 요약 (User Flow Step 8) */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-2xl p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
                <i className="fa-solid fa-wand-magic-sparkles" />
              </span>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                복잡한 서울시 공고문을 AI가 3줄로 핵심 요약
              </h4>
            </div>
            <ul className="space-y-2 text-slate-700 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold shrink-0">01</span>
                <span className="leading-relaxed">{event.aiSummary.p1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold shrink-0">02</span>
                <span className="leading-relaxed">{event.aiSummary.p2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold shrink-0">03</span>
                <span className="leading-relaxed">{event.aiSummary.p3}</span>
              </li>
            </ul>
          </div>

          {/* 공공 API 기본 정보 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px]">진행 일시</span>
              <strong className="text-slate-800">{event.date}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">행사 장소</span>
              <strong className="text-slate-800">{event.place} ({event.district})</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">입장 요금</span>
              <strong className="text-slate-800">{event.feeText}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">이용 대상</span>
              <strong className="text-slate-800">{event.target}</strong>
            </div>
          </div>

          {/* 상세 설명 */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-1.5">행사 상세 설명</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
          </div>

          {/* 1.5km 연계 코스 */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-2">
              🚶 함께 둘러보기 좋은 추천 나들이 코스 (반경 1.5km)
            </h4>
            <div className="space-y-2">
              {event.course.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="font-medium text-slate-800">{c.name}</span>
                  </div>
                  <span className="text-slate-400 font-semibold">{c.dist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 바 (User Flow Step 9 분기점) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={() => onToggleSchedule(event.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
              isScheduled
                ? 'bg-slate-800 hover:bg-slate-900 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            <i className={`fa-solid ${isScheduled ? 'fa-check' : 'fa-route'}`} />
            <span>{isScheduled ? '동선에서 제거' : '나들이 동선에 저장'}</span>
          </button>

          <button
            onClick={() => onOpenKakaoAlert(event.title)}
            className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <i className="fa-solid fa-bell" /> 마감 전 카톡 알림
          </button>

          <button
            onClick={() => alert('서울열린데이터광장 및 주관 기관 공식 홈페이지 링크로 연결됩니다.')}
            className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center justify-center gap-1"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" /> 공식 링크
          </button>
        </div>

      </div>
    </div>
  );
}
