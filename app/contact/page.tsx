'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'partnership'>('general');

  return (
    <>
      <Header />
      <main style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[320px] max-h-[480px] overflow-hidden mt-[56px] md:mt-[72px]"
        style={{
          background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
        }}
      >
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">문의하기</h1>
          <p className="text-lg md:text-xl text-dark/80 font-semibold">
            언제든지 편하게 연락주세요
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-3xl p-2 shadow-lg mb-8 inline-flex gap-2 w-full">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'general'
                  ? 'bg-brand text-black shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              일반 문의
            </button>
            <button
              onClick={() => setActiveTab('partnership')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'partnership'
                  ? 'bg-brand text-black shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              제휴 문의
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form className="space-y-8">
              {/* Name */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  이름
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white"
                  placeholder="이름을 입력해주세요"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  이메일
                </label>
                <input
                  type="email"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white"
                  placeholder="이메일을 입력해주세요"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  전화번호
                </label>
                <input
                  type="tel"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white"
                  placeholder="전화번호를 입력해주세요"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  {activeTab === 'general' ? '문의 분류' : '제휴 유형'}
                </label>
                <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white">
                  {activeTab === 'general' ? (
                    <>
                      <option>휴대폰 문의</option>
                      <option>매장 위치 안내</option>
                      <option>A/S 문의</option>
                      <option>기타 문의</option>
                    </>
                  ) : (
                    <>
                      <option>매장 제휴</option>
                      <option>광고 제휴</option>
                      <option>기타 제휴</option>
                    </>
                  )}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  문의 내용
                </label>
                <textarea
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors resize-none text-base bg-gray-50 focus:bg-white"
                  rows={8}
                  placeholder="문의 내용을 입력해주세요"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand text-black py-5 rounded-2xl font-bold text-xl hover:bg-brand-600 hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                보내기
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
