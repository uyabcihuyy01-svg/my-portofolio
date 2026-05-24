/* ==========================================
   My Portfolio - All JavaScript Functions
   ========================================== */

// Canvas & Particles
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

// Music
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

let isMusicPlaying = false;
let audioInitialized = false;

// Volume
music.volume = 0.3;

// Resize Canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create Particles
const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

// Animation Loop
function animate() {
  ctx.fillStyle = 'rgba(12, 12, 26, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();

document.addEventListener('DOMContentLoaded', () => {

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(12, 12, 26, 0.95)';
    } else {
      nav.style.background = 'rgba(12, 12, 26, 0.9)';
    }
  });
  
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectCards.length > 0) {
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
      
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
  
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    const animateStats = () => {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = parseInt(stat.dataset.target || stat.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            stat.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current).toLocaleString();
          }
        }, 16);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(statsContainer);
  }
  
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    let autoSlide;
    
    function updateSlider() {
      cards.forEach((card, index) => {
        card.classList.remove('active', 'prev-slide');
        
        if (index === currentIndex) {
          card.classList.add('active');
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
          card.classList.add('prev-slide');
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateX(100px)';
        }
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSlider();
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }
    
    function startAutoSlide() {
      autoSlide = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        stopAutoSlide();
        startAutoSlide();
      });
    });
    
    // Initial
    updateSlider();
    startAutoSlide();
    
    // Animate cards on load
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 * index);
    });
  }
  
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    });
  }

});

console.log('Portfolio JavaScript Loaded!');