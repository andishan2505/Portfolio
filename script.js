// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const timelineItems = document.querySelectorAll('.timeline-item');
const expertiseItems = document.querySelectorAll('.expertise-item');
const projectItems = document.querySelectorAll('.project-item');
const connectLinks = document.querySelectorAll('.connect-link');

// Smooth Scroll for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 100;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation State
function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#2d5a7b';
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered delay for grid items
            if (entry.target.classList.contains('expertise-item') || 
                entry.target.classList.contains('project-item')) {
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 100}ms`;
            }
            
            if (entry.target.classList.contains('timeline-item')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 150}ms`;
            }
        }
    });
}, observerOptions);

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Observe expertise items
    expertiseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 100}ms`;
        observer.observe(item);
    });
    
    // Observe project items
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 150}ms`;
        observer.observe(item);
    });
    
    // Observe timeline items
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 200}ms`;
        observer.observe(item);
    });
    
    // Observe connect links
    connectLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        link.style.transitionDelay = `${index * 100}ms`;
        observer.observe(link);
    });
});

// Add visible class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .expertise-item.visible,
    .project-item.visible,
    .timeline-item.visible,
    .connect-link.visible {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (scrolled < heroBottom) {
                profileImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }
    });
}

// Add hover effect to project items
projectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add hover effect to connect links
connectLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Header background change on scroll
const header = document.querySelector('.site-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Debounce function for performance
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations are handled in individual listeners
}, 10));

// Add subtle animation to section headers
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    headerObserver.observe(header);
});

console.log('Portfolio initialized successfully');