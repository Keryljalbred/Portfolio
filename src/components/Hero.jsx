import React, { useCallback, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDarkMode from '../hooks/useDarkMode';

gsap.registerPlugin(ScrollTrigger);

const LAYER_CONFIGS = [
  {
    z: 20,
    size: 420,
    blur: 24,
    shadow: '0 8px 32px 0 rgba(16,185,129,0.10), 0 2px 8px 0 rgba(59,130,246,0.04)',
    opacity: 0.18,
  },
  {
    z: 10,
    size: 340,
    blur: 16,
    shadow: '0 4px 16px 0 rgba(59,130,246,0.10), 0 1.5px 4px 0 rgba(16,185,129,0.03)',
    opacity: 0.14,
  },
  {
    z: 5,
    size: 260,
    blur: 8,
    shadow: '0 2px 8px 0 rgba(59,130,246,0.08)',
    opacity: 0.10,
  },
];

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // (Optionnel) tu peux supprimer le console.log une fois validé
  const particlesLoaded = useCallback(async () => {}, []);

  const imgRef = useRef(null);
  const heroSectionRef = useRef(null);
  const pinRef = useRef(null);
  const textBlockRefs = useRef([]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const { isDark } = useDarkMode();

  useEffect(() => {
    if (!imgRef.current || !heroSectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Zoom effect on scroll
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: false,
            anticipatePin: 1,
          },
        }
      );

      // Pin effect for the image block
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top 20%',
        end: 'bottom 60%',
        pin: true,
        pinSpacing: true,
        scrub: false,
        anticipatePin: 1,
      });

      // Animate text blocks
      textBlockRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 60%',
              scrub: false,
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroSectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    };

    const section = heroSectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="min-h-screen flex flex-col justify-center items-center text-gray-900 dark:text-white relative overflow-hidden py-20 bg-white dark:bg-gray-900"
    >
      {/* Video Backgrounds with Smooth Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/white.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
        <video
          src="/dark.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isDark ? 1 : 0, transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />

        {/* Overlay for text clarity */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(120deg, rgba(0,0,0,0.62) 0%, rgba(30,30,34,0.62) 100%)'
              : 'linear-gradient(120deg, rgba(255,255,255,0.62) 0%, rgba(240,240,240,0.62) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* 3D Parallax Layers with Circular Windows */}
      {LAYER_CONFIGS.map((layer, i) => {
        const px = (mouse.x - 0.5) * (layer.z * 1.5);
        const py = (mouse.y - 0.5) * (layer.z * 1.5);
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 z-10 pointer-events-none"
            style={{
              zIndex: layer.z,
              width: layer.size,
              height: layer.size,
              transform: `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0)`,
              boxShadow: layer.shadow,
              opacity: layer.opacity,
              borderRadius: '50%',
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              background: 'rgba(255,255,255,0.12)',
              clipPath: 'circle(48% at 50% 50%)',
              border: '2px solid rgba(16,185,129,0.12)',
            }}
            aria-hidden="true"
          />
        );
      })}

      {/* Enhanced Particles Background */}
      <Particles
        id="hero-particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: 'push' },
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              push: { quantity: 6 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            // On adapte les couleurs selon le thème pour rester lisible
            color: { value: isDark ? ['#ffffff', '#10b981', '#3b82f6'] : ['#0f172a', '#10b981', '#3b82f6'] },
            links: {
              color: isDark ? '#ffffff' : '#0f172a',
              distance: 150,
              enable: true,
              opacity: isDark ? 0.25 : 0.18,
              width: 1,
            },
            collisions: { enable: true },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: {
              value: isDark ? 0.45 : 0.28,
              animation: { enable: true, speed: 1, minimumValue: 0.08 },
            },
            shape: { type: 'circle' },
            size: {
              value: { min: 1, max: 5 },
              animation: { enable: true, speed: 2, minimumValue: 0.1 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-start text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 mt-8">
        {/* Top Centered Image */}
        <div ref={pinRef} className="flex justify-center items-center w-full mb-6">
          <motion.img
            ref={imgRef}
            src={process.env.PUBLIC_URL + '/profile.png'}
            alt="Keryl Djeukoua Tchani"
            loading="lazy"
            width="320"
            height="320"
            className="w-40 h-40 md:w-64 md:h-64 rounded-full border-4 border-white/20 dark:border-gray-600/20 shadow-2xl object-cover animate-float"
            style={{ objectPosition: '50% 40%' }}
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>

        {/* Name */}
        <h1
          ref={(el) => (textBlockRefs.current[0] = el)}
          className="text-5xl md:text-7xl lg:text-hero font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white"
        >
          Keryl Djeukoua<br />Tchani
        </h1>

        {/* Title / Positioning */}
        <div
          ref={(el) => (textBlockRefs.current[1] = el)}
          className="text-2xl md:text-3xl font-bold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500"
        >
          Data Engineer Junior · Ingénieure Data & IA
        </div>

        {/* Subtitle */}
        <p
          ref={(el) => (textBlockRefs.current[2] = el)}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl"
        >
          Pipelines ETL/ELT · Orchestration (Airflow) · Bases de données (SQL/NoSQL) · ML & IA appliquée
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <a
            href={process.env.PUBLIC_URL + '/cv.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-lg font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors duration-300 transform hover:scale-105"
          >
            Télécharger CV
          </a>

          <a
            href="#projects"
            className="px-8 py-3 text-lg font-semibold text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            Voir mes projets
          </a>

          <a
            href="#contact"
            className="px-8 py-3 text-lg font-semibold text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            Me contacter
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-900/25 dark:border-gray-200/25 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-900/50 dark:bg-gray-200/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
