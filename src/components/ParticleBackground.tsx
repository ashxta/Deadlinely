import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const PARTICLE_COUNT = Math.floor(Math.min(160, (w * h) / 10000));

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    class ParticleClass {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      phase: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = rand(0.6, 2.2);
        this.vx = rand(-0.15, 0.15);
        this.vy = rand(-0.15, 0.15);
        this.alpha = rand(0.05, 0.9);
        this.phase = Math.random() * Math.PI * 2;
      }

      step(t: number) {
        this.x += this.vx + Math.cos(t / 1000 + this.phase) * 0.08;
        this.y += this.vy + Math.sin(t / 1200 + this.phase) * 0.08;
        if (this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
        g.addColorStop(0, `rgba(0,240,255,${this.alpha})`);
        g.addColorStop(0.5, `rgba(156,107,255,${this.alpha * 0.4})`);
        g.addColorStop(1, `rgba(2,4,12,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push(new ParticleClass());
      }
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      
      // Subtle background gradient
      const vg = ctx.createLinearGradient(0, 0, 0, h);
      vg.addColorStop(0, 'rgba(2,2,8,0.12)');
      vg.addColorStop(1, 'rgba(2,2,8,0.35)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // Draw particles
      for (const p of particlesRef.current) {
        p.step(t);
        p.draw();

        // Mouse interaction
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, 0.9 - d / 140);
          ctx.strokeStyle = 'rgba(0,240,255,0.08)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationRef.current = requestAnimationFrame(frame);
    };

    // Initialize
    initParticles();
    animationRef.current = requestAnimationFrame(frame);

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 z-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

export default ParticleBackground;