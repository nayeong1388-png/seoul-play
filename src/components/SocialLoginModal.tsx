'use client';

import React from 'react';

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (provider: string) => void;
}

export default function SocialLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: SocialLoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-black">
              SP
            </div>
            <h3 className="font-black text-slate-900 text-base">SEOUL PLAY 로그인</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          로그인하시면 <strong>마감 전 카카오톡 알림</strong>, <strong>나들이 동선 영구 저장</strong>, <strong>Supabase 연동</strong>을 이용하실 수 있습니다.
        </p>

        {/* 간편 소셜 로그인 버튼들 */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => onLoginSuccess('kakao')}
            className="w-full py-2.5 px-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <i className="fa-solid fa-comment text-sm"></i> 카카오로 3초 만에 시작하기
          </button>
          <button
            onClick={() => onLoginSuccess('naver')}
            className="w-full py-2.5 px-4 bg-[#03C75A] hover:bg-[#02b350] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span className="font-black">N</span> 네이버 아이디로 로그인
          </button>
          <button
            onClick={() => onLoginSuccess('google')}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-brands fa-google text-red-500"></i> 구글 계정으로 계속하기
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100 text-center">
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-slate-600 underline">
            로그인 없이 둘러보기 (비회원 모드)
          </button>
        </div>
      </div>
    </div>
  );
}
