import './style.css'

// ==========================================
// 1. Lenis Smooth Scroll Initialization
// ==========================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical', 
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// ==========================================
// 2. Custom Magnetic Cursor & Mobile Menu
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const hoverTargets = document.querySelectorAll('.hover-target, a, button');

  // Only init cursor physics if we aren't on touch devices
  if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorOutline) {
    let xToDot = gsap.quickTo(cursorDot, "left", {duration: 0.1, ease: "power3"});
    let yToDot = gsap.quickTo(cursorDot, "top", {duration: 0.1, ease: "power3"});
    
    let xToOutline = gsap.quickTo(cursorOutline, "left", {duration: 0.3, ease: "power3"});
    let yToOutline = gsap.quickTo(cursorOutline, "top", {duration: 0.3, ease: "power3"});

    window.addEventListener('mousemove', (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToOutline(e.clientX);
      yToOutline(e.clientY);
    });

    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
      });
      target.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
      });
    });
  }
  
  // --- Glassmorphism Mobile Menu Sequence ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuOverlay = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  let isMenuOpen = false;

  if(mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        document.body.classList.add('menu-open');
        gsap.to(mobileMenuOverlay, {autoAlpha: 1, duration: 0.4, ease: "power3.out"});
        gsap.fromTo(menuLinks, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)", delay: 0.1 }
        );
      } else {
        document.body.classList.remove('menu-open');
        gsap.to(menuLinks, { y: -20, opacity: 0, stagger: 0.05, duration: 0.3, ease: "power3.in" });
        gsap.to(mobileMenuOverlay, {autoAlpha: 0, duration: 0.4, ease: "power3.in", delay: 0.2});
      }
    });

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        isMenuOpen = false;
        document.body.classList.remove('menu-open');
        gsap.to(mobileMenuOverlay, {autoAlpha: 0, duration: 0.3});
      });
    });
  }

  // ==========================================
  // 3. Preloader Sequence
  // ==========================================
  const preloader = document.querySelector('.preloader');
  const counterElement = document.querySelector('.preloader-counter');
  const barElement = document.querySelector('.preloader-bar');
  const heroElements = document.querySelectorAll('.hero-anim');
  
  let progress = { value: 0 };
  
  gsap.to(progress, {
    value: 100,
    duration: 2.0,
    ease: "power2.inOut",
    onUpdate: () => {
      counterElement.innerText = Math.round(progress.value) + '%';
      gsap.set(barElement, {width: progress.value + '%'});
    },
    onComplete: () => {
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.classList.remove('loading');
          initScrollAnimations(); 
        }
      });
      
      gsap.fromTo(heroElements, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "back.out(1.7)", delay: 0.4 }
      );
    }
  });

  // ==========================================
  // 4. GSAP Scroll Animations Master Function
  // ==========================================
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Text Splitter manually
    const splitHeaders = document.querySelectorAll('.split-header');
    splitHeaders.forEach(header => {
      const text = header.innerText;
      header.innerHTML = '';
      text.split(' ').forEach(word => {
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-block';
        wordWrap.style.marginRight = '0.25em';
        
        word.split('').forEach(char => {
          const charWrap = document.createElement('span');
          charWrap.style.display = 'inline-block';
          charWrap.style.overflow = 'hidden';
          charWrap.style.verticalAlign = 'bottom';
          
          const innerChar = document.createElement('span');
          innerChar.innerText = char;
          innerChar.className = 'char-inner block translate-y-[100%]';
          
          charWrap.appendChild(innerChar);
          wordWrap.appendChild(charWrap);
        });
        header.appendChild(wordWrap);
      });
      
      gsap.to(header.querySelectorAll('.char-inner'), {
        scrollTrigger: { trigger: header, start: "top 85%" },
        y: "0%", duration: 0.8, stagger: 0.02, ease: "power4.out"
      });
    });

    gsap.utils.toArray('.gsap-fade-up').forEach(elem => {
      gsap.fromTo(elem, 
        { y: 50, opacity: 0 }, 
        {
          scrollTrigger: { trigger: elem, start: "top 85%" },
          y: 0, opacity: 1, duration: 1, ease: "power3.out"
        }
      );
    });

    gsap.utils.toArray('.img-parallax-container').forEach(container => {
      const img = container.querySelector('img');
      gsap.to(img, {
        y: "20%", 
        ease: "none",
        scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // Workflow Progress Line dynamically handles width (Desktop) AND height (Mobile)
    const workflowPath = document.querySelector('.workflow-progress');
    const processSection = document.getElementById('process');
    if(workflowPath && processSection) {
      // Create a conditional tween based on screen size
      let mm = gsap.matchMedia();

      // Desktop: Animate Width horizontally
      mm.add("(min-width: 768px)", () => {
        gsap.to(workflowPath, {
          width: "100%", height: "100%", ease: "none",
          scrollTrigger: { trigger: processSection, start: "top 60%", end: "bottom 80%", scrub: 1 }
        });
      });

      // Mobile: Animate Height vertically
      mm.add("(max-width: 767px)", () => {
        gsap.to(workflowPath, {
          height: "100%", width: "100%", ease: "none",
          scrollTrigger: { trigger: processSection, start: "top 60%", end: "bottom 80%", scrub: 1 }
        });
      });
    }
  } // End initScrollAnimations
});
