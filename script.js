document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const numberOfImages = 51; // 원하는 이미지 수 설정
    let loadedImages = 0;

    function loadNextImage() {
        if (loadedImages >= numberOfImages) {
            return;
        }

        const i = loadedImages + 1; // 이미지 인덱스
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container fade-in';

        const img = document.createElement('img');
        img.src = `gallery/${i}.jpg`; // 이미지 경로 설정
        img.alt = `Image ${i}`;
        img.className = 'fade-in';

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

        // 이미지 로드 이벤트 처리
        img.onload = function() {
            img.classList.add('visible');
            loadedImages++;
            loadNextImage(); // 다음 이미지 로드
        };

        galleryContainer.appendChild(img);
        gallery.appendChild(galleryContainer);
    }

    // 첫 번째 이미지 로드 시작
    loadNextImage();

    // 페이드 인 애니메이션 처리
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // 요소의 10%가 화면에 보일 때 트리거
        rootMargin: "0px 0px -10% 0px" // 상단 여백 설정
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

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