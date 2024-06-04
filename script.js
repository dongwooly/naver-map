document.addEventListener("DOMContentLoaded", function() {
    const firstImage = document.getElementById('firstImage');
    const gallery = document.getElementById('gallery');
    const numberOfImages = 51; // 원하는 이미지 수 설정

    // 첫 번째 이미지가 로드된 후 나머지 요소를 표시하고 페이드 인 적용
    firstImage.onload = function() {
        firstImage.classList.add('loaded');

        // 모든 이미지를 한 번에 로드하고 표시
        for (let i = 1; i <= numberOfImages; i++) {
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'gallery-container';

            const img = document.createElement('img');
            img.src = `gallery/${i}.jpg`; // 이미지 경로 설정
            img.alt = `Image ${i}`;

            // 마우스 오른쪽 클릭 방지
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            });

            // 모바일 롱 프레스 방지
            img.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) {
                    e.preventDefault();
                    img.style.pointerEvents = 'none';
                    setTimeout(() => {
                        img.style.pointerEvents = 'auto';
                    }, 500);
                }
            });

            galleryContainer.appendChild(img);
            gallery.appendChild(galleryContainer);
        }

        // 페이드 인 애니메이션 처리
        const faders = document.querySelectorAll('.fade-in');

        const appearOptions = {
            threshold: 0.1, // 요소의 10%가 화면에 보일 때 트리거
            rootMargin: "0px 0px -10% 0px" // 상단 여백 설정
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    };

    // 첫 번째 이미지가 캐시에서 로드된 경우에도 onload 트리거
    if (firstImage.complete) {
        firstImage.onload();
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert('계좌번호가 복사되었습니다. 감사합니다!');
        }, function(err) {
            console.error('복사에 실패했습니다.', err);
        });
    }

    // 이미지 복사 방지를 위한 기존 코드 유지
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
});