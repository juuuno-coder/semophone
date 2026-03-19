'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { stores } from '@/data/stores';

export default function SimplifiedHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 매장 이미지 수집 (이미지가 있는 매장만)
  const storeImages = stores
    .filter(store => store.images && store.images.length > 0)
    .flatMap(store => store.images || []);

  // 자동 이미지 순환 (3초마다)
  useEffect(() => {
    if (storeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [storeImages.length]);

  return (
    <>
      {/* PC 버전 - 풀 브라우징 배너 */}
      <section className="hidden md:block relative h-screen w-full overflow-hidden mt-[72px]">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* 매장 이미지 갤러리 배경 */}
            {storeImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                }}
              >
                <Image
                  src={image}
                  alt="세모폰 매장"
                  fill
                  className="object-cover object-center"
                  style={{ transform: 'scale(1.05)' }}
                  priority={index === 0}
                />
              </div>
            ))}
            {/* 어두운 오버레이 (텍스트 가독성) */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-6">
              세모폰
            </h1>

            <p className="text-3xl lg:text-5xl font-bold text-white mb-4">
              세상의 모든 휴대폰 가격을
              <br />
              혁신합니다
            </p>

            <p className="text-xl lg:text-2xl text-white/90 mb-12">
              전국 40개 직영매장에서 온라인에 없는 가격을 경험하세요
            </p>

            <div className="flex gap-4 justify-center items-center">
              <Link href="/stores">
                <button className="px-8 py-4 bg-brand text-dark font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  가까운 성지 찾기 →
                </button>
              </Link>

              <Link href="/about">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-dark transition-all">
                  세모폰 소개
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 모바일 버전 - 컴팩트 배너 */}
      <section className="md:hidden relative h-[50vh] min-h-[400px] overflow-hidden mt-[56px]">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* 매장 이미지 갤러리 배경 */}
            {storeImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                }}
              >
                <Image
                  src={image}
                  alt="세모폰 매장"
                  fill
                  className="object-cover object-center"
                  style={{ transform: 'scale(1.05)' }}
                  priority={index === 0}
                />
              </div>
            ))}
            {/* 어두운 오버레이 (텍스트 가독성) */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            세모폰
          </h1>

          <p className="text-xl font-bold text-white mb-3">
            세상의 모든 휴대폰 가격을 혁신합니다
          </p>

          <p className="text-sm text-white/80 mb-8">
            전국 40개 직영매장
          </p>

          <Link href="/stores">
            <button className="px-6 py-3 bg-brand text-dark font-bold text-base rounded-full shadow-lg hover:scale-105 transition-transform">
              가까운 성지 찾기 →
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
