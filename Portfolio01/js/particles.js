// Interactive Particle System with Plexus Effect
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.maxParticles = 80;
        this.connectionDistance = 120;
        this.mouseInfluence = 100;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                originalVx: (Math.random() - 0.5) * 0.5,
                originalVy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(0, 123, 255, ',
            'rgba(72, 219, 251, ',
            'rgba(0, 191, 255, ',
            'rgba(0, 255, 255, ',
            'rgba(100, 200, 255, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
            
            heroSection.addEventListener('mouseleave', () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        }
    }

    resize() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            this.canvas.width = heroSection.offsetWidth;
            this.canvas.height = heroSection.offsetHeight;
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouseInfluence) {
                const force = (this.mouseInfluence - distance) / this.mouseInfluence;
                const angle = Math.atan2(dy, dx);
                particle.vx -= Math.cos(angle) * force * 0.02;
                particle.vy -= Math.sin(angle) * force * 0.02;
            } else {
                // Return to original velocity
                particle.vx += (particle.originalVx - particle.vx) * 0.02;
                particle.vy += (particle.originalVy - particle.vy) * 0.02;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.originalVx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.originalVy *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color + '0.8)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (this.connectionDistance - distance) / this.connectionDistance;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 123, 255, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    drawMouseConnections() {
        if (this.mouse.x > 0 && this.mouse.y > 0) {
            this.particles.forEach(particle => {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouseInfluence) {
                    const opacity = (this.mouseInfluence - distance) / this.mouseInfluence;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(72, 219, 251, ${opacity * 0.6})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            });
            
            // Draw mouse cursor effect
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(72, 219, 251, 0.8)';
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 15, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(72, 219, 251, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        this.drawMouseConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Floating Dust Motes Effect
class DustMotes {
    constructor() {
        this.motes = [];
        this.maxMotes = 50;
        this.init();
    }

    init() {
        this.createMotes();
        this.animate();
    }

    createMotes() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        for (let i = 0; i < this.maxMotes; i++) {
            const mote = document.createElement('div');
            mote.className = 'dust-mote';
            mote.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: dustFloat ${Math.random() * 20 + 15}s linear infinite;
                opacity: ${Math.random() * 0.6 + 0.2};
            `;
            
            heroSection.appendChild(mote);
            this.motes.push(mote);
        }
    }

    animate() {
        // Add CSS animation for dust motes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dustFloat {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the hero section to be fully rendered
    setTimeout(() => {
        const particleSystem = new ParticleSystem();
        const dustMotes = new DustMotes();
        
        // Store references for potential cleanup
        window.particleSystem = particleSystem;
        window.dustMotes = dustMotes;
    }, 500);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.particleSystem) {
        window.particleSystem.destroy();
    }
});