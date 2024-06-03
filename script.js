// script.js

document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const numberOfImages = 55; // 원하는 이미지 수 설정

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

    // 스크롤 이벤트 처리
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
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

    // 터치 이벤트에서 수평 스크롤만 허용
    let startX;
    gallery.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchmove', function(e) {
        let moveX = e.touches[0].clientX;
        let diffX = moveX - startX;

        // 수평 이동만 허용
        if (Math.abs(diffX) > 10) {
            e.stopPropagation();
        } else {
            e.preventDefault();
        }
    }, { passive: false });
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('계좌번호가 복사되었습니다. 감사합니다!');
    }, function(err) {
        console.error('복사에 실패했습니다.', err);
    });
}

document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});