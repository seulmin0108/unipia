# UNIPIA - Your Campus Hub

## 최근 업데이트 (2024-12-19)

### 주요 개선사항
- **앱스토어 링크 관리 시스템 개선**: HTML에서 직접 링크 관리로 변경 (4곳 수정으로 모든 링크 업데이트)
- **Advertising 섹션 구조 개선**: 이미지와 설명 텍스트를 분리하여 독립적인 레이아웃 구성
- **Section Title 위치 최적화**: Community 섹션의 제목을 독립적인 컨테이너로 분리하여 위치 조정 가능
- **Coming Soon 이미지 크기 커스터마이징**: 전용 CSS 클래스로 독립적인 크기 조정 가능

### 새로운 기능 (중요)
- **Shift + 휠 슬라이드 전환**: Community 섹션에서 Shift 키를 누른 상태로 휠을 돌리면 슬라이드가 좌우로 전환
  - 휠 아래로 = 왼쪽 슬라이드
  - 휠 위로 = 오른쪽 슬라이드

### 기술적 개선
- **CSS 구조 최적화**: 반응형 브레이크포인트 및 섹션별 스타일링 개선
- **JavaScript 기능 강화**: 슬라이더 전환 로직 및 이벤트 핸들링 개선
- **이미지 관리 시스템**: 각 섹션별 이미지 최적화 및 배치 개선

### 사용자 경험 개선
- **직관적인 네비게이션**: 키보드와 마우스 휠을 조합한 새로운 슬라이드 전환 방식
- **일관된 링크 관리**: 앱스토어 링크 변경 시 한 번에 모든 버튼 업데이트
- **반응형 디자인 강화**: 다양한 화면 크기에서의 최적화된 레이아웃








## 프로젝트 개요

UNIPIA는 다음과 같은 기능을 제공하는 캠퍼스 앱입니다:
- **Community**: 학교별 게시판 및 자유 게시판
- **Marketplace**: 강의 자료, 티켓 거래 플랫폼
- **Employment**: 취업 및 인턴십 정보
- **Coming Soon**: 새로운 기능들

## 파일 구조

```
Unipia/
├── index.html              # 메인 랜딩 페이지
├── coming-soon.html        # Coming Soon 페이지
├── css/
│   └── style.css          # 메인 스타일시트 (1,200+ 라인)
├── js/
│   └── main.js            # 메인 JavaScript 파일 (450+ 라인)
└── Images/                # 이미지 리소스
    ├── activity/          # 활동 이미지들 (9개)
    ├── Advertising/       # 광고 관련 이미지 (2개)
    ├── Partners/          # 파트너 로고들 (14개)
    └── ...               # 기타 이미지들 
```

## Structure구조

### CDN 링크 (index.html에 포함됨)
- Google Fonts (Inter)
- Font Awesome 6.4.0
- jQuery 3.6.0
- Slick Carousel 1.8.1

### 로컬 파일
- `css/style.css` - 메인 스타일시트
- `js/main.js` - 메인 JavaScript 로직
- `Images/` - 모든 이미지 리소스

## 주요 기능

### 1. 반응형 디자인
- 13인치, 14인치, 15인치 MacBook 최적화
- 모바일 디바이스 지원
- 다양한 화면 크기에 대응

### 2. 인터랙티브 슬라이더
- Community, Marketplace, Employment, Coming Soon 섹션
- 부드러운 전환 애니메이션
- 네비게이션 화살표

### 3. 무한 스크롤 파트너 로고
- 자동 스크롤 애니메이션
- 양방향 스크롤 효과

### 4. 앱스토어 링크 관리
- Hero 섹션과 Footer 섹션의 앱 다운로드 버튼
- 한 곳에서 링크 관리 가능

## 🔗 앱스토어 링크 관리

앱스토어 링크를 변경하려면 `index.html`에서 4곳을 수정하시면 됩니당
- js에서 링크 바꾸면 통합되게 하려고 했는데 시간 부족 ㅠㅠ

```html
<!-- Hero 섹션 -->
<a href="https://apps.apple.com/us/app/unipia/id1608830229?l=ko">App Store</a>
<a href="https://play.google.com/store/apps/details?id=com.unipia.unipia&hl=ko">Google Play</a>

<!-- Footer 섹션 -->
<a href="https://play.google.com/store/apps/details?id=com.unipia.unipia&hl=ko">Google Play</a>
<a href="https://apps.apple.com/us/app/unipia/id1608830229?l=ko">App Store</a>
```

## 코드 관리 포인트

### 1. CSS 구조
- **반응형 브레이크포인트**: 1440px, 1512px, 1680px, 1920px
- **섹션별 높이**: 모든 섹션이 `100vh`로 설정
- **커스텀 변수**: `#6B46FF` (메인 컬러)
- **폰트**: Inter (Google Fonts)

### 2. JavaScript 기능
- **슬라이더**: 4개 섹션 간 전환
- **스크롤 애니메이션**: 부드러운 섹션 전환
- **파트너 로고**: 무한 스크롤 애니메이션
- **메뉴 토글**: 드롭다운 메뉴

### 3. 이미지 관리
- **활동 이미지**: 9개 (다양한 크기)
- **파트너 로고**: 14개 (스크롤 애니메이션)
- **광고 이미지**: 2개 (좌우 배치)
- **아이콘**: Font Awesome 사용

## 배포 시 중요 포인트

### 1. 파일 경로
- 모든 이미지 경로가 `Images/` 폴더 기준으로 설정됨
- 대소문자 구분 주의 (Windows vs Linux)

### 2. CDN 의존
- Google Fonts, Font Awesome, jQuery, Slick Carousel이 CDN으로 로드됨

### 3. 성능 최적화
- 이미지 최적화 권장 (WebP 형식)
- Gzip 압축 설정
- 정적 리소스 캐싱 (1년)

### 4. SEO 설정
- 메타 태그 설정 필요
- 구조화된 데이터 추가 권장

### 5. 보안 헤더 (UK GDPR)
```nginx
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

## 주요 CSS 클래스

### 레이아웃
- `.hero` - 메인 히어로 섹션
- `.community` - 슬라이더 섹션
- `.activities` - 활동 이미지 그리드
- `.advertising` - 광고 섹션
- `.partners` - 파트너 로고 섹션
- `.footer-combined` - 푸터 섹션

### 슬라이더
- `.slide-content` - 개별 슬라이드
- `.slide-arrow` - 네비게이션 화살표
- `.section-title-container` - 제목 컨테이너

### 반응형
- `@media (max-width: 1440px)` - 13인치 MacBook
- `@media (min-width: 1441px) and (max-width: 1512px)` - 14인치 MacBook
- `@media (min-width: 1513px) and (max-width: 1680px)` - 15인치 MacBook

## 문제 해결

### 일반적인 문제들

1. **이미지가 로드되지 않음**
   - 파일 경로 확인
   - 대소문자 구분 확인
   - 파일 권한 확인

2. **CSS가 적용되지 않음**
   - 캐시 삭제
   - 파일 경로 확인
   - 브라우저 개발자 도구에서 오류 확인

3. **JavaScript 오류**
   - 콘솔 오류 확인
   - jQuery 로드 확인
   - 파일 경로 확인

## 연락처

- **Email**: pansarq0108@naver.com

## 📄 라이선스

이 프로젝트는 UNIPIA의 소유입니다.

---

**배포 완료 후 확인사항:**
- [ ] 모든 이미지가 정상적으로 로드되는지 확인
- [ ] 반응형 디자인이 모든 디바이스에서 작동하는지 확인
- [ ] 앱스토어 링크가 올바르게 작동하는지 확인
- [ ] SEO 메타 태그가 설정되어 있는지 확인
- [ ] 성능 최적화가 적용되어 있는지 확인

**AWS UK 리전 특화 확인사항:**
- [ ] S3 버킷이 eu-west-1 리전에 생성되었는지 확인
- [ ] CloudFront 배포가 완료되었는지 확인 (선택사항)
- [ ] SSL 인증서가 적용되었는지 확인
- [ ] UK GDPR 준수를 위한 보안 헤더가 설정되었는지 확인
- [ ] 도메인 연결이 완료되었는지 확인
- [ ] 백업 및 모니터링이 설정되었는지 확인

