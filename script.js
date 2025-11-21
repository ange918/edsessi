document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        fadeInOnScroll();
    });
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    function fadeInOnScroll() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    fadeInOnScroll();
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const ans = faq.querySelector('.faq-answer');
                    if (ans) {
                        ans.style.maxHeight = null;
                    }
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, stepTime);
    }
    
    function checkStatsVisible() {
        const statsSection = document.querySelector('.stats-section');
        
        if (statsSection && !hasAnimated) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            
            if (sectionTop < window.innerHeight - 100) {
                hasAnimated = true;
                
                statNumbers.forEach(stat => {
                    const targetText = stat.textContent;
                    const target = parseInt(targetText.replace('+', ''));
                    animateCounter(stat, target);
                });
            }
        }
    }
    
    window.addEventListener('scroll', checkStatsVisible);
    checkStatsVisible();
    
    const filtreButtons = document.querySelectorAll('.filtre-btn');
    
    filtreButtons.forEach(button => {
        button.addEventListener('click', function() {
            filtreButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const produits = document.querySelectorAll('.produit-card');
            
            produits.forEach(produit => {
                if (filter === 'tous' || produit.getAttribute('data-category') === filter) {
                    produit.style.display = 'block';
                    setTimeout(() => {
                        produit.style.opacity = '1';
                        produit.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    produit.style.opacity = '0';
                    produit.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        produit.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
    
    const galerieItems = document.querySelectorAll('.galerie-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = [];
    
    galerieItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push(img.src);
            
            item.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox(img.src);
            });
        }
    });
    
    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentImageIndex];
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImg.src = images[currentImageIndex];
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && images.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                lightboxImg.src = images[currentImageIndex];
            } else if (e.key === 'ArrowRight' && images.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                lightboxImg.src = images[currentImageIndex];
            }
        }
    });
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            alert('Merci pour votre message ! Nous vous contacterons très bientôt.');
            
            form.reset();
        });
    });
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    function createParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                
                hero.style.backgroundPositionY = parallax + 'px';
            });
        }
    }
    
    createParallaxEffect();
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
});
