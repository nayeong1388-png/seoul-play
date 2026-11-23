'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FilterBar from '@/components/FilterBar';
import EventCard from '@/components/EventCard';
import EventDetailModal from '@/components/EventDetailModal';
import CalendarView from '@/components/CalendarView';
import MapView from '@/components/MapView';
import RecommendSection from '@/components/RecommendSection';
import MyTourSection from '@/components/MyTourSection';
import SocialLoginModal from '@/components/SocialLoginModal';
import KakaoAlertModal from '@/components/KakaoAlertModal';
import PlanSuccessModal from '@/components/PlanSuccessModal';
import Footer from '@/components/Footer';
import { SAMPLE_EVENTS } from '@/data/mockEvents';
import { SeoulEvent, EventCategory, MainMenuTab } from '@/types/event';

export default function Home() {
  // 기획서 사이트맵 4대 메인 탭 상태
  const [currentTab, setCurrentTab] = useState<MainMenuTab>('explore');

  // 탐색 필터 상태
  const [keyword, setKeyword] = useState<string>('');
  const [district, setDistrict] = useState<string>('all');
  const [category, setCategory] = useState<EventCategory>('전체');
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [onlyWeekend, setOnlyWeekend] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('recommended');

  // 모달 제어 상태
  const [selectedEvent, setSelectedEvent] = useState<SeoulEvent | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isKakaoAlertOpen, setIsKakaoAlertOpen] = useState<boolean>(false);
  const [kakaoAlertTargetName, setKakaoAlertTargetName] = useState<string>('');
  const [isPlanSuccessOpen, setIsPlanSuccessOpen] = useState<boolean>(false);

  // 사용자 로그인 상태 (User Flow Step 2)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로컬스토리지 기반 즐겨찾기 및 동선 저장
  const [bookmarks, setBookmarks] = useState<string[]>(['evt-01', 'evt-03']);
  const [schedule, setSchedule] = useState<string[]>(['evt-01', 'evt-05']);

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('sp_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      const savedSchedule = localStorage.getItem('sp_schedule');
      if (savedSchedule) setSchedule(JSON.parse(savedSchedule));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('sp_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleSchedule = (id: string) => {
    setSchedule((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('sp_schedule', JSON.stringify(next));
      return next;
    });
  };

  const handleResetFilters = () => {
    setKeyword('');
    setDistrict('all');
    setCategory('전체');
    setOnlyFree(false);
    setOnlyWeekend(false);
    setSelectedTag(null);
    setSortBy('recommended');
  };

  // 탐색 탭 필터링 연산
  const filteredEvents = useMemo(() => {
    let result = SAMPLE_EVENTS.filter((e) => {
      if (keyword.trim()) {
        const kw = keyword.trim().toLowerCase();
        const matchTitle = e.title.toLowerCase().includes(kw);
        const matchPlace = e.place.toLowerCase().includes(kw);
        const matchTags = e.tags.some((t) => t.toLowerCase().includes(kw));
        if (!matchTitle && !matchPlace && !matchTags) return false;
      }
      if (district !== 'all' && e.district !== district) return false;
      if (category !== '전체' && e.category !== category) return false;
      if (onlyFree && !e.isFree) return false;
      if (onlyWeekend && !e.isWeekend) return false;
      if (selectedTag && !e.tags.includes(selectedTag)) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recent') return b.id.localeCompare(a.id);
      if (sortBy === 'endingSoon') return a.endDate.localeCompare(b.endDate);
      return 0;
    });

    return result;
  }, [keyword, district, category, onlyFree, onlyWeekend, selectedTag, sortBy]);

  const handleCopySchedule = () => {
    const scheduledList = SAMPLE_EVENTS.filter((e) => schedule.includes(e.id));
    if (scheduledList.length === 0) {
      alert('저장된 나들이 동선이 없습니다. 행사를 먼저 담아주세요.');
      return;
    }
    let text = `[SEOUL PLAY] 나의 서울 문화 나들이 동선 계획 🌸\n\n`;
    scheduledList.forEach((evt, idx) => {
      text += `${idx + 1}코스: ${evt.title}\n`;
      text += ` - 장소: ${evt.place} (${evt.district})\n`;
      text += ` - 요금: ${evt.feeText}\n`;
      text += ` - AI 팁: ${evt.aiSummary.p1}\n\n`;
    });
    text += `서울시 공공데이터 기반 SEOUL PLAY: https://seoulplay.kr`;

    navigator.clipboard.writeText(text).then(() => {
      alert('나들이 일정 및 동선이 클립보드에 복사되었습니다!\n카카오톡 단체방이나 메모장에 붙여넣어 공유하세요.');
    });
  };

  const handleOpenKakaoAlert = (name: string) => {
    setKakaoAlertTargetName(name);
    setIsKakaoAlertOpen(true);
  };

  return (
    <>
      {/* 4대 메뉴 GNB 헤더 */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        scheduleCount={schedule.length}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={() => {
          setIsLoggedIn(false);
          alert('로그아웃되었습니다.');
        }}
      />

      {/* ========================================================= */}
      {/* 1. [행사 탐색] (3초 필터 검색 + 카테고리 + 행사 카드 목록) */}
      {/* ========================================================= */}
      {currentTab === 'explore' && (
        <div className="space-y-6">
          <HeroSection
            keyword={keyword}
            onKeywordChange={setKeyword}
            district={district}
            onDistrictChange={setDistrict}
            onSearch={() => {}}
            onHotTagClick={(tag) => setKeyword(tag)}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full space-y-6">
            <FilterBar
              category={category}
              onCategoryChange={setCategory}
              onlyFree={onlyFree}
              onToggleFree={() => setOnlyFree(!onlyFree)}
              onlyWeekend={onlyWeekend}
              onToggleWeekend={() => setOnlyWeekend(!onlyWeekend)}
              selectedTag={selectedTag}
              onToggleTag={(tag) => setSelectedTag(selectedTag === tag ? null : tag)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredEvents.length}
              onReset={handleResetFilters}
            />

            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>서울시 실시간 문화행사 목록</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-semibold">
                  [샘플 데이터]
                </span>
              </h2>
              <span className="text-xs text-slate-500">
                검색 결과 <strong className="text-indigo-600 font-bold">{filteredEvents.length}</strong>건
              </span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl mb-4">
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  조건에 맞는 문화행사가 없습니다
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  지역구나 검색어를 변경하여 다시 찾아보세요.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
                >
                  전체 행사 다시보기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    isBookmarked={bookmarks.includes(evt.id)}
                    isScheduled={schedule.includes(evt.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onToggleSchedule={handleToggleSchedule}
                    onClick={(e) => setSelectedEvent(e)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. [일정 & 지도] (달력 보기 & 지도 보기 통합 뷰) */}
      {/* ========================================================= */}
      {currentTab === 'schedule-map' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📅 달력 & 지도 통합 뷰</span>
                <span className="text-xs font-normal text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  사이트맵 핵심
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                이번 주말 행사 캘린더와 내 주변 위치 마커를 확인하세요.
              </p>
            </div>
          </div>

          <CalendarView events={SAMPLE_EVENTS} onSelectEvent={(e) => setSelectedEvent(e)} />

          <MapView
            onSelectDistrict={(dist) => {
              setDistrict(dist);
              setCurrentTab('explore');
            }}
            onSwitchToCards={() => setCurrentTab('explore')}
          />
        </main>
      )}

      {/* ========================================================= */}
      {/* 3. [맞춤 추천] (AI 맞춤 큐레이션: 2030 / 3040 / 무료) */}
      {/* ========================================================= */}
      {currentTab === 'recommend' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          <RecommendSection
            events={SAMPLE_EVENTS}
            bookmarks={bookmarks}
            schedule={schedule}
            onToggleBookmark={handleToggleBookmark}
            onToggleSchedule={handleToggleSchedule}
            onOpenDetail={(e) => setSelectedEvent(e)}
            onOpenKakaoAlert={handleOpenKakaoAlert}
          />
        </main>
      )}

      {/* ========================================================= */}
      {/* 4. [내 나들이] (즐겨찾기, 나들이 동선 저장, 활동 내역) */}
      {/* ========================================================= */}
      {currentTab === 'my-tour' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          <MyTourSection
            events={SAMPLE_EVENTS}
            bookmarks={bookmarks}
            schedule={schedule}
            onToggleBookmark={handleToggleBookmark}
            onToggleSchedule={handleToggleSchedule}
            onOpenDetail={(e) => setSelectedEvent(e)}
            onCopySchedule={handleCopySchedule}
            onOpenPlanSuccess={() => setIsPlanSuccessOpen(true)}
          />
        </main>
      )}

      <Footer />

      {/* 행사 상세 모달 */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isBookmarked={selectedEvent ? bookmarks.includes(selectedEvent.id) : false}
        isScheduled={selectedEvent ? schedule.includes(selectedEvent.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onToggleSchedule={handleToggleSchedule}
        onOpenKakaoAlert={handleOpenKakaoAlert}
      />

      {/* 소셜 로그인 모달 (User Flow Step 2) */}
      <SocialLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(provider) => {
          setIsLoginModalOpen(false);
          setIsLoggedIn(true);
          alert(`[Supabase Auth 연동 완료]\n${provider.toUpperCase()} 소셜 로그인 성공! 이제 모든 나들이 동선이 안전하게 저장됩니다.`);
        }}
      />

      {/* 마감 전 카카오톡 알림 모달 (User Flow Step 9) */}
      <KakaoAlertModal
        isOpen={isKakaoAlertOpen}
        onClose={() => setIsKakaoAlertOpen(false)}
        eventName={kakaoAlertTargetName}
      />

      {/* 나들이 계획 완료 모달 (User Flow 완료 단계) */}
      <PlanSuccessModal
        isOpen={isPlanSuccessOpen}
        onClose={() => setIsPlanSuccessOpen(false)}
        count={schedule.length}
        onShare={handleCopySchedule}
      />
    </>
  );
}
