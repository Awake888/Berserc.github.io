// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');

burger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ff1a1a"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff1a1a",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Gallery Slider
    const sliderTrack = document.querySelector('.slider-track');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Убедитесь, что пути к изображениям правильные и файлы существуют
   const photos = [
  'https://awake888.github.io/Berserc.github.io/img/photo1.jpg',
  'https://awake888.github.io/Berserc.github.io/img/photo2.jpg',
  'https://awake888.github.io/Berserc.github.io/img/photo3.jpg',
  'https://awake888.github.io/Berserc.github.io/img/photo4.jpg',
  'https://awake888.github.io/Berserc.github.io/img/photo5.jpg'
];
    
    let currentSlide = 0;
    
    // Проверяем, есть ли фотографии для загрузки
    if (photos.length === 0) {
        console.error('Нет фотографий для загрузки. Проверьте пути к изображениям.');
        return;
    }
    
    // Создаем слайды
    photos.forEach((photo, index) => {
        // Добавляем слайд
        const slide = document.createElement('div');
        slide.className = 'slider-item';
        slide.innerHTML = `<img src="${photo}" alt="Фото клуба ${index + 1}" onerror="this.style.display='none'">`;
        sliderTrack.appendChild(slide);
        
        // Добавляем точку
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const updateSlider = () => {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активную точку
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };
    
    const goToSlide = (slideIndex) => {
        currentSlide = slideIndex;
        updateSlider();
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % photos.length;
        updateSlider();
    };
    
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + photos.length) % photos.length;
        updateSlider();
    };
    
    // Назначаем обработчики
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Автоперелистывание (каждые 5 секунд)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Останавливаем при наведении
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Price table data
    const priceTable = document.querySelector('.price-table tbody');
    if (priceTable) {
        const prices = [
            {
                zone: "STANDARD 10",
                specs: "NVIDIA GEFORCE RTX 4060 TI",
                prices: ["200", "480", "650", "1320", "520", "750"]
            },
            {
                zone: "BOOTCAMP 5",
                specs: "NVIDIA GEFORCE RTX 4060 TI",
                prices: ["230", "550", "750", "1520", "620", "950"]
            },
            {
                zone: "COMFORT 5",
                specs: "",
                prices: ["260", "620", "850", "1720", "720", "1150"]
            },
            {
                zone: "SQUAD 4",
                specs: "NVIDIA GEFORCE RTX 4070 SUPER",
                prices: ["320", "770", "1050", "2120", "820", "1250"]
            },
            {
                zone: "PREMIUM 5",
                specs: "",
                prices: ["350", "860", "1050", "2320", "1020", "1450"]
            },
            {
                zone: "PLAYSTATION 1",
                specs: "5 PRO",
                prices: ["600", "1400", "-", "-", "1620", "2350"]
            },
            {
                zone: "STREAM ROOM 1",
                specs: "NVIDIA GEFORCE RTX 5080",
                prices: ["390", "930", "1250", "-", "1220", "1650"]
            }
        ];
        
        prices.forEach(item => {
            const row = document.createElement('tr');
            if (item.zone === "COMFORT 5") row.classList.add('highlight');
            
            let zoneCell = `<td>${item.zone}`;
            if (item.specs) zoneCell += `<br><small>${item.specs}</small>`;
            zoneCell += `</td>`;
            
            row.innerHTML = zoneCell + item.prices.map(price => `<td>${price}</td>`).join('');
            priceTable.appendChild(row);
        });
    }
});
