// ===== SIMPLE VARIABLES & FUNCTIONS =====
let currentSkillCategory = 'programming';
let isLoading = true;

// ===== LOADING SCREEN WITH TYPING EFFECT =====
function typeText() {
    const messages = [
        "Hello World! 👋",
        "Loading Portfolio...",
        "Welcome to my Digital Space ✨",
        "Ready to Explore? 🚀"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing-text');
    
    function typeCharacter() {
        if (charIndex < messages[messageIndex].length) {
            typingElement.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 100); // Type each character with 100ms delay
        } else {
            // Pause before next message
            setTimeout(() => {
                typingElement.textContent = '';
                charIndex = 0;
                messageIndex = (messageIndex + 1) % messages.length;
                
                // After showing all messages, hide loading screen
                if (messageIndex === 0) {
                    setTimeout(hideLoadingScreen, 1000);
                } else {
                    setTimeout(typeCharacter, 500);
                }
            }, 1500);
        }
    }
    
    typeCharacter();
}

// ===== HIDE LOADING SCREEN =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainPortfolio = document.getElementById('main-portfolio');
    
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainPortfolio.style.display = 'block';
        isLoading = false;
        
        // Start other animations
        animateProfessionText();
        animateSkillBars();
        startScrollAnimations();
    }, 500);
}

// ===== PROFESSION TEXT ANIMATION =====
function animateProfessionText() {
    const professions = [
        "EEE Graduate 🎓",
        "Aspiring Developer 💻", 
        "Python Learner 🐍",
        "Quick Learner 🚀"
    ];
    
    let index = 0;
    const professionElement = document.getElementById('profession-text');
    
    function changeProfession() {
        professionElement.style.opacity = '0';
        setTimeout(() => {
            professionElement.textContent = professions[index];
            professionElement.style.opacity = '1';
            index = (index + 1) % professions.length;
        }, 500);
    }
    
    changeProfession(); // Show first profession immediately
    setInterval(changeProfession, 3000); // Change every 3 seconds
}

// ===== NAVIGATION FUNCTIONALITY =====
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Add active class to current section
    window.addEventListener('scroll', highlightActiveSection);
}

// ===== HIGHLIGHT ACTIVE SECTION IN NAVIGATION =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SKILLS SECTION FUNCTIONALITY =====
function setupSkillsSection() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillSets = document.querySelectorAll('.skill-set');
    
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            skillCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');
            
            // Hide all skill sets
            skillSets.forEach(set => set.classList.remove('active'));
            // Show selected skill set
            const targetCategory = category.getAttribute('data-category');
            document.getElementById(targetCategory).classList.add('active');
            
            // Animate skill bars
            setTimeout(animateSkillBars, 300);
        });
    });
}

// ===== ANIMATE SKILL BARS =====
function animateSkillBars() {
    const activeSkillSet = document.querySelector('.skill-set.active');
    if (!activeSkillSet) return;
    
    const progressBars = activeSkillSet.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// ===== SCROLL ANIMATIONS =====
function startScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields! 📝', 'error');
            return;
        }
        
        // Show success message
        showNotification('Message sent successfully! 🚀', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 25px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : 'background: linear-gradient(135deg, #f44336, #da190b);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function downloadResume() {
    // Show notification since we don't have actual resume file
    showNotification('Resume download would start here! 📄', 'success');
    
    // In real implementation, you would trigger actual download:
    // const link = document.createElement('a');
    // link.href = 'path-to-resume.pdf';
    // link.download = 'Sai_Bhavana_Pitta_Resume.pdf';
    // link.click();
}

// ===== PROJECT CARD INTERACTIONS =====
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    viewProjectBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const projectTitles = [
                'Solar Power Forecasting with ARIMA-LSTM',
                'Plan Your Trip - Travel Website'
            ];
            
            showNotification(`Viewing ${projectTitles[index]}! 🚀`, 'success');
            
            // In real implementation, you would:
            // window.open('project-link', '_blank');
        });
    });
}

// ===== LOGO ANIMATION =====
function setupLogoAnimation() {
    const logo = document.getElementById('logo-text');
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#ffd700'];
    let colorIndex = 0;
    
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        logo.style.background = `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 1) % colors.length]})`;
        logo.style.webkitBackgroundClip = 'text';
        logo.style.webkitTextFillColor = 'transparent';
    }, 2000);
}

// ===== FLOATING CIRCLES ANIMATION =====
function animateFloatingCircles() {
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10; // -10 to 10
            const randomY = Math.random() * 20 - 10; // -10 to 10
            
            circle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500); // Stagger the animations
    });
}

// ===== ACHIEVEMENT CARDS INTERACTION =====
function setupAchievementCards() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateY(10deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0) scale(1)';
        });
    });
}

// ===== SMOOTH SCROLLING FOR ALL LINKS =====
function setupSmoothScrolling() {
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
}

// ===== PARTICLE SYSTEM (SIMPLE) =====
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: particleFloat 8s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// ===== ADD PARTICLE ANIMATION CSS =====
function addParticleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZE EVERYTHING =====
function initializePortfolio() {
    // Start loading sequence
    typeText();
    
    // Setup all interactive elements
    setupNavigation();
    setupSkillsSection();
    setupContactForm();
    setupProjectCards();
    setupLogoAnimation();
    setupAchievementCards();
    setupSmoothScrolling();
    
    // Start background animations
    animateFloatingCircles();
    addParticleAnimation();
    createParticles();
    
    // Add scroll event for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== START WHEN PAGE LOADS =====
document.addEventListener('DOMContentLoaded', initializePortfolio);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        scrollToTop();
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        scrollToSection('contact');
    }
    
    // Press 'P' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        scrollToSection('projects');
    }
});

// ===== CONSOLE MESSAGE =====
console.log(`
🎉 Welcome to Sai Bhavana Pitta's Portfolio!
🚀 Built with HTML, CSS, and JavaScript
📧 Contact: bhavanareddypitta@gmail.com
💡 Created with dedication and hard work

Keyboard Shortcuts:
- Press 'H' to go Home
- Press 'P' to go to Projects  
- Press 'C' to go to Contact
`); 