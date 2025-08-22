// Slide functionality
let currentSlide = 1;
const totalSlides = 4;
let isAnimating = false;


// 즉시 실행 함수로 변수 충돌 방지
(function() {
    // 스크롤 애니메이션이 진행 중인지 확인하는 변수
    let isScrolling = false;
    // 모든 섹션을 가져옴
    const sections = document.querySelectorAll('section');
    // 현재 보이는 섹션의 인덱스
    let currentSectionIndex = 0;

    // 휠 이벤트 감지
    window.addEventListener('wheel', function(event) {
        // 애니메이션 중이면 아무것도 안 함
        if (isScrolling) {
            event.preventDefault();
            return;
        }

        // event.deltaY > 0 이면 아래로 스크롤, 음수면 위로 스크롤
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

})();

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


// Initialize slides on page load
// HTML 문서가 모두 로드되면 실행합니다.
document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // 드롭다운 메뉴 기능
    // ===================================
    const menuContainer = document.querySelector('.nav-menu-container');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // 메뉴 영역에 마우스를 올리면 'show' 클래스 추가
    menuContainer.addEventListener('mouseenter', () => {
        dropdownMenu.classList.add('show');
    });

    // 메뉴 영역에서 마우스가 벗어나면 'show' 클래스 제거
    menuContainer.addEventListener('mouseleave', () => {
        dropdownMenu.classList.remove('show');
    });


    // ===================================
    // 드롭다운 메뉴 클릭 시 슬라이드 이동 기능
    // ===================================
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    const slides = document.querySelectorAll('.slide-content');
    const totalSlides = slides.length;
    let currentSlide = 1; // 현재 보이는 슬라이드 번호 (1번부터 시작)

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
            
            // 현재 슬라이드와 목표 슬라이드가 다를 경우에만 슬라이드 변경
            if (targetSlide !== currentSlide) {
                // 모든 슬라이드에서 'active' 클래스 제거
                slides.forEach(slide => {
                    slide.classList.remove('active');
                });

                // 목표 슬라이드에 'active' 클래스 추가
                const newSlideElement = document.querySelector(`.slide-content[data-slide="${targetSlide}"]`);
                if (newSlideElement) {
                    newSlideElement.classList.add('active');
                    currentSlide = targetSlide; // 현재 슬라이드 번호 업데이트
                }
            }
        });
    });
});





$(document).ready(function() {
    
    // ===========================
    // Tab Navigation Functionality
    // ===========================
    $('.tab-btn').click(function() {
        // Remove active class from all tabs and panes
        $('.tab-btn').removeClass('active');
        $('.tab-pane').removeClass('active');
        
        // Add active class to clicked tab
        $(this).addClass('active');
        
        // Show corresponding pane
        const tabId = $(this).data('tab');
        $('#' + tabId).addClass('active');
    });
    
    // ===========================
    // Activities Slider Configuration
    // ===========================
    $('.activities-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    // ===========================
    // Partners Slider Configuration (First Row)
    // ===========================
    $('.partners-slider').slick({
        dots: false,
        infinite: true,
        speed: 3000,  // 첫 번째 줄 속도
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        pauseOnHover: false,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    // ===========================
    // Partners Slider Configuration (Second Row)
    // ===========================
    $('.partners-slider-2').slick({
        dots: false,
        infinite: true,
        speed: 4000,  // 두 번째 줄 다른 속도
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        pauseOnHover: false,
        arrows: false,
        rtl: true, // Reverse direction for variety
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    // ===========================
    // Smooth Scroll for Navigation Links
    // ===========================
    $('a[href^="#"]').on('click', function(event) {
        const target = $(this.getAttribute('href'));
        if(target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // ===========================
    // Contact Form Handling
    // ===========================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        // Redirect to coming soon page when form is submitted
        window.location.href = 'coming-soon.html';
    });
    
    // ===========================
    // Header Scroll Effect
    // ===========================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
    
    // ===========================
    // Animate on Scroll
    // ===========================
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
    
    // ===========================
    // Mobile Menu Toggle (Future Enhancement)
    // ===========================
    // Placeholder for mobile menu functionality
    // Can be implemented when mobile menu button is added
    
    // ===========================
    // Partner Links Configuration
    // ===========================
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
    
    // ===========================
    // App Store Links Configuration
    // ===========================
    // 실제 앱 링크가 준비되면 아래 URL만 변경하면 됨
    const appLinks = {
        appStore: 'coming-soon.html', // 'https://apps.apple.com/app/unipia'로 변경
        googlePlay: 'coming-soon.html' // 'https://play.google.com/store/apps/details?id=com.unipia'로 변경
    };
    
    // ===========================
    // Initialize Tooltips (if needed)
    // ===========================
    $('[data-toggle="tooltip"]').tooltip();
    
    // ===========================
    // Lazy Loading for Images (Performance)
    // ===========================
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
    
});