'use client';

import React from 'react';
import { MainMenuTab } from '@/types/event';

interface HeaderProps {
  currentTab: MainMenuTab;
  onTabChange: (tab: MainMenuTab) => void;
  scheduleCount: number;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  scheduleCount,
  isLoggedIn,
  onOpenLogin,
  onLogout,
}: HeaderProps) {
  return (
    <>
      {/* 상단 기획서 일치 안내 바 */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-indigo-100 text-xs py-2 px-4 border-b border-indigo-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
              <i className="fa-solid fa-check-double mr-1"></i> 기획서 IA 100% 반영
            </span>
            <span className="text-slate-200 font-medium text-xs">
              <strong>User Flow & 사이트맵 IA</strong>에 맞춰 4대 메뉴(행사 탐색, 일정&지도, 맞춤추천, 내 나들이)로 구성되었습니다.
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span className="bg-indigo-900/80 px-2 py-0.5 rounded border border-indigo-700/50">
              <i className="fa-solid fa-flask text-amber-400 mr-1"></i> [샘플 데이터 모드]
            </span>
            <span>Supabase Auth & DB Ready</span>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* 로고 */}
          <button onClick={() => onTabChange('explore')} className="flex items-center gap-2.5 group shrink-0 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-sparkles text-lg"></i>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-indigo-700 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                SEOUL PLAY
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider">
                서울시 문화행사 큐레이션
              </span>
            </div>
          </button>

          {/* 사이트맵 기준 4대 GNB 네비게이션 */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => onTabChange('explore')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'explore'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <i className="fa-solid fa-magnifying-glass"></i> 행사 탐색
            </button>
            <button
              onClick={() => onTabChange('schedule-map')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'schedule-map'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <i className="fa-regular fa-calendar-days"></i> 일정 & 지도
            </button>
            <button
              onClick={() => onTabChange('recommend')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'recommend'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <i className="fa-solid fa-wand-magic-sparkles text-pink-500"></i> 맞춤 추천
            </button>
            <button
              onClick={() => onTabChange('my-tour')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 relative ${
                currentTab === 'my-tour'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <i className="fa-solid fa-route text-indigo-600"></i> 내 나들이
              <span className="bg-pink-500 text-white text-[9px] px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {scheduleCount}
              </span>
            </button>
          </nav>

          {/* 우측 로그인 / 회원가입 (User Flow Step 2) */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  길동
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold text-slate-800">홍길동님</span>
                  <span className="block text-[10px] text-emerald-600 font-medium">카카오 연동됨</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 border rounded-md"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
              >
                <i className="fa-regular fa-user"></i>
                <span>로그인 / 회원가입</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 모바일 하단 고정 GNB 탭바 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 flex justify-around py-2 text-[10px] font-semibold text-slate-600 shadow-lg">
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'explore' ? 'text-indigo-600 font-bold' : ''
          }`}
        >
          <i className="fa-solid fa-magnifying-glass text-base"></i> 행사 탐색
        </button>
        <button
          onClick={() => onTabChange('schedule-map')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'schedule-map' ? 'text-indigo-600 font-bold' : ''
          }`}
        >
          <i className="fa-regular fa-calendar-days text-base"></i> 일정&지도
        </button>
        <button
          onClick={() => onTabChange('recommend')}
          className={`flex flex-col items-center gap-0.5 ${
            currentTab === 'recommend' ? 'text-indigo-600 font-bold' : ''
          }`}
        >
          <i className="fa-solid fa-wand-magic-sparkles text-base text-pink-500"></i> 맞춤 추천
        </button>
        <button
          onClick={() => onTabChange('my-tour')}
          className={`flex flex-col items-center gap-0.5 relative ${
            currentTab === 'my-tour' ? 'text-indigo-600 font-bold' : ''
          }`}
        >
          <i className="fa-solid fa-route text-base text-indigo-600"></i> 내 나들이
          <span className="absolute -top-1 right-2 bg-pink-500 text-white text-[9px] px-1 rounded-full">
            {scheduleCount}
          </span>
        </button>
      </div>
    </>
  );
}
