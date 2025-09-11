// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.icon');
        this.themeText = this.themeToggle?.querySelector('.text');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Apply saved theme on page load
        this.applyTheme(this.currentTheme);
        
        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.themeIcon && this.themeText) {
            if (theme === 'dark') {
                this.themeIcon.textContent = '☀️';
                this.themeText.textContent = 'Light';
            } else {
                this.themeIcon.textContent = '🌙';
                this.themeText.textContent = 'Dark';
            }
        }
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Initialize theme manager
let themeManager;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    themeManager = new ThemeManager();
    
    // Debug logo image loading
    const headerLogo = document.querySelector('.nav-logo img');
    const footerLogo = document.querySelector('.footer-logo');
    [headerLogo, footerLogo].forEach((img) => {
        if (!img) return;
        img.addEventListener('load', () => console.log('Logo loaded:', img.src));
        img.addEventListener('error', () => console.error('Logo failed to load:', img.src));
    });
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth scrolling to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Fade-in animation for solution cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        observer.observe(card);
    });

    const transportData = [
        
        {
            title: "Ocean Shipping Solutions",
            description: "Cost-effective ocean freight services with comprehensive tracking and customs clearance support for all major global ports.",
            videoSrc: "./assets/shipping.mp4"
        },
        {
            title: "HR Solutions",
            description: "Comprehensive HR solutions for workforce management, including recruitment, onboarding, and employee engagement.",
            videoSrc: "./assets/hr.mp4"
        },
        {
            title: "Warehousing & Distribution",
            description: "Sustainable warehousing solutions for bulk cargo with specialized handling and intermodal connectivity.",
            videoSrc: "./assets/warehouse.mp4"
        }
    ];

    let currentTransportIndex = 0;
    const transportTitle = document.getElementById('transport-title');
    const transportDescription = document.getElementById('transport-description');
    const transportVideo = document.getElementById('transport-video');
    const transportDetailsLink = document.getElementById('transport-details-link');

    function updateTransportContent() {
        const currentData = transportData[currentTransportIndex];
        
        // Fade out effect
        transportTitle.style.opacity = '0';
        transportDescription.style.opacity = '0';
        transportVideo.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            transportTitle.textContent = currentData.title;
            transportDescription.textContent = currentData.description;
            
            // Update video source
            const videoSource = transportVideo.querySelector('source');
            if (videoSource) {
                videoSource.src = currentData.videoSrc;
                transportVideo.load(); // Reload the video element
            } else {
                transportVideo.src = currentData.videoSrc;
            }
            
            // Update details link per item
            if (transportDetailsLink) {
                const mapping = {
                    'Ocean Shipping Solutions': 'shippingDetails.html',
                    'HR Solutions': 'hrDetails.html',
                    'Warehousing & Distribution': 'warehousingDetails.html'
                };
                const href = mapping[currentData.title] || 'transportDetails.html';
                transportDetailsLink.href = href;
            }

            // Add error handling for video
            transportVideo.addEventListener('error', function() {
                console.error('Failed to load transport video:', currentData.videoSrc);
            });
            
            // Fade in effect
            transportTitle.style.opacity = '1';
            transportDescription.style.opacity = '1';
            transportVideo.style.opacity = '1';
            
            // Move to next item
            currentTransportIndex = (currentTransportIndex + 1) % transportData.length;
        }, 500);
    }

    // Start transport rotation
    if (transportTitle && transportDescription && transportVideo) {
        // Set initial opacity for smooth transitions
        transportTitle.style.transition = 'opacity 0.5s ease';
        transportDescription.style.transition = 'opacity 0.5s ease';
        transportVideo.style.transition = 'opacity 0.5s ease';
        
        // Start rotation every 4 seconds
        setInterval(updateTransportContent, 4000);
    }

    // Video slider functionality
    const videoSlides = document.querySelectorAll('.video-slide');
    let currentSlideIndex = 0;

    function showNextSlide() {
        // Remove active class from current slide
        videoSlides[currentSlideIndex].classList.remove('active');
        
        // Move to next slide
        currentSlideIndex = (currentSlideIndex + 1) % videoSlides.length;
        
        // Add active class to new slide
        videoSlides[currentSlideIndex].classList.add('active');
    }

    // Auto-advance video slider every 5 seconds
    if (videoSlides.length > 0) {
        setInterval(showNextSlide, 5000);
    }

    // Form handling
    const quoteForm = document.querySelector('.quote-form');
    const contactForm = document.querySelector('.contact-form');

    // Quote form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const requirements = formData.get('requirements');
            
            // Simple validation
            if (!name || !email || !requirements) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.quote-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you within 24 hours.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Add loading animation for images and videos
    const mediaElements = document.querySelectorAll('video, img');
    mediaElements.forEach(element => {
        element.addEventListener('load', function() {
            console.log('Media loaded successfully:', this.src);
            this.style.opacity = '1';
        });
        
        element.addEventListener('error', function() {
            console.error('Failed to load media:', this.src);
            this.style.opacity = '1'; // Show element even if video fails to load
        });
        
        element.addEventListener('canplay', function() {
            console.log('Video can play:', this.src);
            this.style.opacity = '1';
        });
        
        element.addEventListener('loadeddata', function() {
            console.log('Video data loaded:', this.src);
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease';
    });

    // Special handling for hero video
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        console.log('Hero video element found:', heroVideo);
        console.log('Hero video source:', heroVideo.querySelector('source')?.src);
        
        heroVideo.addEventListener('loadstart', function() {
            console.log('Hero video load started');
        });
        
        heroVideo.addEventListener('loadedmetadata', function() {
            console.log('Hero video metadata loaded');
            this.style.opacity = '1';
        });
        
        heroVideo.addEventListener('canplaythrough', function() {
            console.log('Hero video can play through');
            this.style.opacity = '1';
        });
        
        // Force video to show after 3 seconds regardless
        setTimeout(() => {
            if (heroVideo.style.opacity === '0') {
                console.log('Forcing hero video to show');
                heroVideo.style.opacity = '1';
            }
        }, 3000);
    }

    // Mobile menu toggle
    (function initMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const themeToggle = document.getElementById('theme-toggle');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');

        if (!navMenu || !mobileMenuBtn) return;

        function setMobileState() {
            const isMobile = window.innerWidth <= 768;
            mobileMenuBtn.style.display = isMobile ? 'inline-block' : 'none';
            if (!isMobile) {
                navMenu.classList.remove('mobile-active');
                if (themeToggle) themeToggle.style.display = 'flex';
            } else {
                if (themeToggle) themeToggle.style.display = navMenu.classList.contains('mobile-active') ? 'flex' : 'none';
            }
        }

        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('mobile-active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isActive));
            if (themeToggle) themeToggle.style.display = isActive ? 'flex' : 'none';
        });

        window.addEventListener('resize', setMobileState);
        setMobileState();
    })();

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0077cc, #0056a3);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    createScrollProgress();

    // Add smooth reveal animations for all sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Products section staggered reveal
    const productsSection = document.querySelector('#products.products');
    if (productsSection) {
        const productsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    productsSection.classList.add('products-revealed');
                    productsObserver.disconnect();
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

        productsObserver.observe(productsSection);
    }

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.solution-card, .cta-button, .learn-more-btn, .quote-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('MUTU Solutions website loaded successfully!');
});
