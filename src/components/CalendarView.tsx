'use client';

import React, { useState } from 'react';
import { SeoulEvent } from '@/types/event';

interface CalendarViewProps {
  events: SeoulEvent[];
  onSelectEvent: (event: SeoulEvent) => void;
}

export default function CalendarView({ events, onSelectEvent }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<number>(23); // 오늘 23일 기준

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜 선택 시 해당 일자 매칭 행사 (샘플)
  const matchedEvents = events.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            2026년 11월 ~ 12월 행사 일정 캘린더
          </h3>
          <p className="text-xs text-slate-500">
            날짜를 클릭하면 해당 일자에 진행되는 서울시 행사를 즉시 모아봅니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-pink-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> 이번 주말
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> 진행 중 행사
          </span>
        </div>
      </div>

      {/* 캘린더 요일 헤더 & 일자 그리드 */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {daysOfWeek.map((d, i) => (
          <div
            key={d}
            className={`font-bold py-2 text-[11px] ${
              i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-slate-500'
            }`}
          >
            {d}
          </div>
        ))}

        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isWeekend = day % 7 === 0 || day % 7 === 1;
          const isToday = day === 23;
          const isSelected = day === selectedDay;
          const hasEvents = day >= 20 && day <= 30;

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-2 min-h-14 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:border-indigo-400 hover:bg-indigo-50/50 ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                  : isToday
                  ? 'bg-indigo-50/60 border-indigo-300 font-bold'
                  : isWeekend
                  ? 'bg-pink-50/30 border-slate-100'
                  : 'bg-slate-50/50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className={`font-bold ${isWeekend ? 'text-pink-600' : 'text-slate-700'}`}>
                  {day}
                </span>
                {isToday && (
                  <span className="text-[9px] px-1 bg-indigo-600 text-white rounded font-bold">
                    오늘
                  </span>
                )}
              </div>
              {hasEvents ? (
                <div className="mt-1 flex flex-col gap-0.5 text-left">
                  <span className="text-[9px] bg-indigo-500 text-white rounded px-1 truncate font-medium">
                    행사 {isWeekend ? '6' : '3'}건
                  </span>
                </div>
              ) : (
                <div className="h-3" />
              )}
            </div>
          );
        })}
      </div>

      {/* 선택된 일자의 행사 프리뷰 목록 */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <i className="fa-solid fa-clock text-indigo-600" />
          <span>11월 {selectedDay}일(오늘) 진행 추천 행사:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {matchedEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-indigo-400 cursor-pointer shadow-xs"
            >
              <div className="truncate">
                <span className="text-[10px] font-bold text-indigo-600">[{evt.category}]</span>
                <h5 className="text-xs font-bold text-slate-800 truncate">{evt.title}</h5>
                <p className="text-[11px] text-slate-500 truncate">{evt.place}</p>
              </div>
              <span className="text-[10px] px-2 py-1 bg-slate-100 rounded-lg text-slate-600 shrink-0 font-medium">
                상세보기 &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
