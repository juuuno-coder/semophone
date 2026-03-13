# Vercel 배포 가이드

## 1. Vercel 계정 준비

1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. 자동으로 GitHub 저장소 연동

## 2. 프로젝트 배포

### 방법 1: Vercel 대시보드에서 배포

1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소 `juuuno-coder/semophone` 선택
3. Framework Preset: **Next.js** (자동 감지됨)
4. Root Directory: `semophone` (또는 그대로 두기)
5. Environment Variables 추가:
   ```
   NEXT_PUBLIC_NAVER_MAP_CLIENT_ID = [네이버 Maps API 클라이언트 ID]
   ```
6. "Deploy" 클릭

### 방법 2: Vercel CLI로 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리로 이동
cd c:\Users\desig\Documents\semophone\semophone

# Vercel 로그인
vercel login

# 배포 (프로덕션)
vercel --prod
```

## 3. 환경 변수 설정

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Environment Variables
3. 다음 변수 추가:
   - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`: [네이버 Maps API 클라이언트 ID]

## 4. 도메인 설정 (선택)

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정 안내에 따라 도메인 연결

## 5. 자동 배포 설정

- **main/master 브랜치 푸시 시 자동 배포** (기본 설정)
- PR 생성 시 미리보기 배포 자동 생성

## 6. 배포 확인

배포 완료 후:
- Production URL: `https://semophone.vercel.app` (또는 할당된 URL)
- Preview URL: PR별로 자동 생성

## 7. 빌드 최적화 (선택)

`vercel.json`이 이미 설정되어 있습니다:
- Framework: Next.js
- Output Directory: `.next`
- Build Command: `npm run build`

## 트러블슈팅

### 빌드 실패 시
1. 로컬에서 `npm run build` 실행 확인
2. `package.json`의 dependencies 확인
3. Node.js 버전 확인 (권장: 18.x 이상)

### 환경 변수 미적용 시
1. Vercel 대시보드에서 환경 변수 확인
2. 프로젝트 재배포 (Deployments → Redeploy)

### 지도 API 안 나올 때
1. `.env.example`을 참고하여 `.env.local` 생성
2. 네이버 Maps API 키 확인
3. 네이버 클라우드 콘솔에서 Web Dynamic Map 서비스 활성화 확인

## 참고 링크

- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [네이버 Maps API](https://console.ncloud.com/)
