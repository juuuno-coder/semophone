import Badge from '@/components/ui/Badge';

export default function WhySection() {
  const benefits = [
    { icon: '💰', text: '지원금 최대로 받고 싶다면, 성지!' },
    { icon: '🤝', text: '단통법 폐지! 지원금 제한없는 성지' },
    { icon: '⚡', text: '30분 내 즉시 개통 완료' },
    { icon: '🛡️', text: '개통 후에도 365일 사후관리' },
  ];

  return (
    <section className="bg-white py-24 px-3 text-center">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <h2 className="section-title fade-in">
          온라인엔 없는 가격,<br className="md:hidden" /> 성지에서만 가능한 상담
        </h2>
        <p className="section-desc fade-in fade-in-d1 mb-12">
          직접 찾아오신 분께 드리는 특별한 조건.<br />
          매월 2,000명이 그 차이를 경험합니다.
        </p>

        {/* Benefits */}
        <div className="flex items-center justify-center gap-2 mb-9 fade-in">
          <Badge variant="dark">세모폰에만 있어요!</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 bg-gray-100 rounded-2xl hover:bg-brand-50 hover:scale-105 transition-all fade-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                {item.icon}
              </div>
              <div className="text-[15px] font-semibold leading-snug">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
