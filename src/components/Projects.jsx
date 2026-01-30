import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';

const Projects = () => {
  const { isDark } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Parallax effect for Projects background
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, 240]);

  // ✅ Catégories FR (plus cohérentes pour un recruteur Data)
  const categories = [
    { id: 'all', name: 'Tout' },
    { id: 'flagship', name: 'Projet phare' },
    { id: 'data', name: 'Data Engineering' },
    { id: 'ai', name: 'IA & NLP' },
    { id: 'db', name: 'Bases de données' },
    { id: 'viz', name: 'DataViz' },
  ];

  /**
   * ✅ Conseil pro :
   * - Garde FoodWasteZero comme 1 seul projet premium
   * - Les autres = “projets techniques” (preuves de compétences)
   *
   * IMPORTANT :
   * -> Remplace les liens GitHub par TES vrais liens si besoin
   */
  const projects = [
    {
      id: 1,
      title: 'FoodWasteZero — Plateforme data anti-gaspillage (Projet phare)',
      description:
        "Plateforme complète pour réduire le gaspillage alimentaire : ingestion & stockage, API, orchestration, prédictions ML, dashboards et déploiement. Un projet end-to-end orienté produit.",
      image: process.env.PUBLIC_URL + '/foodwastezero.png', // mets une image propre dans /public
      category: 'flagship',
      technologies: [
        'FastAPI',
        'PostgreSQL',
        'Airflow',
        'Python',
        'Scikit-learn',
        'Docker',
        'React / Next',
      ],
      links: [
        {
          label: 'GitHub — Frontend',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/foodwaste-frontend',
        },
        {
          label: 'GitHub — Backend',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/foodwaste-backend',
        },
        // optionnel si tu as une démo :
        // { label: 'Démo', icon: FaExternalLinkAlt, url: 'https://ton-site.com' },
      ],
    },

    {
      id: 2,
      title: 'Assistant pédagogique IA (RAG / QA)',
      description:
        "Assistant IA pour apprendre + réviser : recherche sémantique, récupération de contexte (RAG) et réponses guidées. Conçu pour être robuste et extensible.",
      image: process.env.PUBLIC_URL + '/assistant-ia.png',
      category: 'ai',
      technologies: ['Python', 'NLP', 'RAG', 'LLM', 'Vector Search'],
      links: [
        {
          label: 'GitHub',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/Assistant-P-dagogique-IA',
        },
      ],
    },

    {
      id: 3,
      title: 'Pipeline logs — Airflow · MongoDB · Power BI',
      description:
        "Pipeline de collecte, nettoyage et analyse de logs : orchestration Airflow, stockage MongoDB, restitution via dashboards Power BI.",
      image: process.env.PUBLIC_URL + '/logs-pipeline.jpg',
      category: 'data',
      technologies: ['Airflow', 'MongoDB', 'Python', 'Power BI', 'ETL'],
      links: [
        {
          label: 'GitHub',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/Collecte-',
        },
      ],
    },

    {
      id: 4,
      title: 'Pipeline IoT — Cassandra · Airflow · Grafana',
      description:
        "Traitement de données IoT : ingestion, orchestration, stockage Cassandra et monitoring/visualisation Grafana.",
      image: process.env.PUBLIC_URL + '/iot-pipeline.png',
      category: 'data',
      technologies: ['Cassandra', 'Airflow', 'Python', 'Grafana', 'IoT'],
      links: [
        {
          label: 'GitHub',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/Pipeline-de-traitement',
        },
      ],
    },

    {
      id: 5,
      title: 'Comparaison NoSQL — étude comparative',
      description:
        "Étude comparative de bases NoSQL (modèles, performances, cas d’usage) + recommandations selon contexte.",
      image: process.env.PUBLIC_URL + '/nosql.png',
      category: 'db',
      technologies: ['NoSQL', 'Cassandra', 'MongoDB', 'Benchmark', 'Python'],
      links: [
        {
          label: 'GitHub',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/comparaison',
        },
      ],
    },

    {
      id: 6,
      title: 'Netflix Project — atelier data (NumPy / Pandas)',
      description:
        "Exploration et analyse de données : préparation, features, visualisations et interprétation.",
      image: process.env.PUBLIC_URL + '/netflix.png',
      category: 'viz',
      technologies: ['Pandas', 'NumPy', 'Jupyter', 'DataViz'],
      links: [
        {
          label: 'GitHub',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/Netflix_project',
        },
      ],
    },

    {
      id: 7,
      title: 'DataMining — collection de projets & notebooks',
      description:
        "Sélection de notebooks : exploration, preprocessing, classification, clustering, évaluation et bonnes pratiques.",
      image: process.env.PUBLIC_URL + '/datamining.png',
      category: 'ai',
      technologies: ['Jupyter', 'Pandas', 'ML', 'EDA'],
      links: [
        {
          label: 'GitHub',
          icon: FaGithub,
          url: 'https://github.com/Keryljalbred/DataMining',
        },
      ],
    },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 18 },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="projects"
      className="py-20 relative overflow-hidden select-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      {/* Video Backgrounds with Smooth Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/white2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: isDark ? 0 : 1,
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <video
          src="/dark2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: isDark ? 1 : 0,
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Overlay for text clarity */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(120deg, rgba(0,0,0,0.60) 0%, rgba(30,30,34,0.60) 100%)'
              : 'linear-gradient(120deg, rgba(255,255,255,0.60) 0%, rgba(240,240,240,0.60) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: parallaxY,
          background: 'linear-gradient(120deg, rgba(59,130,246,0.07) 0%, rgba(16,185,129,0.10) 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Projets
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Une sélection de projets orientés Data Engineering, IA et mise en production
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer select-none ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg'
                  : 'bg-white/10 dark:bg-gray-800/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20 border border-gray-200/40 dark:border-gray-700/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative rounded-2xl p-6 text-center cursor-pointer select-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 120, damping: 18 } }}
                whileTap={{ scale: 0.98 }}
                data-interactive="true"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width="600"
                    height="400"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Overlay with Links (multi-liens) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-wrap justify-center gap-3 px-4">
                      {project.links?.map((l) => {
                        const Icon = l.icon || FaExternalLinkAlt;
                        return (
                          <motion.a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={l.label}
                            className="h-11 px-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2 text-white hover:bg-white/30 transition-colors duration-300"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.92 }}
                            data-interactive="true"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-semibold">{l.label}</span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Project Title & Description */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
