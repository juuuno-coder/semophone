# 알림 발송 설정 가이드

문의 폼에서 이메일 및 SMS 알림을 발송하기 위한 설정 가이드입니다.

---

## 📧 1. Gmail 이메일 설정

### 1-1. Gmail 앱 비밀번호 생성

#### Google 계정 설정
1. [Google 계정](https://myaccount.google.com/) 접속
2. 보안 > 2단계 인증 활성화 (필수)
3. 보안 > 앱 비밀번호 생성

#### 앱 비밀번호 발급
1. 앱 선택: "메일"
2. 기기 선택: "기타(맞춤 이름)" → "세모폰 웹사이트"
3. 생성된 16자리 비밀번호 복사 (예: `abcd efgh ijkl mnop`)

### 1-2. 환경변수 설정

```bash
# Gmail SMTP 설정
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop

# 문의 수신 이메일 (쉼표로 구분)
CONTACT_EMAIL_RECIPIENTS=admin1@example.com,admin2@example.com
```

---

## 📱 2. 뿌리오 SMS/알림톡 설정

### 2-1. 뿌리오 계정 준비

1. [뿌리오 홈페이지](https://www.ppurio.com/) 회원가입
2. 서비스 신청 및 승인
3. 발신번호 등록 및 승인 (본인 인증 필요)
4. API 키 발급

### 2-2. 뿌리오 API 키 발급

1. 뿌리오 관리자 페이지 로그인
2. API 관리 > API 키 발급
3. 계정명과 API 키 복사

### 2-3. 환경변수 설정

```bash
# 뿌리오 SMS 설정
PPURIO_ACCOUNT=your-account-name
PPURIO_API_KEY=your-api-key-here
PPURIO_SENDER_NUMBER=01012345678

# SMS 수신 전화번호 (쉼표로 구분, 숫자만)
CONTACT_SMS_RECIPIENTS=01011112222,01033334444
```

### 2-4. 발신번호 등록 방법

1. 뿌리오 관리자 페이지 > 발신번호 관리
2. 발신번호 추가 (본인 명의 번호만 가능)
3. 본인 인증 완료 (통신사 인증 또는 서류 제출)
4. 승인 대기 (1-2 영업일)

### 2-5. 요금 안내

- SMS (단문): 90자 이하, 약 10-15원/건
- LMS (장문): 2,000자 이하, 약 30-40원/건
- 알림톡: 템플릿 등록 필요, 약 5-8원/건

---

## 🔧 3. 전체 환경변수 설정

`.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
# ========== Gmail 이메일 설정 ==========
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop
CONTACT_EMAIL_RECIPIENTS=admin1@example.com,admin2@example.com

# ========== 뿌리오 SMS 설정 ==========
PPURIO_ACCOUNT=your-ppurio-account
PPURIO_API_KEY=your-ppurio-api-key
PPURIO_SENDER_NUMBER=01012345678
CONTACT_SMS_RECIPIENTS=01011112222,01033334444
```

### 환경변수 설명

| 변수명 | 설명 | 필수여부 |
|--------|------|----------|
| `EMAIL_USER` | Gmail 발신 주소 | 선택 |
| `EMAIL_APP_PASSWORD` | Gmail 앱 비밀번호 | 선택 |
| `CONTACT_EMAIL_RECIPIENTS` | 이메일 수신자들 | 선택 |
| `PPURIO_ACCOUNT` | 뿌리오 계정명 | 선택 |
| `PPURIO_API_KEY` | 뿌리오 API 키 | 선택 |
| `PPURIO_SENDER_NUMBER` | SMS 발신번호 | 선택 |
| `CONTACT_SMS_RECIPIENTS` | SMS 수신 전화번호들 | 선택 |

**참고:** 이메일 또는 SMS 중 하나만 설정해도 작동합니다. 둘 다 설정하면 동시 발송됩니다.

---

## 🚀 4. Vercel 배포 시 설정

Vercel 대시보드에서 환경변수 설정:

1. 프로젝트 Settings > Environment Variables
2. 위의 모든 환경변수 추가
3. Production, Preview, Development 모두 체크
4. Redeploy

---

## 🧪 5. 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
# 메인 페이지 하단의 문의 폼에서 테스트 문의 제출
```

### 테스트 체크리스트

- [ ] 이메일 알림 수신 확인
- [ ] SMS 알림 수신 확인
- [ ] 문의 폼 UI 정상 작동
- [ ] 성공/실패 메시지 표시 확인

---

## 🔍 6. 트러블슈팅

### Gmail 이메일 관련

**"Email configuration needed" 경고**
- `.env.local` 파일이 있는지 확인
- 환경변수가 올바르게 설정되었는지 확인
- 개발 서버를 재시작

**"Failed to send email" 오류**
- Gmail 앱 비밀번호가 정확한지 확인 (공백 제거)
- Gmail 계정의 2단계 인증이 활성화되어 있는지 확인
- 방화벽이나 보안 프로그램이 SMTP를 차단하지 않는지 확인

**이메일이 스팸으로 분류됨**
- Gmail 설정에서 해당 발신자를 안전한 발신자로 추가
- SPF, DKIM 레코드 설정 (고급)

### 뿌리오 SMS 관련

**"PPURIO configuration missing" 경고**
- 뿌리오 환경변수가 설정되었는지 확인
- 계정명과 API 키가 정확한지 확인

**SMS 발송 실패**
- 발신번호가 뿌리오에 등록되고 승인되었는지 확인
- API 키가 유효한지 확인
- 충전 금액이 충분한지 확인
- 수신번호 형식 확인 (숫자만, 하이픈 없음)

**API 인증 오류**
- 뿌리오 API 키를 다시 확인
- 뿌리오 서비스 상태 확인

---

## 🔐 7. 보안 주의사항

⚠️ **절대로 `.env.local` 파일을 Git에 커밋하지 마세요!**

`.gitignore`에 이미 포함되어 있지만, 실수로 커밋하지 않도록 주의하세요.

```bash
# .gitignore에 포함되어야 할 항목
.env
.env.local
.env.*.local
```

### 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함됨
- [ ] API 키가 코드에 하드코딩되지 않음
- [ ] Vercel 환경변수가 암호화되어 저장됨
- [ ] 발신번호가 본인 명의로 등록됨

---

## 📚 8. 추가 기능: 알림톡 (선택사항)

뿌리오는 카카오 알림톡도 지원합니다.

### 알림톡 설정 단계

1. **카카오 비즈니스 채널 생성**
   - [카카오 비즈니스](https://business.kakao.com/) 가입
   - 채널 생성 및 검수

2. **뿌리오에서 알림톡 연동**
   - 뿌리오 관리자 > 알림톡 설정
   - 카카오 채널 연동

3. **알림톡 템플릿 등록**
   - 템플릿 작성 및 제출
   - 카카오 검수 대기 (1-2일)
   - 승인 후 템플릿 코드 발급

4. **코드 구현**
   - `lib/ppurio.ts`의 `sendAlimtalk()` 함수 사용
   - 템플릿 코드와 변수 매핑

### 알림톡 템플릿 예시

```
[세모폰 문의 접수]
#{고객명}님의 문의가 접수되었습니다.
연락처: #{연락처}

빠른 시일 내에 연락드리겠습니다.
```

---

## 📞 문의

설정 중 문제가 발생하면:
- 뿌리오 고객센터: 1544-5150
- Gmail 고객센터: [Google 고객센터](https://support.google.com/mail/)
