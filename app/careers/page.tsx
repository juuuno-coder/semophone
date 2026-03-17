import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BentoGrid } from '@/components/layouts/BentoGrid';
import BenefitCard from '@/components/ui/BenefitCard';
import JobCard from '@/components/ui/JobCard';
import { benefits, jobOpenings, cultureValues } from '@/data/careers';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: '채용정보 | 세모폰',
  description: '세모폰과 함께 성장할 인재를 찾습니다.'
};

export default function CareersPage() {
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
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">채용정보</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              세모폰과 함께하세요
            </p>
          </div>
        </section>

        {/* 회사 문화 */}
        <section className="bg-warm py-24 px-3 text-center">
          <div className="max-w-container-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">회사 문화</h2>
            <p className="text-gray-600 mb-12">성장을 응원하는 문화</p>

            <div className="flex justify-center">
              <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-auto max-w-4xl">
                {cultureValues.map((culture, i) => (
                  <BenefitCard
                    key={i}
                    icon={culture.icon}
                    title={culture.title}
                    description={culture.description}
                    delay={i * 0.1}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </section>

        {/* 복리후생 */}
        <section className="bg-white py-24 px-3 text-center">
          <div className="max-w-container-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">복리후생</h2>

            <BentoGrid className="grid-cols-2 md:grid-cols-3 auto-rows-auto">
              {benefits.map((benefit, i) => (
                <BenefitCard
                  key={i}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  delay={i * 0.1}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* 채용공고 */}
        <section className="bg-warm py-24 px-3">
          <div className="max-w-container-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">채용공고</h2>

            <div className="space-y-4">
              {jobOpenings.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* 지원 방법 */}
        <section className="bg-dark py-24 px-3 text-center">
          <div className="max-w-container-sm mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">지원 방법</h2>
            <p className="text-white/80 mb-8">
              recruit@semophone.co.kr<br />
              이력서와 자기소개서를 보내주세요
            </p>

            <Link
              href="mailto:recruit@semophone.co.kr"
              className="inline-flex items-center gap-2 bg-brand text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-600 transition-all hover:shadow-brand-hover"
            >
              <Image src="/icons/이메일1.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
              이력서 보내기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
