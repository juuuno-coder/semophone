# Expo vs Next.js: 웹과 앱 개발 전략

## 현재 프로젝트: Next.js

**현재 세모폰 프로젝트는 Next.js 16.1.6 기반 웹 애플리케이션입니다.**

### Next.js 선택 이유
- ✅ **뛰어난 SEO**: 검색 엔진 최적화 (Google, Naver 검색 노출)
- ✅ **빠른 성능**: Server-Side Rendering (SSR), Static Site Generation (SSG)
- ✅ **Vercel 배포**: 무료로 빠른 배포 및 CDN 지원
- ✅ **웹 우선 전략**: 모바일 웹으로 접근 장벽 낮춤 (앱 설치 불필요)
- ✅ **React 생태계**: 풍부한 라이브러리와 커뮤니티

### Next.js의 한계
- ❌ **네이티브 앱 미지원**: iOS/Android 앱스토어 배포 불가
- ❌ **오프라인 기능 제한**: PWA로 일부 가능하지만 제한적
- ❌ **하드웨어 접근 제한**: 카메라, GPS, 알림 등 네이티브 기능 제한적

---

## Expo: 웹 + 앱을 하나의 코드베이스로

### Expo란?
**React Native 기반 프레임워크로, 하나의 코드로 iOS, Android, 웹을 동시에 개발**

```
하나의 코드베이스
    ↓
┌───────┬───────┬───────┐
│  iOS  │Android│  Web  │
└───────┴───────┴───────┘
```

### Expo의 장점
- ✅ **크로스 플랫폼**: iOS, Android, 웹 동시 개발
- ✅ **단일 코드베이스**: 유지보수 비용 절감
- ✅ **네이티브 기능**: 카메라, GPS, 푸시 알림, 생체 인증 등
- ✅ **Over-the-Air 업데이트**: 앱스토어 심사 없이 즉시 업데이트
- ✅ **Expo Go**: 실제 기기에서 바로 테스트 (개발 중)

### Expo의 단점
- ❌ **SEO 약함**: 웹 버전은 SPA(Single Page App)라 검색 최적화 어려움
- ❌ **초기 로딩 느림**: JavaScript 번들 크기 큼
- ❌ **네이티브 모듈 제한**: 일부 네이티브 기능은 커스텀 개발 필요
- ❌ **웹 성능**: Next.js보다 웹 성능 떨어짐

---

## 세모폰 프로젝트 전략 추천

### 옵션 1: 현재 유지 (Next.js 웹 + 추후 React Native 앱)
```
현재: Next.js 웹 (SEO 우선, 빠른 론칭)
  ↓
추후: React Native 앱 (필요 시 별도 개발)
```

**장점:**
- 빠른 시장 진입 (웹으로 먼저 오픈)
- 뛰어난 SEO로 고객 유입
- Vercel 무료 배포로 비용 절감

**단점:**
- 앱 필요 시 별도 개발 필요 (코드 재사용 제한적)

### 옵션 2: Expo로 전환 (웹 + 앱 동시)
```
Expo로 프로젝트 재작성
  ↓
┌────────────┬──────────────┐
│   웹 버전   │  앱 버전      │
│ (SEO 약함)  │ (iOS/Android)│
└────────────┴──────────────┘
```

**장점:**
- 하나의 코드로 웹 + 앱 동시 제공
- 네이티브 기능 (푸시 알림, GPS, 카메라)
- 유지보수 편리

**단점:**
- 프로젝트 전체 재작성 필요 (2-3주 소요 예상)
- SEO 약해서 검색 노출 어려움
- 웹 성능 Next.js보다 떨어짐

### 옵션 3: 하이브리드 (Next.js 웹 + Expo 앱)
```
Next.js 웹 (SEO 우수) + Expo 앱 (네이티브 기능)
         ↓                    ↓
   동일한 API 서버로 데이터 공유
```

**장점:**
- 각 플랫폼의 장점 극대화
- 웹: SEO 최적화, 빠른 성능
- 앱: 네이티브 기능, 사용자 경험

**단점:**
- 개발/유지보수 비용 2배
- 코드베이스 분리로 인한 복잡성

---

## 결론: 현재 상황에서 추천 전략

### 1단계: Next.js 웹으로 빠르게 론칭 ✅ (현재)
- Vercel 배포로 무료 호스팅
- SEO 최적화로 Google/Naver 검색 노출
- 모바일 웹으로 접근성 확보

### 2단계: PWA 적용 (선택)
- 홈 화면 추가 기능
- 오프라인 캐싱
- 푸시 알림 (제한적)

### 3단계: 앱 필요 시 Expo 개발 (3-6개월 후)
- 사용자 피드백 수집 후 결정
- 네이티브 앱이 꼭 필요한 기능 확인
- Expo로 iOS/Android 앱 개발

---

## Expo 프로젝트 시작 방법 (참고용)

만약 Expo로 시작하려면:

```bash
# Expo CLI 설치
npm install -g expo-cli

# 새 프로젝트 생성
npx create-expo-app semophone-app --template

# 프로젝트로 이동
cd semophone-app

# 개발 서버 실행
npx expo start

# 웹 실행
npx expo start --web

# iOS 시뮬레이터 (Mac만 가능)
npx expo start --ios

# Android 에뮬레이터
npx expo start --android
```

### Expo 웹 + 앱 동시 개발 예시

```typescript
// App.tsx
import { Platform } from 'react-native';

export default function App() {
  return (
    <View>
      {Platform.OS === 'web' ? (
        <Text>웹 버전</Text>
      ) : (
        <Text>앱 버전 (iOS/Android)</Text>
      )}
    </View>
  );
}
```

---

## 최종 권장사항

**현재는 Next.js 웹에 집중하고, 추후 앱이 필요하면 Expo로 별도 개발하는 것을 추천합니다.**

### 이유:
1. **빠른 시장 진입**: 웹으로 먼저 고객 확보
2. **SEO 중요**: 휴대폰 판매 사업은 검색 유입이 핵심
3. **비용 절감**: Vercel 무료 배포
4. **검증 후 확장**: 사용자 반응 확인 후 앱 개발 여부 결정

### 앱이 꼭 필요한 경우:
- 푸시 알림으로 프로모션 알림
- 매장 방문 시 GPS 체크인 혜택
- 바코드 스캔으로 재고 확인
- 오프라인에서도 사용 가능

이런 기능이 필요하다면 Expo 앱 개발을 고려해보세요!
