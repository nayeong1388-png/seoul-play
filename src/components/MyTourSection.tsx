'use client';

import React, { useState } from 'react';
import { SeoulEvent } from '@/types/event';
import EventCard from './EventCard';

interface MyTourSectionProps {
  events: SeoulEvent[];
  bookmarks: string[];
  schedule: string[];
  onToggleBookmark: (id: string) => void;
  onToggleSchedule: (id: string) => void;
  onOpenDetail: (event: SeoulEvent) => void;
  onCopySchedule: () => void;
  onOpenPlanSuccess: () => void;
}

export default function MyTourSection({
  events,
  bookmarks,
  schedule,
  onToggleBookmark,
  onToggleSchedule,
  onOpenDetail,
  onCopySchedule,
  onOpenPlanSuccess,
}: MyTourSectionProps) {
  const [subTab, setSubTab] = useState<'fav' | 'route' | 'history'>('route');

  const bookmarkedEvents = events.filter((e) => bookmarks.includes(e.id));
  const scheduledEvents = events.filter((e) => schedule.includes(e.id));

  return (
    <div className="space-y-6">
      {/* 상단 헤더 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>🎒 내 나들이 보관함</span>
            <span className="text-xs text-slate-400 font-normal">나들이 계획 및 지난 활동 기록</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            찜한 행사와 이동 경로(동선)를 계획하고, 지난 나들이 활동 내역을 확인하세요.
          </p>
        </div>

        {/* 3대 서브 탭: 찜한 행사 / 나들이 동선 / 활동 내역 */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setSubTab('fav')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              subTab === 'fav'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <i className="fa-solid fa-heart text-pink-500"></i> 찜한 행사 ({bookmarkedEvents.length})
          </button>
          <button
            onClick={() => setSubTab('route')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              subTab === 'route'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <i className="fa-solid fa-route text-indigo-600"></i> 나들이 동선 저장 ({scheduledEvents.length})
          </button>
          <button
            onClick={() => setSubTab('history')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              subTab === 'history'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <i className="fa-solid fa-clock-rotate-left text-slate-500"></i> 활동 내역 (2)
          </button>
        </div>
      </div>

      {/* 1. 찜한 행사 목록 */}
      {subTab === 'fav' && (
        <div className="space-y-4">
          {bookmarkedEvents.length === 0 ? (
            <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border">
              아직 찜한 문화행사가 없습니다. 하트를 눌러보세요!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  isBookmarked={true}
                  isScheduled={schedule.includes(evt.id)}
                  onToggleBookmark={onToggleBookmark}
                  onToggleSchedule={onToggleSchedule}
                  onClick={onOpenDetail}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. 나들이 동선 저장 (이동 경로 계획) */}
      {subTab === 'route' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">추천 이동 동선 및 타임라인 계획</h3>
              <p className="text-xs text-slate-500">
                담아둔 행사들의 최적 방문 순서와 1.5km 이내 연계 코스를 보여줍니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onCopySchedule}
                disabled={scheduledEvents.length === 0}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <i className="fa-solid fa-share-nodes"></i> 카톡/메모장 복사
              </button>
              <button
                onClick={onOpenPlanSuccess}
                disabled={scheduledEvents.length === 0}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-pink-600/20"
              >
                <i className="fa-solid fa-circle-check"></i> 나들이 계획 완료!
              </button>
            </div>
          </div>

          {scheduledEvents.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              저장된 나들이 동선이 없습니다. 행사 카드의 '+ 동선저장'을 눌러보세요!
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-indigo-200 space-y-4">
              {scheduledEvents.map((evt, idx) => (
                <div key={evt.id} className="relative group">
                  <span className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white transition-all space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                        {evt.district} · {evt.category}
                      </span>
                      <button
                        onClick={() => onToggleSchedule(evt.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <h4
                      onClick={() => onOpenDetail(evt)}
                      className="font-bold text-xs sm:text-sm text-slate-900 cursor-pointer hover:text-indigo-600"
                    >
                      {evt.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      <i className="fa-solid fa-location-dot text-slate-400 mr-1"></i>
                      {evt.place}
                    </p>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                      <div><strong>AI 동선 팁:</strong> {evt.aiSummary.p1}</div>
                      <div className="text-indigo-600 font-medium">
                        🚶 연계 추천: {evt.course[0]?.name} ({evt.course[0]?.dist})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. 활동 내역 (지난 나들이 기록) */}
      {subTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-xs text-indigo-900 flex items-center gap-2">
            <i className="fa-solid fa-award text-indigo-600 text-base"></i>
            <span>지난 나들이 기록입니다. 다녀온 행사에 별점과 간단한 외출 메모를 남길 수 있습니다.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  외출 완료 (2026.11.10)
                </span>
                <span className="text-amber-500 font-bold"><i className="fa-solid fa-star"></i> 5.0</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">국립중앙박물관 기획전 & 사유의 방 나들이</h4>
              <p className="text-xs text-slate-500">서울 용산구 서빙고로 137 · 지하철 4호선 이촌역</p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700">
                💬 <strong>내 한줄 메모:</strong> "지하철과 바로 연결되어 날씨 걱정 없이 관람했고, 가족공원 산책까지 완벽했던 주말 코스!"
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  외출 완료 (2026.10.28)
                </span>
                <span className="text-amber-500 font-bold"><i className="fa-solid fa-star"></i> 4.8</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">성수동 크리에이티브 팝업 & 카페거리</h4>
              <p className="text-xs text-slate-500">서울 성동구 연무장길 · 지하철 2호선 성수역</p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700">
                💬 <strong>내 한줄 메모:</strong> "독특한 디자이너 굿즈가 많았고 연무장길 카페 코스와 딱 맞았음."
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
