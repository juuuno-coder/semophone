'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const NaverMap = dynamic(() => import('@/components/NaverMap'), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
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


        {/* 브랜드 아이덴티티 */}
        <section className="bg-gray-50 py-24 px-3">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                브랜드 아이덴티티
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                세모폰의 브랜드 아이덴티티와 로고 시스템을<br />
                소개합니다
              </p>
            </div>

            {/* 로고 소개 */}
            <div className="bg-white rounded-3xl p-12 shadow-xl mb-12">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* 로고 이미지 */}
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 bg-gray-50 rounded-2xl flex items-center justify-center p-8">
                    <Image
                      src="/images/logo/기본로고.png"
                      alt="세모폰 로고"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 로고 설명 */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    세모폰 로고
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    세모폰의 CI에는 브랜드가 추구하는 가치와 방향성이 담겨 있습니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    세모폰의 CI는 '연결과 균형'을 기반으로 한 단순한 기하학적 형태에서 출발합니다.<br />
                    세 개의 선이 이어져 만들어지는 삼각형 구조는 서로 다른 요소들이 하나로 모여 안정적인 형태를 이루는 모습을 의미합니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    이는 다양한 휴대폰과 서비스, 그리고 고객의 선택이 세모폰 안에서 자연스럽게 연결되는 경험을 상징합니다.<br />
                    삼각형의 세 꼭짓점은 제품, 고객, 서비스라는 핵심 요소를 나타냅니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    각 요소가 균형 있게 조화를 이루며 하나의 구조를 완성하듯, 세모폰은 다양한 브랜드와 통신 서비스를 고객에게 연결합니다.<br />
                    단순하고 균형 잡힌 형태는 신뢰와 안정감을 의미합니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    빠르게 변화하는 모바일 시장 속에서도 고객이 믿고 선택할 수 있는 기준이 되고자 하는 의지를 담고 있습니다.<br />
                    또한 '세상 모든 휴대폰'이라는 브랜드 의미를 바탕으로 폭넓은 선택을 제공하고자 합니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    앞으로 세모폰은 이 CI를 중심으로 더 많은 가치와 경험을 전달하는 브랜드로 성장해 나갈 것입니다.
                  </p>

                  {/* 다운로드 버튼 */}
                  <div className="pt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        window.open('/downloads/semophone_logos_original.zip', '_blank');
                      }}
                      style={{ backgroundColor: '#FEE500' }}
                      className="px-6 py-3.5 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-sm">로고 PNG 파일 (ZIP)</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        window.open('/downloads/semophone_logo_original.ai', '_blank');
                      }}
                      style={{ backgroundColor: '#FEE500' }}
                      className="px-6 py-3.5 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-sm">로고 AI 원본 파일</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 매장 위치 */}
        <section className="bg-white py-24 px-3">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                찾아오시는 길
              </h2>
              <p className="text-gray-600 mb-2">
                휴대폰성지 세모폰 광명6동점
              </p>
              <div className="text-base text-gray-800 font-semibold mt-6">
                <p>경기도 광명시 광명로 824 1층 (광명동)</p>
                <p className="text-gray-600 text-sm mt-2">
                  📞 031-1234-5678
                </p>
              </div>
            </div>

            {/* 지도 */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <NaverMap
                stores={[{
                  id: 1,
                  name: '휴대폰성지 세모폰 광명6동점',
                  address: '경기도 광명시 광명로 824 1층 (광명동)',
                  phone: '031-1234-5678',
                  region: '경기',
                  subRegion: '기타',
                  lat: 37.4787,
                  lng: 126.8644,
                }]}
                userLocation={null}
              />
            </div>

            {/* 안내 메시지 */}
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700">
                전국 40개 직영매장에서 세모폰을 만나보세요
              </p>
              <Link href="/stores" className="inline-block mt-4">
                <button
                  style={{ backgroundColor: '#FEE500' }}
                  className="px-8 py-3 text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  전체 매장 보기
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
