import { HistoryEvent, Milestone } from '@/types/content';

export const historyEvents: HistoryEvent[] = [
  {
    year: "2020",
    quarter: "Q1",
    icon: "🚀",
    title: "세모폰 창업",
    description: "고객 중심의 투명한 휴대폰 유통을 목표로 서울 강남에서 1호점 오픈",
    stats: [
      { label: "매장 수", value: "1개" },
      { label: "직원 수", value: "5명" }
    ]
  },
  {
    year: "2021",
    quarter: "Q2",
    icon: "📈",
    title: "10개 매장 돌파",
    description: "서울·경기 지역 빠른 확장, 누적 고객 1만명 돌파",
    stats: [
      { label: "누적 고객", value: "10,000명" },
      { label: "매장 수", value: "10개" }
    ]
  },
  {
    year: "2022",
    quarter: "Q4",
    icon: "🎉",
    title: "누적 고객 5만명 돌파",
    description: "고객 만족도 4.7★ 달성, 업계 최고 수준의 사후관리 시스템 구축",
    stats: [
      { label: "누적 고객", value: "50,000명" },
      { label: "매장 수", value: "25개" }
    ]
  },
  {
    year: "2023",
    quarter: "Q3",
    icon: "🏪",
    title: "30개 매장 확장",
    description: "인천 지역 진출, 수도권 전역 커버리지 완성",
    stats: [
      { label: "누적 고객", value: "100,000명" },
      { label: "매장 수", value: "30개" }
    ]
  },
  {
    year: "2024",
    quarter: "현재",
    icon: "👑",
    title: "수도권 최대 성지 네트워크",
    description: "40개 매장, 누적 15만명의 고객과 함께 성장 중",
    stats: [
      { label: "누적 고객", value: "150,000명+" },
      { label: "매장 수", value: "40개+" },
      { label: "고객 만족도", value: "4.8★" }
    ]
  }
];

export const milestones: Milestone[] = [
  {
    title: "단통법 폐지 대응",
    description: "업계 최초 지원금 제한 없는 자유 개통 시스템 구축",
    icon: "🔓",
    image: "/landing/banner1.png"
  },
  {
    title: "24시간 고객 지원",
    description: "개통 후에도 365일 끝까지 책임지는 사후관리",
    icon: "🛡️",
    image: "/landing/trust-support.png"
  },
  {
    title: "모바일 앱 출시",
    description: "언제 어디서나 매장 찾기, 실시간 상담 가능",
    icon: "📱",
    image: "/landing/app-icon.png"
  }
];
