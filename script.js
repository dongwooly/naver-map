// 이미지 복사 방지를 위한 기존 코드 유지
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const numberOfImages = 51; // 원하는 이미지 수 설정

    for (let i = 1; i <= numberOfImages; i++) {
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container'; // fade-in 클래스 제거

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

    // 스크롤 이벤트 처리
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "-10% 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
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