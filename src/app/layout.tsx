import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SEOUL PLAY | 서울시 문화행사 & 축제 나들이 큐레이션',
  description: '서울시 공공데이터를 기반으로 2030 데이트 코스와 3040 가족 문화체험을 스마트하게 추천하는 서울 문화 플레이 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
