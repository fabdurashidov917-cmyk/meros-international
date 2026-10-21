/**
 * Meros International - Floating "H" Round Particles
 * Chap tomondan o'ngga "h" belgili kichik yumaloq belgilar harakati
 */

(function () {
  const canvas = document.getElementById('hParticlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];

  // Configuration
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 18 : 34;

  const colorThemes = [
    { bg: 'rgba(14, 165, 233, 0.12)', border: 'rgba(2, 132, 199, 0.45)', text: 'rgba(2, 132, 199, 0.85)' }, // Sky Blue
    { bg: 'rgba(13, 148, 136, 0.12)', border: 'rgba(13, 148, 136, 0.45)', text: 'rgba(15, 118, 110, 0.85)' }, // Teal
    { bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.50)', text: 'rgba(3, 105, 161, 0.90)' }, // Bright cyan
    { bg: 'rgba(37, 99, 235, 0.10)', border: 'rgba(37, 99, 235, 0.40)', text: 'rgba(29, 78, 216, 0.85)' }   // Royal blue
  ];

  class HParticle {
    constructor(initialRandomX = true) {
      this.reset(initialRandomX);
    }

    reset(initialRandomX = false) {
      // Radius: small round badges between 10px and 20px
      this.radius = 11 + Math.random() * 11;
      
      // Horizontal motion: always from LEFT to RIGHT
      // If initial spawn, scatter across the screen; otherwise start just off the left edge
      this.x = initialRandomX ? Math.random() * (width + 100) - 50 : -this.radius * 2 - Math.random() * 80;
      this.y = Math.random() * height;

      // Speed moving left to right
      this.speedX = 0.45 + Math.random() * 1.15;
      
      // Gentle sine-wave vertical float
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.015 + Math.random() * 0.025;
      this.waveAmplitude = 0.3 + Math.random() * 0.7;

      // Visual styling
      this.theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
      this.rotation = (Math.random() - 0.5) * 0.2; // slight natural angle
      this.symbol = Math.random() > 0.3 ? 'H' : 'h'; // Upper or lower 'h'
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Move strictly from LEFT to RIGHT
      this.x += this.speedX;

      // Vertical undulating wave
      this.angle += this.angleSpeed;
      this.y += Math.sin(this.angle) * this.waveAmplitude;

      // Smooth wrap-around when exiting the right boundary
      if (this.x > width + this.radius * 2) {
        this.reset(false);
      }

      // Vertical bounce safety
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Subtle pulse on scale
      this.pulsePhase += 0.02;
      const scale = 1 + Math.sin(this.pulsePhase) * 0.04;
      ctx.scale(scale, scale);

      // Outer circle (Badge background)
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.theme.bg;
      ctx.fill();

      // Circle border
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = this.theme.border;
      ctx.stroke();

      // Inner subtle glow dot or ring
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // "H" symbol in the center
      const fontSize = Math.round(this.radius * 1.15);
      ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", system-ui, sans-serif`;
      ctx.fillStyle = this.theme.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.symbol, 0, 1);

      ctx.restore();
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new HParticle(true));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  // Handle visibility change (pause when tab hidden to conserve battery)
  let animationId;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // Start particles
  init();
  animate();
})();
