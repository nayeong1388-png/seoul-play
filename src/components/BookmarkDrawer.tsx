'use client';

import React from 'react';
import { SeoulEvent } from '@/types/event';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedEvents: SeoulEvent[];
  onRemoveBookmark: (id: string) => void;
  onAddToSchedule: (id: string) => void;
  onAddAllToSchedule: () => void;
  onClearAll: () => void;
  onOpenDetail: (event: SeoulEvent) => void;
}

export default function BookmarkDrawer({
  isOpen,
  onClose,
  bookmarkedEvents,
  onRemoveBookmark,
  onAddToSchedule,
  onAddAllToSchedule,
  onClearAll,
  onOpenDetail,
}: BookmarkDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* 헤더 */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <i className="fa-solid fa-heart" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">내 찜 목록 (즐겨찾기)</h3>
              <p className="text-[11px] text-slate-500">관심 있는 행사를 모아보고 일정에 바로 추가하세요.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg p-1">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* 바디 리스트 */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-3">
          {bookmarkedEvents.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <i className="fa-regular fa-heart text-3xl mb-2 text-slate-300" />
              <p className="text-xs">아직 찜한 문화행사가 없습니다.</p>
              <p className="text-[11px] text-slate-400 mt-1">마음에 드는 행사의 하트 버튼을 눌러보세요!</p>
            </div>
          ) : (
            bookmarkedEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 hover:bg-white transition-colors"
              >
                <img src={evt.image} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
                    {evt.district}
                  </span>
                  <h4
                    onClick={() => onOpenDetail(evt)}
                    className="font-bold text-xs text-slate-900 truncate mt-0.5 cursor-pointer hover:text-indigo-600"
                  >
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">{evt.place}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    onClick={() => onRemoveBookmark(evt.id)}
                    className="text-slate-400 hover:text-pink-600 text-xs p-1"
                  >
                    <i className="fa-solid fa-trash-can" />
                  </button>
                  <button
                    onClick={() => onAddToSchedule(evt.id)}
                    className="text-[10px] px-2 py-0.5 rounded bg-indigo-600 text-white font-semibold"
                  >
                    + 일정
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 푸터 버튼 */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={onAddAllToSchedule}
            disabled={bookmarkedEvents.length === 0}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all"
          >
            찜한 모든 행사 일정표에 담기
          </button>
          <button
            onClick={onClearAll}
            disabled={bookmarkedEvents.length === 0}
            className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 text-slate-600 rounded-xl text-xs font-medium"
          >
            비우기
          </button>
        </div>

      </div>
    </div>
  );
}
