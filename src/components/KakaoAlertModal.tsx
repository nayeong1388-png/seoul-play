'use client';

import React, { useState } from 'react';

interface KakaoAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export default function KakaoAlertModal({
  isOpen,
  onClose,
  eventName,
}: KakaoAlertModalProps) {
  const [phone, setPhone] = useState('010-1234-5678');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onClose();
    alert(`[카카오톡 알림 신청 완료]\n${eventName}\n마감 3일 전 및 주말 전에 [${phone}] 번호로 알림톡이 전송됩니다.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-bell"></i>
            </span>
            <h3 className="font-bold text-slate-900 text-sm">마감 전 카카오톡 알림 받기</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950">
          <strong className="block font-bold truncate mb-1">{eventName}</strong>
          <span>인기 행사의 조기 마감 및 예매 일정을 놓치지 않도록 알림톡을 보내드립니다.</span>
        </div>

        <div className="space-y-2 text-xs text-slate-700">
          <label className="block font-semibold">알림 희망 시점:</label>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-indigo-600 rounded" />
              <span>행사 종료 3일 전 (마감 임박)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-indigo-600 rounded" />
              <span>이번 주 금요일 오후 5시 (주말 알림)</span>
            </label>
          </div>
        </div>

        <div className="space-y-1 text-xs text-slate-700">
          <label className="block font-semibold">알림톡 수신 휴대폰 번호:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold rounded-xl transition-all shadow-md"
        >
          카카오톡 알림 신청 완료
        </button>
      </div>
    </div>
  );
}
