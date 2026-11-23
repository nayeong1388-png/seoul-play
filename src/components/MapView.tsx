'use client';

import React from 'react';

interface MapViewProps {
  onSelectDistrict: (district: string) => void;
  onSwitchToCards: () => void;
}

export default function MapView({ onSelectDistrict, onSwitchToCards }: MapViewProps) {
  const pins = [
    { name: '종로·대학로', district: '종로구', icon: 'fa-masks-theater', color: 'bg-pink-500', top: '28%', left: '45%' },
    { name: '마포·홍대', district: '마포구', icon: 'fa-guitar', color: 'bg-indigo-500', top: '40%', left: '32%' },
    { name: '성수·서울숲', district: '성동구', icon: 'fa-palette', color: 'bg-amber-500', top: '38%', left: '58%' },
    { name: '여의도 한강', district: '영등포구', icon: 'fa-seedling', color: 'bg-pink-500', top: '52%', left: '35%' },
    { name: '용산·국중박', district: '용산구', icon: 'fa-landmark', color: 'bg-blue-500', top: '48%', left: '48%' },
    { name: '강남·코엑스', district: '강남구', icon: 'fa-building', color: 'bg-emerald-500', top: '65%', left: '62%' },
    { name: '송파·잠실', district: '송파구', icon: 'fa-music', color: 'bg-purple-500', top: '60%', left: '75%' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>서울시 25개 자치구 문화행사 지도</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              카카오맵/네이버맵 연동 준비
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            서울 권역별 랜드마크와 진행 중인 축제 위치를 확인하세요.
          </p>
        </div>
      </div>

      {/* 인터랙티브 지도 그래픽 */}
      <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video sm:aspect-21/9 flex items-center justify-center p-6 shadow-inner text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
          {/* 한강 표현 라인 */}
          <div className="absolute w-full h-12 bg-indigo-500/10 -rotate-6 rounded-full blur-xl pointer-events-none" />

          {/* 구별 인터랙티브 핀들 */}
          {pins.map((pin) => (
            <div
              key={pin.district}
              onClick={() => onSelectDistrict(pin.district)}
              style={{ top: pin.top, left: pin.left }}
              className="absolute text-center cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-full ${pin.color}/90 text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform`}
              >
                <i className={`fa-solid ${pin.icon} text-xs`} />
              </div>
              <span className="mt-1 inline-block text-[10px] font-bold bg-slate-900/80 px-1.5 py-0.5 rounded border border-white/20 whitespace-nowrap">
                {pin.name}
              </span>
            </div>
          ))}
        </div>

        {/* 하단 안내 바 */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-3 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-pink-400" />
            <span>지도의 핀을 누르면 해당 자치구의 행사만 즉시 필터링됩니다.</span>
          </div>
          <button
            onClick={onSwitchToCards}
            className="text-pink-400 hover:text-pink-300 font-bold"
          >
            목록으로 보기 &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
