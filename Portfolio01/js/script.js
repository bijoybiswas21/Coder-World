// Enhanced Navigation System
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.progressBar = document.getElementById('progress-bar');
        this.themeToggle = document.getElementById('theme-toggle');
        this.sections = document.querySelectorAll('section');

        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupActiveSection();
        this.setupThemeToggle();
        this.setupProgressBar();
    }

    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');

            // Add body scroll lock when menu is open
            if (this.hamburger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.hamburger.classList.contains('active')) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    const navbarHeight = this.navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add scrolled class for background effects
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    setupActiveSection() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveLink(sectionId);
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveLink(activeSection) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            }
        });
    }

    setupThemeToggle() {
        let isDark = localStorage.getItem('darkMode') === 'true';

        if (isDark) {
            document.body.classList.add('dark-mode');
            this.themeToggle.classList.add('dark');
        }

        this.themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            document.body.classList.toggle('dark-mode');
            this.themeToggle.classList.toggle('dark');
            localStorage.setItem('darkMode', isDark);

            // Add ripple effect
            this.createRipple(this.themeToggle, event);
        });
    }

    setupProgressBar() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            this.progressBar.style.width = scrollPercent + '%';
        });
    }

    createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// Enhanced Logo Animation
function initLogoAnimation() {
    const logoIcon = document.querySelector('.logo-icon');
    const logoText = document.querySelector('.logo-text');

    if (logoIcon && logoText) {
        // Add floating animation to logo
        setInterval(() => {
            logoIcon.style.transform = 'translateY(-2px) rotate(2deg)';
            setTimeout(() => {
                logoIcon.style.transform = 'translateY(0) rotate(0deg)';
            }, 1000);
        }, 3000);

        // Add typing effect to logo title
        const logoTitle = document.querySelector('.logo-title');
        if (logoTitle) {
            const text = logoTitle.textContent;
            logoTitle.textContent = '';

            let i = 0;
            const typeInterval = setInterval(() => {
                logoTitle.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    }
}

// Navigation Link Hover Effects
function initNavLinkEffects() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Create magnetic effect
            link.style.transform = 'translateY(-3px) scale(1.05)';
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(0) scale(1)';
            }
        });

        // Add click animation
        link.addEventListener('click', (e) => {
            // Create click effect
            const clickEffect = document.createElement('div');
            clickEffect.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: clickExpand 0.5s ease-out;
                pointer-events: none;
            `;

            link.style.position = 'relative';
            link.appendChild(clickEffect);

            setTimeout(() => clickEffect.remove(), 500);
        });
    });
}

// Add floating navigation dots (optional)
function createFloatingDots() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'nav-dots';

    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.setAttribute('data-section', section);

        dot.addEventListener('click', () => {
            const target = document.getElementById(section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });

        dotsContainer.appendChild(dot);
    });

    document.body.appendChild(dotsContainer);

    // Update active dot based on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                document.querySelectorAll('.nav-dot').forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add CSS animations for navigation
function addNavigationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes clickExpand {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        .nav-menu.active {
            left: 0 !important;
            opacity: 1;
            visibility: visible;
        }
        
        .dark-mode {
            --bg-color: #1a1a1a;
            --text-color: #ffffff;
            --card-bg: #2d2d2d;
        }
        
        .dark-mode .nav-blur {
            background: rgba(26, 26, 26, 0.95) !important;
        }
        
        .dark-mode .logo-name {
            color: #ffffff !important;
        }
        
        .dark-mode .nav-link {
            color: #cccccc !important;
        }
        
        .dark-mode .section-title {
            color: #ffffff !important;
        }
        
        .navbar {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link {
            position: relative;
            overflow: hidden;
        }
        
        .logo-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize all navigation features
function initNavigation() {
    new NavigationManager();
    initLogoAnimation();
    initNavLinkEffects();
    addNavigationStyles();

    // Optional: Add floating dots (uncomment if desired)
    // createFloatingDots();
}

// Enhanced Typing Effect for Hero Section
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Mouse Movement Effect for Hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * 5;
    const rotateY = (centerX - x) / centerX * 5;

    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

// Scroll Indicator Click Handler
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-arrow');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-content');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Skills Section Animations
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
            fill.style.width = width + '%';
        }, 500);
    });
}

// Tech Cards Interaction
function initTechCards() {
    const techCards = document.querySelectorAll('.tech-card');

    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add click effect for tech cards
        card.addEventListener('click', () => {
            const techName = card.querySelector('h4').textContent;
            const techDescription = card.querySelector('p').textContent;

            // Create a simple modal effect (you can enhance this)
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 400px;
                text-align: center;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;

            modalContent.innerHTML = `
                <h3 style="color: #2c3e50; margin-bottom: 1rem;">${techName}</h3>
                <p style="color: #666; margin-bottom: 1.5rem;">${techDescription}</p>
                <button onclick="this.closest('.modal').remove()" style="
                    background: linear-gradient(45deg, #ff6b6b, #feca57);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">Close</button>
            `;

            modal.className = 'modal';
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Animate modal appearance
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);

            // Close modal on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
}

// Skill Tags Animation
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        // Stagger animation
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);

        // Add hover sound effect (visual feedback)
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Intersection Observer for Skills Section
function initSkillsObserver() {
    const skillsSection = document.querySelector('#skills');
    const techCards = document.querySelectorAll('.tech-card');
    const skillTags = document.querySelectorAll('.skill-tag');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                animateSkillBars();

                // Animate tech cards with stagger
                techCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });

                // Animate skill tags
                animateSkillTags();

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Add CSS for ripple animation
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .skill-tag {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .tech-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// Projects Filter Functionality
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px) scale(0.9)';

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                } else {
                    // Hide card with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-30px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Projects Animations
function initProjectsAnimations() {
    // Animate project cards on scroll
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectCards = entry.target.querySelectorAll('.project-card');

                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });

                projectsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Add magnetic effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });

        // Add click animation
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('a')) return;

            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: projectRipple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;

            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animate tech tags in projects
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', () => {
            // Create floating effect
            tag.style.transform = 'translateY(-3px) scale(1.1)';
            tag.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
    });

    // Animate project stats on hover
    const projectStats = document.querySelectorAll('.project-stats');
    projectStats.forEach(stats => {
        const statItems = stats.querySelectorAll('.stat');

        stats.addEventListener('mouseenter', () => {
            statItems.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.1)';
                    stat.style.color = '#667eea';
                }, index * 100);
            });
        });

        stats.addEventListener('mouseleave', () => {
            statItems.forEach(stat => {
                stat.style.transform = 'scale(1)';
                stat.style.color = '#666';
            });
        });
    });
}

// Add project-specific CSS animations
function addProjectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes projectRipple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .project-card {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tech-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-stats .stat {
            transition: all 0.3s ease;
        }
        
        .filter-btn {
            position: relative;
            z-index: 1;
        }
        
        .project-links .btn-project {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .icon-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .status-badge {
            animation: badgePulse 2s ease-in-out infinite;
        }
        
        @keyframes badgePulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .tech-stack-preview .tech-icon {
            transition: all 0.3s ease;
        }
        
        .project-card:hover .tech-stack-preview .tech-icon {
            transform: translateY(-5px) scale(1.1);
        }
        
        .projects-cta {
            animation: ctaFloat 6s ease-in-out infinite;
        }
        
        @keyframes ctaFloat {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced typing effect when page loads
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = [
            'Full Stack Developer',
            'Frontend Specialist',
            'Backend Engineer',
            'UI/UX Designer',
            'Problem Solver'
        ];
        new TypeWriter(typingElement, words, 2000);
    }

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
        }, 50);
    });

    // Initialize skills section
    addRippleStyles();
    initTechCards();
    initSkillsObserver();

    // Initialize projects section
    addProjectStyles();
    initProjectsFilter();
    initProjectsAnimations();

    // Initialize navigation system
    initNavigation();

    // Initialize about section
    initAboutSection();
});