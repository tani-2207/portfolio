// ========== API Configuration ==========
const API_BASE_URL = 'http://localhost:5001';

// ========== Matrix Rain Background ==========
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(15, 15, 30, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#667eea';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========== Power Particles ==========
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.6)`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
    particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
    particlesContainer.appendChild(particle);
}

// ========== Mobile Navigation ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========== Typing Effect ==========
const typedTextElement = document.getElementById('typed-text');
const texts = [
    'BCA Student',
    'Web Developer',
    'Creative Designer',
    'Code Enthusiast',
    'Tech Explorer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 1000);

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Back to Top Button ==========
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Skill Power Meters Animation ==========
const powerMeters = document.querySelectorAll('.meter-fill');

const animateMeters = () => {
    powerMeters.forEach(meter => {
        const power = meter.getAttribute('data-power');
        const rect = meter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !meter.classList.contains('animated')) {
            setTimeout(() => {
                meter.style.width = power + '%';
                meter.classList.add('animated');
            }, 200);
        }
    });
};

window.addEventListener('scroll', animateMeters);
window.addEventListener('load', animateMeters);

// ========== Visitor Counter ==========
async function updateVisitorCount() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        const data = await response.json();
        
        if (data.success) {
            const visitorCountElement = document.getElementById('visitor-count');
            animateCounter(visitorCountElement, 0, data.visitors, 2000);
        }
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        const visitorCountElement = document.getElementById('visitor-count');
        const fallbackCount = Math.floor(Math.random() * 1000) + 100;
        animateCounter(visitorCountElement, 0, fallbackCount, 2000);
    }
}

function animateCounter(element, start, end, duration) {
    const startTime = Date.now();
    const range = end - start;
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (range * progress));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
        }
    }
    
    updateCounter();
}

window.addEventListener('load', updateVisitorCount);

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    if (!formData.name || !formData.email || !formData.message) {
        showFormStatus('Please fill in all fields!', 'error');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('span').textContent;
    submitButton.disabled = true;
    submitButton.querySelector('span').textContent = 'SENDING...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFormStatus('⚡ MESSAGE SENT SUCCESSFULLY! ⚡', 'success');
            contactForm.reset();
            
            // Power-up animation
            submitButton.style.transform = 'scale(1.1)';
            setTimeout(() => {
                submitButton.style.transform = '';
            }, 300);
        } else {
            showFormStatus(data.error || 'Failed to send message!', 'error');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showFormStatus('Network error. Please try again!', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.querySelector('span').textContent = originalText;
    }
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// ========== Scroll Reveal Animations ==========
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

document.querySelectorAll('.power-card, .skill-card, .info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.8s, transform 0.8s';
    observer.observe(card);
});

// ========== Power Burst Effect on Hover ==========
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'power-up 0.3s';
        setTimeout(() => {
            card.style.animation = '';
        }, 300);
    });
});

// ========== Parallax Effect ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const powerCircle = document.querySelector('.power-circle');
    if (powerCircle) {
        powerCircle.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// ========== Random Lightning Effect ==========
function createLightningFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'rgba(255, 215, 0, 0.1)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
    }, 100);
}

setInterval(() => {
    if (Math.random() > 0.95) {
        createLightningFlash();
    }
}, 5000);

// ========== Console Easter Egg ==========
console.log('%c⚡ SUPER POWER ACTIVATED ⚡', 'color: #ffd700; font-size: 30px; font-weight: bold; text-shadow: 0 0 10px #ffd700;');
console.log('%cWelcome to Tanishka\'s Coding Super Power Portfolio!', 'color: #667eea; font-size: 18px; font-weight: bold;');
console.log('%cPowered by HTML, CSS, JavaScript & Python Flask', 'color: #764ba2; font-size: 14px;');
console.log('%c💻 Built with passion and super powers! 🚀', 'color: #ffd700; font-size: 16px;');

// ========== Power Symbols Animation ==========
const symbols = document.querySelectorAll('.symbol');
symbols.forEach((symbol, index) => {
    symbol.style.animationDelay = `${index * 0.5}s`;
});

// ========== Check Backend Health ==========
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        console.log('⚡ Backend Status:', data.status);
    } catch (error) {
        console.warn('❌ Backend not reachable. Running in offline mode.');
    }
}

checkBackendHealth();

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger initial animations
    animateMeters();
});

// ========== Dynamic Power Effects ==========
setInterval(() => {
    const energyRings = document.querySelectorAll('.energy-ring');
    energyRings.forEach((ring, index) => {
        if (Math.random() > 0.7) {
            ring.style.opacity = Math.random() * 0.5 + 0.2;
            setTimeout(() => {
                ring.style.opacity = index === 0 ? '0.3' : index === 1 ? '0.2' : '0.1';
            }, 200);
        }
    });
}, 3000);
