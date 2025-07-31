// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const header = document.getElementById("header");
const logoLink = document.getElementById("logo-link");
const logoDropdown = document.getElementById("logo-dropdown");

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Logo Dropdown Functionality
if (logoDropdown) {
  // Handle dropdown item clicks
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const action = e.currentTarget.getAttribute("data-action");
      handleLogoAction(action);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-logo")) {
      logoDropdown.style.opacity = "0";
      logoDropdown.style.visibility = "hidden";
      logoDropdown.style.transform = "translateY(-10px)";
    }
  });
}

// Handle logo dropdown actions
function handleLogoAction(action) {
  switch (action) {
    case "home":
      smoothScrollTo("#home");
      break;
    case "portfolio":
      smoothScrollTo("#projects");
      break;
    case "download":
      downloadCV();
      break;
    case "contact":
      smoothScrollTo("#contact");
      break;
  }
}

// Enhanced smooth scroll function
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    const headerHeight = header.offsetHeight;
    const targetPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Add visual feedback
    showNotification(
      `Navigating to ${target.replace("#", "").toUpperCase()} section`
    );
  }
}

// Download CV function
function downloadCV() {
  const link = document.createElement("a");
  link.href = "assets/Bijoy_Biswas_Resume.pdf";
  link.download = "Bijoy_Biswas_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showNotification("CV download started!");
}

// Enhanced menu item interactions
document.querySelectorAll(".nav-link").forEach((link) => {
  // Add click sound effect (optional)
  link.addEventListener("click", (e) => {
    // Add ripple effect
    createRippleEffect(e.currentTarget, e);

    // Show navigation feedback
    const sectionName = e.currentTarget.textContent;
    showNotification(`Navigating to ${sectionName}`);
  });

  // Add hover sound effect (optional)
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-2px)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateY(0)";
  });
});

// Create ripple effect for menu items
function createRippleEffect(element, event) {
  const ripple = document.createElement("span");
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
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Show notification function
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "nav-notification";
  notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: var(--shadow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

// Theme Toggle Functionality
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

if (currentTheme === "dark") {
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");
  const newTheme = theme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeToggle.innerHTML =
    newTheme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  // Header background
  if (scrolled > 100) {
    header.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(26, 26, 26, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
  } else {
    header.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(26, 26, 26, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  }

  // Back to top button
  if (scrolled > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  // Active navigation link
  updateActiveNavLink();
});

// Back to Top Functionality
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Update Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  const scrollPosition = window.scrollY + header.offsetHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Contact Form Validation and Submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  // Clear previous errors
  clearErrors();

  let isValid = true;

  // Validate name
  if (name.length < 2) {
    showError("name-error", "Name must be at least 2 characters long");
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("email-error", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (message.length < 10) {
    showError("message-error", "Message must be at least 10 characters long");
    isValid = false;
  }

  if (isValid) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    try {
      await simulateFormSubmission({ name, email, message });

      // Show success message
      showSuccessMessage(
        "Message sent successfully! I'll get back to you soon."
      );
      contactForm.reset();
    } catch (error) {
      showError("message-error", "Failed to send message. Please try again.");
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
});

// Helper Functions
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
    element.style.display = "none";
  });
}

function showSuccessMessage(message) {
  // Create success message element
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
  successDiv.textContent = message;

  document.body.appendChild(successDiv);

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 300);
  }, 5000);
}

async function simulateFormSubmission(data) {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve(data);
      } else {
        reject(new Error("Network error"));
      }
    }, 2000);
  });
}

// Enhanced Typing Animation for Hero Section
const roles = [
  "Web Developer",
  "BCA Student",
  "AI Enthusiast",
  "Problem Solver",
  "Tech Explorer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before next word
  }

  setTimeout(typeRole, typeSpeed);
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Initialize hero animations when page loads
window.addEventListener("load", () => {
  // Start typing animation
  setTimeout(typeRole, 1000);

  // Animate counters
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    setTimeout(() => {
      animateCounter(counter, target);
    }, 1500);
  });

  // Add entrance animations
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";

    setTimeout(() => {
      heroContent.style.transition = "all 1s ease-out";
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 500);
  }
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".project-card, .skill-item, .timeline-item, .certificate-card"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Skills Animation Observer
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-fill");
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          bar.style.setProperty("--skill-width", width + "%");
          bar.style.width = width + "%";
          bar.classList.add("animate");
        });

        // Animate technology stack level bars
        const levelBars = entry.target.querySelectorAll(".level-fill");
        levelBars.forEach((bar) => {
          const level = bar.getAttribute("data-level");
          setTimeout(() => {
            bar.style.width = level + "%";
          }, 500);
        });
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  }
);

// Observe skills section
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Skill Items Hover Effect
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    skill.style.transform = "translateY(-10px) scale(1.05)";
  });

  skill.addEventListener("mouseleave", () => {
    skill.style.transform = "translateY(0) scale(1)";
  });
});

// Project Cards Tilt Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Certifications Section Functionality
function initializeCertifications() {
  const filterButtons = document.querySelectorAll('.cert-filter');
  const certCards = document.querySelectorAll('.cert-card');
  const videos = document.querySelectorAll('.cert-video');

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.classList.add('visible');
          card.style.display = 'block';
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
          setTimeout(() => {
            if (card.classList.contains('hidden')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });

      // Show notification
      const categoryName = filterValue === 'all' ? 'All Certifications' : 
                          filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
      showNotification(`Showing ${categoryName}`);
    });
  });

  // Video interactions
  videos.forEach(video => {
    const card = video.closest('.cert-card');
    const overlay = card.querySelector('.cert-overlay');
    const badge = card.querySelector('.cert-badge');

    // Play video on badge click
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        // Pause all other videos
        videos.forEach(v => {
          if (v !== video) {
            v.pause();
            v.closest('.cert-card').querySelector('.cert-overlay').style.opacity = '0';
          }
        });
        
        video.play();
        overlay.style.opacity = '0';
        showNotification('Playing certification video');
      } else {
        video.pause();
        overlay.style.opacity = '1';
      }
    });

    // Video event listeners
    video.addEventListener('play', () => {
      overlay.style.opacity = '0';
      card.classList.add('playing');
    });

    video.addEventListener('pause', () => {
      overlay.style.opacity = '1';
      card.classList.remove('playing');
    });

    video.addEventListener('ended', () => {
      overlay.style.opacity = '1';
      card.classList.remove('playing');
      showNotification('Video completed');
    });

    // Hover effects
    card.addEventListener('mouseenter', () => {
      if (video.paused) {
        overlay.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (video.paused) {
        overlay.style.opacity = '0';
      }
    });
  });

  // Certificate link interactions
  document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const title = link.getAttribute('title');
      showNotification(`${title} - Feature coming soon!`);
    });
  });

  // Animate stats when section comes into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-content h3');
        statNumbers.forEach(stat => {
          const finalValue = stat.textContent;
          const numericValue = parseInt(finalValue.replace(/\D/g, ''));
          const suffix = finalValue.replace(/\d/g, '');
          
          animateStatCounter(stat, numericValue, suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const certStats = document.querySelector('.cert-stats');
  if (certStats) {
    statsObserver.observe(certStats);
  }
}

// Animate certification stats
function animateStatCounter(element, target, suffix = '') {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 30);
}

// Enhanced video controls
function enhanceVideoControls() {
  const videos = document.querySelectorAll('.cert-video');
  
  videos.forEach(video => {
    // Add custom controls
    video.addEventListener('loadedmetadata', () => {
      // Video is ready
      const card = video.closest('.cert-card');
      card.classList.add('video-loaded');
    });

    // Add keyboard controls
    video.addEventListener('keydown', (e) => {
      switch(e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime -= 10;
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime += 10;
          break;
        case 'm':
          e.preventDefault();
          video.muted = !video.muted;
          break;
        case 'f':
          e.preventDefault();
          if (video.requestFullscreen) {
            video.requestFullscreen();
          }
          break;
      }
    });

    // Add progress tracking
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      const card = video.closest('.cert-card');
      card.style.setProperty('--video-progress', `${progress}%`);
    });
  });
}



// Enhanced notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };

  notification.innerHTML = `
    <i class="${icons[type] || icons.info}"></i>
    <span>${message}</span>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : 'var(--primary-color)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: var(--shadow-hover);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Close button functionality
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  });

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Simple Video Background Controls
function initializeVideoBackground() {
  const heroVideo = document.querySelector('.hero-video');
  const videoToggle = document.getElementById('video-toggle');
  const videoMute = document.getElementById('video-mute');
  const videoFallback = document.querySelector('.video-fallback');
  
  if (!heroVideo) return;

  // Simple video play
  const playVideo = async () => {
    try {
      await heroVideo.play();
      if (videoFallback) {
        videoFallback.classList.remove('show');
      }
    } catch (error) {
      if (videoFallback) {
        videoFallback.classList.add('show');
      }
    }
  };

  // Fallback click handler
  if (videoFallback) {
    videoFallback.addEventListener('click', playVideo);
  }

  // Video controls
  if (videoToggle) {
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoToggle.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        heroVideo.pause();
        videoToggle.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }

  if (videoMute) {
    videoMute.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      videoMute.innerHTML = heroVideo.muted ? 
        '<i class="fas fa-volume-mute"></i>' : 
        '<i class="fas fa-volume-up"></i>';
    });
  }

  // Auto-play video
  playVideo();nt
  heroVideo.addEventListener('loadeddata', () => {
    console.log('Video loaded successfully');
    showNotification('Background video loaded', 'success');
    
    // Hide loading indicator
    if (videoContainer) {
      videoContainer.classList.remove('loading');
    }
  });

  // Video can play event
  heroVideo.addEventListener('canplay', () => {
    console.log('Video can play');
    heroVideo.style.opacity = '1';
    
    // Start playing immediately when ready
    if (heroVideo.paused) {
      playVideo();
    }
  });

  // Buffer management
  heroVideo.addEventListener('stalled', () => {
    console.log('Video stalled - attempting to recover');
    if (videoContainer) {
      videoContainer.classList.add('buffering');
    }
    
    // Try to recover from stalling
    setTimeout(() => {
      if (heroVideo.readyState < 3) {
        heroVideo.load();
        showNotification('Reloading video to fix buffering', 'info');
      }
    }, 3000);
  });

  heroVideo.addEventListener('suspend', () => {
    console.log('Video loading suspended');
  });

  heroVideo.addEventListener('abort', () => {
    console.log('Video loading aborted');
    showNotification('Video loading interrupted', 'warning');
  });

  // Video loading start
  heroVideo.addEventListener('loadstart', () => {
    console.log('Video loading started');
    console.log('Video source:', heroVideo.src);
  });

  // Auto-hide controls after inactivity
  let controlsTimeout;
  const videoControls = document.querySelector('.video-controls');
  
  function showControls() {
    if (videoControls) {
      videoControls.style.opacity = '1';
      videoControls.style.transform = 'translateY(0)';
    }
  }
  
  function hideControls() {
    if (videoControls) {
      videoControls.style.opacity = '0.7';
      videoControls.style.transform = 'translateY(10px)';
    }
  }

  // Show controls on mouse movement in hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', () => {
      showControls();
      clearTimeout(controlsTimeout);
      controlsTimeout = setTimeout(hideControls, 3000);
    });

    heroSection.addEventListener('mouseleave', () => {
      hideControls();
    });
  }

  // Keyboard controls for video
  document.addEventListener('keydown', (e) => {
    // Only work when hero section is in view
    const heroRect = heroSection.getBoundingClientRect();
    const isHeroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
    
    if (!isHeroVisible) return;

    switch(e.key.toLowerCase()) {
      case ' ':
      case 'k':
        e.preventDefault();
        videoToggle.click();
        break;
      case 'm':
        e.preventDefault();
        videoMute.click();
        break;
      case 'r':
        e.preventDefault();
        heroVideo.currentTime = 0;
        showNotification('Video restarted', 'info');
        break;
    }
  });

  // Video quality adjustment based on connection
  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      heroVideo.style.opacity = '0.1';
      showNotification('Low quality mode enabled for slow connection', 'warning');
    }
  }

  // Intersection Observer for video performance
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Video is visible, ensure it's playing if not paused by user
        if (!videoToggle.classList.contains('paused')) {
          heroVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }
      } else {
        // Video is not visible, pause to save resources
        heroVideo.pause();
      }
    });
  }, { threshold: 0.1 });

  videoObserver.observe(heroSection);
}

// Enhanced video background effects
function addVideoEffects() {
  const heroVideo = document.querySelector('.hero-video');
  const videoOverlay = document.querySelector('.video-overlay');
  
  if (!heroVideo || !videoOverlay) return;

  // Dynamic overlay opacity based on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const scrollPercent = Math.min(scrolled / heroHeight, 1);
    
    // Increase overlay opacity as user scrolls
    const baseOpacity = 0.7;
    const maxOpacity = 0.9;
    const newOpacity = baseOpacity + (scrollPercent * (maxOpacity - baseOpacity));
    
    videoOverlay.style.background = videoOverlay.style.background.replace(
      /rgba\(0,\s*0,\s*0,\s*[\d.]+\)/g, 
      `rgba(0, 0, 0, ${newOpacity})`
    );
  });

  // Video sync with typing animation
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const observer = new MutationObserver(() => {
      // Subtle video opacity change when text changes
      heroVideo.style.opacity = '0.25';
      setTimeout(() => {
        heroVideo.style.opacity = '0.3';
      }, 200);
    });
    
    observer.observe(typingText, { childList: true, characterData: true, subtree: true });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active nav link
  updateActiveNavLink();

  // Add loading class to body
  document.body.classList.add("loaded");

  // Initialize video background
  initializeVideoBackground();
  
  // Add video effects
  addVideoEffects();

  // Initialize certifications functionality
  initializeCertifications();
  
  // Enhance video controls
  enhanceVideoControls();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    const scrolled = window.scrollY;

    // Header background
    if (scrolled > 100) {
      header.style.background =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "rgba(26, 26, 26, 0.98)"
          : "rgba(255, 255, 255, 0.98)";
    } else {
      header.style.background =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "rgba(26, 26, 26, 0.95)"
          : "rgba(255, 255, 255, 0.95)";
    }

    // Back to top button
    if (scrolled > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    updateActiveNavLink();
  }, 16)
); // ~60fps

// Contact Form Enhanced Functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const messageTextarea = document.getElementById("message");
  const charCount = document.getElementById("char-count");
  const faqItems = document.querySelectorAll(".faq-item");
  const backToTop = document.getElementById("back-to-top");

  // Character counter for message textarea
  if (messageTextarea && charCount) {
    messageTextarea.addEventListener("input", () => {
      const currentLength = messageTextarea.value.length;
      charCount.textContent = currentLength;
      
      // Change color based on character count
      if (currentLength > 450) {
        charCount.style.color = "#ef4444";
      } else if (currentLength > 350) {
        charCount.style.color = "#f59e0b";
      } else {
        charCount.style.color = "var(--text-light)";
      }
      
      // Limit to 500 characters
      if (currentLength > 500) {
        messageTextarea.value = messageTextarea.value.substring(0, 500);
        charCount.textContent = "500";
        showNotification("Message limited to 500 characters", "warning");
      }
    });
  }

  // Enhanced Contact Form Validation and Submission
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const subject = formData.get("subject");
      const message = formData.get("message").trim();
      const newsletter = formData.get("newsletter");

      // Clear previous errors
      clearFormErrors();

      let isValid = true;

      // Enhanced validation
      if (name.length < 2) {
        showFormError("name-error", "Name must be at least 2 characters long");
        isValid = false;
      } else if (name.length > 50) {
        showFormError("name-error", "Name must be less than 50 characters");
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showFormError("name-error", "Name can only contain letters and spaces");
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormError("email-error", "Please enter a valid email address");
        isValid = false;
      } else if (email.length > 100) {
        showFormError("email-error", "Email address is too long");
        isValid = false;
      }

      // Message validation
      if (message.length < 10) {
        showFormError("message-error", "Message must be at least 10 characters long");
        isValid = false;
      } else if (message.length > 500) {
        showFormError("message-error", "Message must be less than 500 characters");
        isValid = false;
      }

      if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
          // Simulate form submission with enhanced data
          await simulateFormSubmission({
            name,
            email,
            subject: subject || "General Inquiry",
            message,
            newsletter: !!newsletter,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || "Direct"
          });

          // Show success message with animation
          showNotification("Message sent successfully! I'll get back to you within 24 hours.", "success");
          
          // Reset form with animation
          contactForm.reset();
          if (charCount) charCount.textContent = "0";
          
          // Add success animation to form
          contactForm.style.transform = "scale(0.98)";
          setTimeout(() => {
            contactForm.style.transform = "scale(1)";
          }, 200);

          // Track form submission (analytics placeholder)
          trackFormSubmission(subject || "General Inquiry");

        } catch (error) {
          console.error("Form submission error:", error);
          showFormError("message-error", "Failed to send message. Please try again or contact me directly via email.");
          showNotification("Failed to send message. Please try again.", "error");
        } finally {
          // Reset button
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 1000);
        }
      } else {
        // Show validation error notification
        showNotification("Please fix the errors in the form", "error");
        
        // Focus on first error field
        const firstError = contactForm.querySelector('.error-message[style*="block"]');
        if (firstError) {
          const fieldId = firstError.id.replace('-error', '');
          const field = document.getElementById(fieldId);
          if (field) {
            field.focus();
            field.style.borderColor = "#ef4444";
            setTimeout(() => {
              field.style.borderColor = "";
            }, 3000);
          }
        }
      }
    });

    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        // Clear error on input
        const errorId = field.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement && errorElement.style.display === 'block') {
          errorElement.style.display = 'none';
          field.style.borderColor = '';
        }
      });
    });
  }

  // FAQ Accordion Functionality
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherAnswer.style.maxHeight = '0';
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
      
      // Add ripple effect
      createRippleEffect(question, { clientX: question.offsetWidth / 2, clientY: question.offsetHeight / 2 });
    });
  });

  // Back to Top Button Functionality
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
      // Add click animation
      backToTop.style.transform = "scale(0.9)";
      setTimeout(() => {
        backToTop.style.transform = "";
      }, 150);
      
      showNotification("Scrolled to top", "info");
    });
  }

  // Enhanced scroll handling for back to top button
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Show/hide back to top button
    if (scrolled > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
    
    // Add scroll progress indicator to back to top button
    const scrollPercent = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    backToTop.style.background = `conic-gradient(var(--primary-color) ${scrollPercent * 3.6}deg, rgba(59, 130, 246, 0.3) 0deg)`;
    
    // Throttle scroll events
    scrollTimeout = setTimeout(() => {
      updateActiveNavLink();
    }, 10);
  });

  // Contact form auto-save (localStorage)
  const formInputs = contactForm?.querySelectorAll('input, textarea, select');
  formInputs?.forEach(input => {
    // Load saved data
    const savedValue = localStorage.getItem(`contact_form_${input.name}`);
    if (savedValue && input.type !== 'checkbox') {
      input.value = savedValue;
    } else if (savedValue && input.type === 'checkbox') {
      input.checked = savedValue === 'true';
    }
    
    // Save data on input
    input.addEventListener('input', () => {
      if (input.type === 'checkbox') {
        localStorage.setItem(`contact_form_${input.name}`, input.checked);
      } else {
        localStorage.setItem(`contact_form_${input.name}`, input.value);
      }
    });
  });

  // Clear saved form data on successful submission
  function clearSavedFormData() {
    formInputs?.forEach(input => {
      localStorage.removeItem(`contact_form_${input.name}`);
    });
  }

  // Update character count on page load
  if (messageTextarea && charCount) {
    const savedMessage = localStorage.getItem('contact_form_message');
    if (savedMessage) {
      charCount.textContent = savedMessage.length;
    }
  }
});

// Helper Functions for Contact Form
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  const errorId = field.id + '-error';
  
  let isValid = true;
  let errorMessage = '';
  
  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long';
        isValid = false;
      } else if (value.length > 50) {
        errorMessage = 'Name must be less than 50 characters';
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errorMessage = 'Name can only contain letters and spaces';
        isValid = false;
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      } else if (value.length > 100) {
        errorMessage = 'Email address is too long';
        isValid = false;
      }
      break;
      
    case 'message':
      if (value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
        isValid = false;
      } else if (value.length > 500) {
        errorMessage = 'Message must be less than 500 characters';
        isValid = false;
      }
      break;
  }
  
  if (!isValid) {
    showFormError(errorId, errorMessage);
    field.style.borderColor = '#ef4444';
  } else {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    field.style.borderColor = '#10b981';
    setTimeout(() => {
      field.style.borderColor = '';
    }, 2000);
  }
  
  return isValid;
}

function showFormError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    errorElement.style.animation = "fadeInUp 0.3s ease-out";
  }
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
    element.style.display = "none";
  });
  
  // Clear field border colors
  const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
  formFields.forEach(field => {
    field.style.borderColor = '';
  });
}

// Enhanced form submission simulation
async function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    const delay = Math.random() * 2000 + 1000; // 1-3 seconds
    
    setTimeout(() => {
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        console.log("Form submitted successfully:", data);
        
        // Clear saved form data on success
        Object.keys(data).forEach(key => {
          localStorage.removeItem(`contact_form_${key}`);
        });
        
        resolve(data);
      } else {
        reject(new Error("Network error or server unavailable"));
      }
    }, delay);
  });
}

// Analytics tracking placeholder
function trackFormSubmission(subject) {
  // This would integrate with your analytics service
  console.log("Form submission tracked:", {
    event: "contact_form_submit",
    subject: subject,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
  
  // Example: Google Analytics 4
  // gtag('event', 'contact_form_submit', {
  //   'subject': subject,
  //   'page_location': window.location.href
  // });
}

// Enhanced notification system with queue
let notificationQueue = [];
let isShowingNotification = false;

function showNotification(message, type = 'info') {
  notificationQueue.push({ message, type });
  
  if (!isShowingNotification) {
    processNotificationQueue();
  }
}

function processNotificationQueue() {
  if (notificationQueue.length === 0) {
    isShowingNotification = false;
    return;
  }
  
  isShowingNotification = true;
  const { message, type } = notificationQueue.shift();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };

  notification.innerHTML = `
    <i class="${icons[type] || icons.info}"></i>
    <span>${message}</span>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    hideNotification(notification);
  });

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      hideNotification(notification);
    }
  }, 4000);
}

function hideNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
    // Process next notification in queue
    setTimeout(processNotificationQueue, 300);
  }, 300);
}

// Contact section animations
function initContactAnimations() {
  const contactItems = document.querySelectorAll('.contact-item');
  const formGroups = document.querySelectorAll('.form-group');
  
  // Stagger animation for contact items
  contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Form field focus animations
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const label = group.querySelector('label');
    
    if (input && label) {
      input.addEventListener('focus', () => {
        label.style.color = 'var(--primary-color)';
        label.style.transform = 'translateY(-2px)';
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.style.color = '';
          label.style.transform = '';
        }
      });
    }
  });
}

// Initialize contact animations when page loads
document.addEventListener('DOMContentLoaded', initContactAnimations);

// Keyboard shortcuts for contact form
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const contactForm = document.getElementById('contact-form');
    if (contactForm && document.activeElement.closest('#contact-form')) {
      e.preventDefault();
      contactForm.dispatchEvent(new Event('submit'));
    }
  }
  
  // Escape to clear form
  if (e.key === 'Escape' && document.activeElement.closest('#contact-form')) {
    const contactForm = document.getElementById('contact-form');
    if (contactForm && confirm('Clear the form?')) {
      contactForm.reset();
      clearFormErrors();
      // Clear saved data
      const formInputs = contactForm.querySelectorAll('input, textarea, select');
      formInputs.forEach(input => {
        localStorage.removeItem(`contact_form_${input.name}`);
      });
      showNotification('Form cleared', 'info');
    }
  }
});