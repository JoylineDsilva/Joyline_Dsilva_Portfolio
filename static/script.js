// Advanced Portfolio JavaScript with animations and interactions

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoading();
        this.setupTheme();
        this.setupNavigation();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupProjectModals();
        this.setupSkillBars();
        this.setupScrollEffects();
    }

    setupLoading() {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading');
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 2000);
        });
    }

    setupTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const currentTheme = localStorage.getItem('theme') || 'light';

        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(themeIcon, currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(themeIcon, newTheme);
        });
    }

    updateThemeIcon(icon, theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Hamburger menu for mobile
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
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
        document.querySelectorAll('.project-card, .about-card, .skill-item, .contact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    setupTypingEffect() {
        const typedTextSpan = document.querySelector('.typed-text');
        const cursorSpan = document.querySelector('.cursor');
        const textArray = ['intelligent AI solutions', 'machine learning models', 'computer vision systems', 'real-time applications'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        // Start typing effect
        if (textArray.length) setTimeout(type, newTextDelay + 250);
    }

    setupProjectModals() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('projectModal');
        const modalClose = document.querySelector('.modal-close');
        const modalBody = document.querySelector('.modal-body');

        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-github')) {
                    const projectId = card.getAttribute('data-project-id');
                    this.loadProjectModal(projectId);
                }
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            }
        });
    }

    async loadProjectModal(projectId) {
        try {
            const response = await fetch(`/api/project/${projectId}`);
            const project = await response.json();
            
            const modal = document.getElementById('projectModal');
            const modalBody = document.querySelector('.modal-body');
            
            modalBody.innerHTML = `
                <div class="modal-project">
                    <div class="modal-header">
                        <h2>${project.title}</h2>
                        <div class="modal-links">
                            <a href="${project.github_url}" target="_blank" class="btn-github">
                                <i class="fab fa-github"></i>
                                View Code
                            </a>
                            ${project.live_url && project.live_url !== '#' ? 
                                `<a href="${project.live_url}" target="_blank" class="btn-live">
                                    <i class="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>` : ''}
                        </div>
                    </div>
                    <div class="modal-image">
                        <img src="/static/images/projects/${project.image}" alt="${project.title}">
                    </div>
                    <div class="modal-content">
                        <p>${project.description}</p>
                        <div class="modal-tech">
                            <h4>Technologies Used</h4>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
        } catch (error) {
            console.error('Error loading project:', error);
        }
    }

    setupSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const skillLevel = skillItem.getAttribute('data-skill');
                    const skillProgress = skillItem.querySelector('.skill-progress');
                    
                    setTimeout(() => {
                        skillProgress.style.width = skillLevel + '%';
                    }, 200);
                    
                    skillObserver.unobserve(skillItem);
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(item => {
            skillObserver.observe(item);
        });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-background');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add CSS for typing animation
const style = document.createElement('style');
style.textContent = `
    .cursor.typing {
        animation: none;
    }
`;
document.head.appendChild(style);