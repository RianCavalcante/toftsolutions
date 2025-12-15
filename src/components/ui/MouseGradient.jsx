import { useEffect, useRef } from 'react';

export const MouseGradient = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    // Partículas sutis de atmosfera
    const particles = [];
    const particleCount = 30; // Menos partículas

    class Particle {
      constructor() {
        this.reset();
        // Cores muito sutis - quase imperceptível
        this.color = { r: 200, g: 210, b: 220 }; // Branco acinzentado
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.3; // Muito menores
        this.speedX = (Math.random() - 0.5) * 0.2; // Movimento mais lento
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.08 + 0.02; // Bem transparente
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reaparece do outro lado
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Atração suave ao mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) {
          const force = (250 - distance) / 250;
          this.x += (dx / distance) * force * 0.8;
          this.y += (dy / distance) * force * 0.8;
        }

        // Pulso suave
        this.currentOpacity = this.opacity * (1 + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3);
      }

      draw() {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity * 1.5})`;
        ctx.fill();
      }
    }

    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    let startTime = Date.now();

    const draw = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      // Smooth mouse following
      mouseX = lerp(mouseX, targetX, 0.08);
      mouseY = lerp(mouseY, targetY, 0.08);

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient aura at mouse position (quase invisível)
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 500
      );
      
      gradient.addColorStop(0, 'rgba(220, 230, 240, 0.015)'); // Extremamente sutil
      gradient.addColorStop(0.5, 'rgba(200, 210, 220, 0.005)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(currentTime);
        particle.draw();
      });

      // Draw connections between nearby particles (quase invisível)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (150 - distance) / 150 * 0.04; // Extremamente sutil
            ctx.strokeStyle = `rgba(200, 210, 220, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial clear
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
