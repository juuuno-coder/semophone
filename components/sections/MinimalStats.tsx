'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const storeImages = [
  '/images/지점별 사진/지점별 (1).png',
  '/images/지점별 사진/지점별 (2).png',
  '/images/지점별 사진/지점별 (3).png',
  '/images/지점별 사진/지점별 (4).png',
];

export default function MinimalStats() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
    }, 4000); // 4초마다 이미지 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 이미지 슬라이드쇼 (100% 표시) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* 즉시 전환 - 페이드 제거 */}
              <Image
                src={storeImages[currentImageIndex]}
                alt={`세모폰 매장 ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentImageIndex === 0}
              />

              {/* 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {storeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-dark w-8' : 'bg-dark/50'
                    }`}
                    aria-label={`이미지 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* 오른쪽: 텍스트 + 통계 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="text-dark">수도권 </span>
              <span className="text-dark">40개 성지</span>
              <span className="text-dark">에서</span><br />
              <span className="text-dark">검증된 신뢰</span>
            </h2>

            <p className="text-lg md:text-xl text-dark/80 mb-10 leading-relaxed">
              15만 명이 선택한 세모폰,<br />
              가까운 매장에서 최저가를 경험하세요
            </p>

            {/* 통계 그리드 */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '150,000+', label: '누적 개통' },
                { number: '40+', label: '직영 매장' },
                { number: '4.8★', label: '만족도' },
                { number: '365일', label: '사후관리' },
              ].map((stat, i) => (
                <div key={i} className="bg-black/5 backdrop-blur-sm rounded-xl p-6 border border-black/10">
                  <div className="text-3xl font-black text-dark mb-2">{stat.number}</div>
                  <div className="text-sm text-dark/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
