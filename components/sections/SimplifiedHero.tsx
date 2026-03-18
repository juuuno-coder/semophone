'use client';

import Link from 'next/link';

export default function SimplifiedHero() {
  return (
    <>
      {/* PC 버전 - 풀 브라우징 배너 */}
      <section className="hidden md:block relative h-screen w-full overflow-hidden mt-[72px]">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <h1 className="text-6xl lg:text-8xl font-black text-dark mb-6">
              세모폰
            </h1>

            <p className="text-3xl lg:text-5xl font-bold text-dark mb-4">
              세상의 모든 휴대폰 가격을
              <br />
              혁신합니다
            </p>

            <p className="text-xl lg:text-2xl text-dark/80 mb-12">
              전국 40개 직영매장에서 온라인에 없는 가격을 경험하세요
            </p>

            <div className="flex gap-4 justify-center items-center">
              <Link href="/stores">
                <button className="px-8 py-4 bg-dark text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  가까운 성지 찾기 →
                </button>
              </Link>

              <Link href="/about">
                <button className="px-8 py-4 bg-white border-2 border-dark text-dark font-bold text-lg rounded-full hover:bg-dark hover:text-white transition-colors">
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
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-black text-dark mb-4">
            세모폰
          </h1>

          <p className="text-xl font-bold text-dark mb-3">
            세상의 모든 휴대폰 가격을 혁신합니다
          </p>

          <p className="text-sm text-dark/70 mb-8">
            전국 40개 직영매장
          </p>

          <Link href="/stores">
            <button className="px-6 py-3 bg-dark text-white font-bold text-base rounded-full shadow-lg">
              가까운 성지 찾기 →
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
