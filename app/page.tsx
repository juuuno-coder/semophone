'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MinimalHero from '@/components/sections/MinimalHero';
import IconBenefits from '@/components/sections/IconBenefits';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import MinimalStats from '@/components/sections/MinimalStats';
import TrustMinimal from '@/components/sections/TrustMinimal';
import MinimalCTA from '@/components/sections/MinimalCTA';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isAppDomain, setIsAppDomain] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  // Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.classList.add('fade-out');
        setTimeout(() => setShowSplash(false), 500);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // App 도메인 체크
  useEffect(() => {
    const hostname = window.location.hostname;
    setIsAppDomain(hostname.includes('app.semophone.co.kr') || hostname === 'localhost');
  }, []);

  // Sticky CTA
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Loading Splash */}
      {showSplash && (
        <div className="splash" id="splash">
          <Image
            src="/landing/logo-full.png"
            alt="세모폰"
            width={180}
            height={180}
            className="splash-logo"
            priority
          />
        </div>
      )}

      {/* Header */}
      <Header />

      {/* 본문 - stacking context 격리 */}
      <main style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* 미니멀 히어로 */}
        <div ref={heroRef}>
          <MinimalHero />
        </div>

        {/* 아이콘 기반 혜택 (Firestore 연동) */}
        <IconBenefits />

        {/* 프로세스 타임라인 */}
        <ProcessTimeline />

        {/* 통계 섹션 */}
        <MinimalStats />

        {/* 신뢰 섹션 */}
        <TrustMinimal />

        {/* 최종 CTA */}
        <MinimalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <div className={`sticky-cta z-sticky-cta ${showStickyCta ? 'visible' : ''} ${isAppDomain ? 'sticky-cta-with-nav' : ''}`}>
        <Link href="/stores" className="sticky-cta-btn">
          가까운 성지 찾기
        </Link>
      </div>
    </>
  );
}
