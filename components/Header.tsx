'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { haptics } from '@/lib/haptics';
import { useScrollLock } from '@/hooks/useScrollLock';

// MenuItem 컴포넌트
interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  secondary?: boolean;
}

function MenuItem({ href, icon, label, onClick, secondary = false }: MenuItemProps) {
  return (
    <div>
      <Link
        href={href}
        onClick={() => {
          haptics.light();
          onClick();
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-95 ${
          secondary
            ? 'text-gray-600 hover:bg-gray-100'
            : 'text-gray-900 hover:bg-brand/10 hover:text-brand font-semibold'
        }`}
      >
        <div className={secondary ? 'text-gray-400' : 'text-brand'}>
          {icon}
        </div>
        <span className="text-base">{label}</span>
      </Link>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // 스크롤 잠금 (useScrollLock 훅 사용)
  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [mobileMenuOpen]);

  // Modal 열림 감지하여 메뉴 자동 닫기
  useEffect(() => {
    const handleModalOpen = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('modalOpen', handleModalOpen);
    return () => window.removeEventListener('modalOpen', handleModalOpen);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const logos = [
    { src: '/images/logo/로고_가로단축형.png', width: 150, height: 40 },
    { src: '/images/logo/로고_가로나열형.png', width: 200, height: 40 }
  ];

  return (
    <>
      <header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        style={{ zIndex: 9000 }}
      >
        <div className="header-inner max-w-container-xl">
          <Link href="/" className="logo relative w-[200px] h-10 block">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt="세모폰"
                width={logo.width}
                height={logo.height}
                className="absolute left-0 top-0 transition-opacity duration-1000"
                style={{
                  opacity: currentLogo === index ? 1 : 0,
                }}
              />
            ))}
          </Link>
          <nav className="nav-desktop" style={{ gap: '2rem' }}>
            <Link
              href="/about"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              소개
            </Link>
            <Link
              href="/history"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              히스토리
            </Link>
            <Link
              href="/careers"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              채용정보
            </Link>
            <Link
              href="/stores"
              className="px-6 py-2.5 bg-brand text-black rounded-full text-base font-bold hover:bg-brand-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              매장찾기
            </Link>
          </nav>
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => {
              haptics.light();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="메뉴"
          >
            <span></span>
          </button>
        </div>
      </header>

      {/* 전체 화면 슬라이드 메뉴 - Portal로 body에 직접 렌더링 */}
      {mounted && mobileMenuOpen && createPortal(
        <>
          {/* 오버레이 - 투명 (클릭 영역만) */}
          <div
            className="fixed inset-0"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              backgroundColor: 'transparent',
            }}
            onClick={() => {
              haptics.light();
              setMobileMenuOpen(false);
            }}
          />

          {/* 슬라이드 패널 */}
          <nav
            className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-2xl overflow-y-auto"
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100vh',
              zIndex: 100000,
              transform: 'translateX(0)',
            }}
          >
              {/* 닫기 버튼 */}
              <button
                onClick={() => {
                  haptics.light();
                  setMobileMenuOpen(false);
                }}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors"
                aria-label="메뉴 닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 메뉴 콘텐츠 */}
              <div className="flex flex-col p-8 pt-20 h-full">
                {/* 메인 메뉴 */}
                <div className="flex flex-col gap-2">
                  <MenuItem
                    href="/about"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                    label="소개"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/history"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    label="히스토리"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/careers"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                    label="채용정보"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/stores"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    label="매장찾기"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>

                {/* 구분선 */}
                <div className="my-6 border-t border-gray-300" />

                {/* 하위 메뉴 - 매우 작게 */}
                <div className="flex flex-col gap-0.5">
                  <Link
                    href="/terms"
                    onClick={() => {
                      haptics.light();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    이용약관
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={() => {
                      haptics.light();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    개인정보처리방침
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => {
                      haptics.light();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    고객센터
                  </Link>
                </div>

                {/* 버전 정보 */}
                <div className="mt-auto pt-8 text-center">
                  <p className="text-xs text-gray-400">버전 1.0.0</p>
                  <p className="text-xs text-gray-400 mt-1">© 2024 세모폰</p>
                </div>
              </div>
          </nav>
        </>,
        document.body
      )}
    </>
  );
}
