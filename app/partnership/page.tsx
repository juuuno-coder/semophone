'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'partnership',
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다.');
        setFormData({ company: '', name: '', email: '', phone: '', category: '', message: '' });
      } else {
        alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section
          className="relative h-[40vh] min-h-[320px] overflow-hidden mt-[56px] md:mt-[72px]"
          style={{ background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)' }}
        >
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">협업 문의</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              세모폰과 함께 성장하세요
            </p>
          </div>
        </section>

        {/* 협업 소개 */}
        <section className="bg-white py-24 px-3">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
              함께 만드는 미래
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              세모폰은 다양한 파트너와의 협력을 통해 고객에게 더 나은 가치를 제공합니다.<br />
              투명하고 정직한 파트너십으로 함께 성장하고자 합니다.
            </p>
          </div>
        </section>

        {/* 협업 분야 */}
        <section className="bg-gray-50 py-24 px-3">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-16">협업 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "/icons/상점1.png",
                  title: "매장 제휴",
                  description: "세모폰 매장 입점 및 공동 마케팅"
                },
                {
                  icon: "/icons/마이크+폰.png",
                  title: "마케팅 제휴",
                  description: "브랜드 협업 및 공동 프로모션"
                },
                {
                  icon: "/icons/차트2.png",
                  title: "기술 협력",
                  description: "시스템 연동 및 기술 파트너십"
                }
              ].map((area, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 mb-6">
                    <Image src={area.icon} alt={area.title} width={56} height={56} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-base text-gray-700">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 문의 폼 */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              협업 문의하기
            </h2>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 회사명 */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">회사명 *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand text-gray-900"
                    required
                  />
                </div>

                {/* 담당자명 */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">담당자명 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand text-gray-900"
                    required
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">이메일 *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand text-gray-900"
                    required
                  />
                </div>

                {/* 전화번호 */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">전화번호 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand text-gray-900"
                    required
                  />
                </div>

                {/* 협업 유형 */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">협업 유형 *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand text-gray-900"
                    required
                  >
                    <option value="">선택해주세요</option>
                    <option value="store">매장 제휴</option>
                    <option value="marketing">마케팅 제휴</option>
                    <option value="tech">기술 협력</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                {/* 협업 내용 */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">협업 제안 내용 *</label>
                  <textarea
                    name="message"
                    rows={8}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand resize-none text-gray-900"
                    placeholder="협업하고 싶은 내용을 자세히 작성해주세요"
                    required
                  />
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-brand text-black rounded-2xl font-bold text-lg hover:bg-brand-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  {submitting ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            </div>

            {/* 직접 연락 */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">또는 직접 연락주세요</p>
              <a href="mailto:partnership@semophone.co.kr" className="text-lg font-bold text-brand hover:underline">
                📧 partnership@semophone.co.kr
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
