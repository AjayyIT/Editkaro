// 1. Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

const interactiveElements = document.querySelectorAll('.interactive-card, .filter-btn, .lightbox-close, a, button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-play'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-play'));
});

document.addEventListener('mouseleave', () => cursor.style.display = 'none');
document.addEventListener('mouseenter', () => cursor.style.display = 'flex');

// 2. Timeline Progress Bar
const timeline = document.getElementById('timeline-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    timeline.style.width = `${scrollPercent}%`;
});

// 3. Dynamic Neon Navbar Tracking
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-item');
const indicator = document.getElementById('nav-indicator');

function updateNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
            moveIndicator(item);
        }
    });
}

function moveIndicator(activeItem) {
    if (!activeItem || !indicator) return;
    
    const navContainer = document.getElementById('navbar').getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    
    // Set the width of the underline to match the word
    indicator.style.width = `${itemRect.width}px`;
    
    // Calculate the left position relative to the navbar
    const leftPosition = itemRect.left - navContainer.left;
    indicator.style.transform = `translateX(${leftPosition}px)`;
}

window.addEventListener('scroll', updateNav);
window.addEventListener('resize', updateNav);
setTimeout(updateNav, 100); 

// 4. Intersection Observer (Slide-up Animations)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// 5. Dynamic Filter & Theme Swapper
const filterBtns = document.querySelectorAll('.filter-btn:not(.surprise)');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.body.className = '';
        if(btn.dataset.theme) {
            document.body.classList.add(btn.dataset.theme);
        }

        const filterValue = btn.dataset.filter;
        cards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.classList.remove('hidden');
                card.style.position = 'relative'; 
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    if(card.classList.contains('hidden')){
                        card.style.position = 'absolute'; 
                    }
                }, 400); 
            }
        });
    });
});

// "Surprise Me" Randomizer Logic
const surpriseBtn = document.getElementById('surprise-btn');
surpriseBtn.addEventListener('click', () => {
    const validFilters = Array.from(filterBtns).filter(btn => btn.dataset.filter !== 'all');
    const randomBtn = validFilters[Math.floor(Math.random() * validFilters.length)];
    randomBtn.click();
});

// 6. Cinematic 3D Tilt & Local Hybrid Video Hover
cards.forEach(card => {
    const glare = card.querySelector('.glare');
    const hoverVideo = card.querySelector('.hover-video');

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
        if (glare) glare.style.transition = 'none';

        if (hoverVideo) {
            const playPromise = hoverVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.warn("Video playback prevented.", error));
            }
        }
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        if (glare) {
            glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            glare.style.opacity = 0.5;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        
        if (glare) {
            glare.style.transition = 'opacity 0.5s ease';
            glare.style.opacity = 0;
        }

        if (hoverVideo) {
            hoverVideo.pause();
            hoverVideo.currentTime = 0;
        }
    });
});

// 7. Before & After Color Grading Slider
const baSlider = document.getElementById('ba-slider');
const baBeforeLayer = document.getElementById('ba-before');
const baLine = document.getElementById('ba-line');

baSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    baBeforeLayer.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
    baLine.style.left = `${val}%`;
});

// 8. Ambient Lightbox (Local Video Version)
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const mainVideo = document.getElementById('main-video');
const ambientVideo = document.getElementById('ambient-video');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.dataset.videoSrc;
        
        if (videoSrc) {
            mainVideo.src = videoSrc;
            ambientVideo.src = videoSrc;
            
            lightbox.classList.add('active');
            
            mainVideo.play().catch(e => console.warn(e));
            ambientVideo.play().catch(e => console.warn(e));
        }
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    
    mainVideo.pause();
    ambientVideo.pause();
    
    setTimeout(() => {
        mainVideo.src = '';
        ambientVideo.src = '';
    }, 400); 
});