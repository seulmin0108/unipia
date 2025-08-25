

// Slide functionality
let currentSlide = 1;
const totalSlides = 4;
let isAnimating = false;

// 전역 오류 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    console.error('Error details:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== UNIPIA JavaScript Initialization ===');
    console.log('DOM loaded, initializing JavaScript...');
    console.log('Current timestamp:', new Date().toISOString());
    
    // 스크롤 애니메이션이 진행 중인지 확인하는 변수
    let isScrolling = false;
    // 모든 섹션을 가져옴
    const sections = document.querySelectorAll('section');
    // 현재 보이는 섹션의 인덱스
    let currentSectionIndex = 0;

    // 휠 이벤트 감지
    console.log('Adding wheel event listener...');
    window.addEventListener('wheel', function(event) {
        // 애니메이션 중이면 아무것도 안 함
        if (isScrolling) {
            event.preventDefault();
            return;
        }

        // Shift 키를 누른 상태에서 휠을 돌리면 슬라이드 전환
        if (event.shiftKey) {
            event.preventDefault();
            console.log('=== Shift + Wheel Event Detected ===');
            console.log('Event details:', {
                shiftKey: event.shiftKey,
                deltaY: event.deltaY,
                deltaX: event.deltaX,
                type: event.type
            });
            
            // 현재 community 섹션에 있는지 확인
            const communitySection = document.querySelector('.community');
            console.log('Community section element:', communitySection);
            
            if (communitySection) {
                const rect = communitySection.getBoundingClientRect();
                // 화면의 절반 이상이 community 섹션에 있을 때 슬라이드 전환 활성화
                const isInCommunitySection = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                
                console.log('Community section found:', {
                    rectTop: rect.top,
                    rectBottom: rect.bottom,
                    windowHeight: window.innerHeight,
                    isInCommunitySection: isInCommunitySection,
                    isAnimating: isAnimating,
                    deltaY: event.deltaY
                });
                
                if (isInCommunitySection && !isAnimating) {
                    console.log('Changing slide, direction:', event.deltaY > 0 ? 'left' : 'right');
                    // 휠 아래로 = 왼쪽 슬라이드, 휠 위로 = 오른쪽 슬라이드
                    if (event.deltaY > 0) {
                        // 휠 아래로 = 왼쪽 슬라이드
                        changeSlide(-1);
                    } else {
                        // 휠 위로 = 오른쪽 슬라이드
                        changeSlide(1);
                    }
                    return;
                }
            }
        }

        // 일반적인 섹션 스크롤 (Shift 키를 누르지 않은 경우)
        if (event.deltaY > 0) {
            // 아래로 이동
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                scrollToSection(currentSectionIndex);
            }
        } else {
            // 위로 이동
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                scrollToSection(currentSectionIndex);
            }
        }
    }, { passive: false }); // preventDefault를 위해 passive: false 설정

    // 특정 섹션으로 스크롤하는 함수
    function scrollToSection(index) {
        isScrolling = true;
        const targetSection = sections[index];
        
        // window.scrollTo를 사용하여 부드럽게 이동
        window.scrollTo({
            top: targetSection.offsetTop, // 목표 섹션의 최상단 위치
            behavior: 'smooth' // 부드러운 스크롤 효과
        });

        // 애니메이션이 끝난 후 isScrolling을 false로 변경 (약 0.8초)
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    // changeSlide 함수
    function changeSlide(direction) {
        // Prevent multiple clicks during animation
        if (isAnimating) return;
        isAnimating = true;
        
        const currentSlideElement = document.querySelector(`.slide-content[data-slide="${currentSlide}"]`);
        
        // Calculate new slide
        let newSlide = currentSlide + direction;
        
        // Loop around if necessary
        if (newSlide > totalSlides) {
            newSlide = 1;
        } else if (newSlide < 1) {
            newSlide = totalSlides;
        }
        
        const newSlideElement = document.querySelector(`.slide-content[data-slide="${newSlide}"]`);
        
        // Set up the new slide position
        if (direction > 0) {
            // Moving forward
            newSlideElement.classList.remove('prev');
            newSlideElement.classList.add('next');
        } else {
            // Moving backward
            newSlideElement.classList.remove('next');
            newSlideElement.classList.add('prev');
        }
        
        // Force reflow
        newSlideElement.offsetHeight;
        
        // Start animation
        currentSlideElement.classList.remove('active');
        if (direction > 0) {
            currentSlideElement.classList.add('prev');
        } else {
            currentSlideElement.classList.add('next');
        }
        
        newSlideElement.classList.remove('prev', 'next');
        newSlideElement.classList.add('active');
        
        // Update current slide
        currentSlide = newSlide;
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    // ===================================
    // 드롭다운 메뉴 기능
    // ===================================
    const menuContainer = document.querySelector('.nav-menu-container');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuContainer && dropdownMenu) {
        // 메뉴 영역에 마우스를 올리면 'show' 클래스 추가
        menuContainer.addEventListener('mouseenter', () => {
            dropdownMenu.classList.add('show');
        });

        // 메뉴 영역에서 마우스가 벗어나면 'show' 클래스 제거
        menuContainer.addEventListener('mouseleave', () => {
            dropdownMenu.classList.remove('show');
        });
    }

    // ===================================
    // 드롭다운 메뉴 클릭 시 슬라이드 이동 기능
    // ===================================
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

    // 각 메뉴 링크에 클릭 이벤트 추가
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 링크의 기본 동작(점프) 방지
            
            // 목표 슬라이드 번호 찾기
            const targetHref = this.getAttribute('href');
            let targetSlide = 1; // 기본값은 첫 번째 슬라이드

            if (targetHref === '#marketplace-section') {
                targetSlide = 2;
            } else if (targetHref === '#employment-section') {
                targetSlide = 3;
            } else if (targetHref === '#coming-soon-section') {
                targetSlide = 4;
            } else {
                // 'Community' 링크는 href가 '#community-container' 이므로 여기에 해당
                targetSlide = 1;
            }

            // 현재 슬라이드와 목표 슬라이드의 차이를 계산
            const slideDifference = targetSlide - currentSlide;
            
            // 슬라이드 전환
            if (slideDifference !== 0) {
                changeSlide(slideDifference);
            }
        });
    });

    // ===================================
    // Contact Form Handling
    // ===================================
    if (typeof $ !== 'undefined') {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            // Redirect to coming soon page when form is submitted
            window.location.href = 'coming-soon.html';
        });
    } else {
        console.warn('jQuery not loaded, contact form handling disabled');
    }
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    if (typeof $ !== 'undefined') {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $('.header').addClass('scrolled');
            } else {
                $('.header').removeClass('scrolled');
            }
        });
    } else {
        console.warn('jQuery not loaded, header scroll effect disabled');
    }
    
    // ===================================
    // Animate on Scroll
    // ===================================
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }
    
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Check on page load
    
    // ===================================
    // Partner Links Configuration
    // ===================================
    // 나중에 실제 링크로 쉽게 변경 가능
    const partnerLinks = {
        'The Sun': 'https://www.thesun.co.uk/',
        'Yahoo Finance': 'https://finance.yahoo.com/',
        'British Future': 'https://www.britishfuture.org/',
        'Hemio News': '#',
        'Fox News': 'https://www.foxnews.com/',
        'NBC': 'https://www.nbc.com/',
        'WDPP': '#',
        'Glasgow Times': 'https://www.glasgowtimes.co.uk/',
        'Daily Mail': 'https://www.dailymail.co.uk/',
        'DW': 'https://www.dw.com/'
    };
    
    // ===================================
    // App Store Links Configuration
    // ===================================
    // 실제 앱 링크가 준비되면 아래 URL만 변경하면 됨
    const appLinks = {
        appStore: 'coming-soon.html', // 'https://apps.apple.com/app/unipia'로 변경
        googlePlay: 'coming-soon.html' // 'https://play.google.com/store/apps/details?id=com.unipia'로 변경
    };
    
    // ===================================
    // Initialize Tooltips (if needed)
    // ===================================
    $('[data-toggle="tooltip"]').tooltip();
    
    // ===================================
    // Lazy Loading for Images (Performance)
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, imageOptions);
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    console.log('JavaScript initialization completed');
    
    // 간단한 테스트용 이벤트 리스너
    document.addEventListener('keydown', function(event) {
        if (event.shiftKey) {
            console.log('Shift key pressed down');
        }
    });
    
    document.addEventListener('keyup', function(event) {
        if (!event.shiftKey) {
            console.log('Shift key released');
        }
    });
    
}); // DOMContentLoaded 끝

// 추가 안전장치 - window.onload 이벤트
window.addEventListener('load', function() {
    console.log('=== Window Load Event ===');
    console.log('All resources loaded, checking JavaScript functionality...');
    
    // Community 섹션 재확인
    const communitySection = document.querySelector('.community');
    console.log('Community section on window load:', communitySection);
    
    // 이벤트 리스너 재확인
    console.log('Testing wheel event listener...');
    const testEvent = new WheelEvent('wheel', { deltaY: 100, shiftKey: true });
    console.log('Test event created:', testEvent);
});