// ============================================
// Main JavaScript for Portfolio Website
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Theme Toggle
    // ============================================
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to light theme
        body.setAttribute('data-theme', 'light');
    }
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // ============================================
    // Navigation
    // ============================================
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'var(--bg-primary)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--bg-primary)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
    
    // Active navigation link
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.navbar-nav a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.navbar-nav a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // ============================================
    // Back to Top Button
    // ============================================
    
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // Skill Bars Animation
    // ============================================
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            const barRect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (barRect.top < windowHeight && barRect.bottom > 0) {
                bar.style.width = width + '%';
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // ============================================
    // Contact Form
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission
        // In a real application, you would send this to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        formMessage.className = 'alert alert-success';
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.classList.remove('d-none');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.classList.add('d-none');
        }, 5000);
    });
    
    // ============================================
    // AOS Animation Initialization
    // ============================================
    
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // ============================================
    // Typing Effect for Hero Title
    // ============================================
    
    function typeWriter() {
        const text = "Umesh Mahadev Shendge";
        const heroTitle = document.querySelector('.hero-title');
        
        if (heroTitle && !heroTitle.getAttribute('data-typed')) {
            heroTitle.setAttribute('data-typed', 'true');
            let i = 0;
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            function type() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            }
            
            // Start typing after a short delay
            setTimeout(type, 500);
        }
    }
    
    // Run typing effect when page loads
    typeWriter();
    
    // ============================================
    // Parallax Effect for Hero Section
    // ============================================
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroSection && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.001);
        }
    });
    
    // ============================================
    // Project Cards Hover Effect
    // ============================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // Smooth Reveal Animation for Sections
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ============================================
    // Download Resume Function
    // ============================================
    
    const downloadBtn = document.querySelector('.btn-primary');
    
    if (downloadBtn && downloadBtn.textContent.includes('Download Resume')) {
        downloadBtn.addEventListener('click', function(e) {
            // Check if the resume file exists
            const resumePath = downloadBtn.getAttribute('href');
            if (!resumePath || resumePath === '#') {
                e.preventDefault();
                alert('Resume download will be available soon! Please contact me via email for a copy.');
            }
            // If href is valid, allow default download behavior
        });
    }
    
    // ============================================
    // Mobile Menu Toggle Enhancement
    // ============================================
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
    
    // ============================================
    // Counter Animation for Stats
    // ============================================
    
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // ============================================
    // Preloader (Optional)
    // ============================================
    
    window.addEventListener('load', function() {
        // Add any preloader logic here if needed
        document.body.classList.add('loaded');
    });
    
    // ============================================
    // Custom Cursor (Optional Enhancement)
    // ============================================
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}