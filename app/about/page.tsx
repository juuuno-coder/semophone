import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhySection from '@/components/sections/WhySection';
import TrustSection from '@/components/sections/TrustSection';
import Image from 'next/image';

export const metadata = {
  title: '회사 소개 | 세모폰',
  description: '세상의 모든 휴대폰 가격을 내리다. 세모폰의 미션과 핵심 가치를 소개합니다.'
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section
          className="relative h-[40vh] min-h-[320px] max-h-[480px] overflow-hidden mt-[56px] md:mt-[72px]"
          style={{
            background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">회사 소개</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              투명한 가격, 정직한 서비스
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-24 px-3 text-center">
          <div className="max-w-container-md mx-auto">
            <Image
              src="/images/logo/기본로고.png"
              alt="세모폰"
              width={120}
              height={120}
              className="mx-auto mb-6 opacity-90"
            />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              세상의 모든<br />
              휴대폰 가격을 내리다
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              세모폰은 고객이 불필요한 비용을 지불하지 않도록,<br />
              투명한 가격과 정직한 서비스로 신뢰를 쌓아갑니다.
            </p>
          </div>
        </section>

        {/* 기존 섹션 재사용 */}
        <WhySection />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
