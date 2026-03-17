'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MinimalStats() {
  return (
    <section className="bg-dark py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
              <Image
                src="/landing/stores-collage.png"
                alt="세모폰 매장"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* 오른쪽: 텍스트 + 통계 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              수도권 <span className="text-brand">40개 성지</span>에서<br />
              검증된 신뢰
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
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
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-3xl font-black text-brand mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
