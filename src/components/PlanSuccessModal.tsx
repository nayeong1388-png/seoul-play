'use client';

import React from 'react';

interface PlanSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  onShare: () => void;
}

export default function PlanSuccessModal({
  isOpen,
  onClose,
  count,
  onShare,
}: PlanSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div>
          <h3 className="font-black text-slate-900 text-base">성공적인 외출 준비 완료! 🌸</h3>
          <p className="text-xs text-slate-500 mt-1">나만의 서울 문화 나들이 동선이 완벽하게 저장되었습니다.</p>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border text-xs text-slate-700 text-left space-y-1.5">
          <div className="flex items-center justify-between text-indigo-600 font-bold">
            <span>총 나들이 코스</span>
            <span>{count}개 장소</span>
          </div>
          <p className="text-[11px] text-slate-500">
            동선 저장이 완료되어 언제든 '내 나들이' 탭에서 다시 열람하고 공유할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onShare}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
          >
            카카오톡 공유하기
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
