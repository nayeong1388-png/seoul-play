'use client';

import React from 'react';
import { SeoulEvent } from '@/types/event';

interface ScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scheduledEvents: SeoulEvent[];
  onRemoveFromSchedule: (id: string) => void;
  onClearAll: () => void;
  onOpenDetail: (event: SeoulEvent) => void;
}

export default function ScheduleDrawer({
  isOpen,
  onClose,
  scheduledEvents,
  onRemoveFromSchedule,
  onClearAll,
  onOpenDetail,
}: ScheduleDrawerProps) {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    if (scheduledEvents.length === 0) {
      alert('복사할 일정이 없습니다. 행사를 먼저 담아주세요.');
      return;
    }

    let text = `[SEOUL PLAY] 나의 서울 문화 나들이 일정표 🌸\n\n`;
    scheduledEvents.forEach((evt, idx) => {
      text += `${idx + 1}코스: ${evt.title}\n`;
      text += ` - 장소: ${evt.place} (${evt.district})\n`;
      text += ` - 요금: ${evt.feeText}\n`;
      text += ` - 핵심 팁: ${evt.aiSummary.p1}\n\n`;
    });
    text += `자세히 보기: https://seoulplay.kr (서울시 공공데이터 기반)`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('나들이 일정이 클립보드에 복사되었습니다!\n카카오톡이나 메모장에 붙여넣어 공유하세요.');
      })
      .catch(() => {
        alert('복사에 실패했습니다. 권한을 확인해주세요.');
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* 헤더 */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-route" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">나만의 서울 나들이 일정표</h3>
              <p className="text-[11px] text-slate-500">선택한 행사들로 하루 나들이 코스를 만들어보세요.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg p-1">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* 바디 리스트 */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {scheduledEvents.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <i className="fa-solid fa-route text-3xl mb-2 text-slate-300" />
              <p className="text-xs">담긴 나들이 일정이 없습니다.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                행사 카드의 '+ 일정담기'를 눌러 나만의 코스를 완성해보세요!
              </p>
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-indigo-200 space-y-4">
              {scheduledEvents.map((evt, idx) => (
                <div key={evt.id} className="relative group">
                  {/* 타임라인 불릿 */}
                  <span className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                        {evt.district} · {evt.category}
                      </span>
                      <button
                        onClick={() => onRemoveFromSchedule(evt.id)}
                        className="text-slate-400 hover:text-red-500 text-xs"
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </div>
                    <h4
                      onClick={() => onOpenDetail(evt)}
                      className="font-bold text-xs text-slate-900 cursor-pointer hover:text-indigo-600"
                    >
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-slate-400" /> {evt.place}
                    </p>
                    <div className="pt-1.5 flex items-center justify-between text-[11px] text-indigo-600 border-t border-slate-100">
                      <span>{evt.isFree ? '무료 입장' : evt.feeText.split('/')[0]}</span>
                      <span className="text-slate-400 text-[10px]">
                        {evt.targetAudience === 'couple' ? '데이트 추천' : '키즈 추천'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 버튼 */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            disabled={scheduledEvents.length === 0}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-share-nodes" /> 일정표 텍스트 복사 & 공유
          </button>
          <button
            onClick={onClearAll}
            disabled={scheduledEvents.length === 0}
            className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 text-slate-600 rounded-xl text-xs font-medium"
          >
            초기화
          </button>
        </div>

      </div>
    </div>
  );
}
