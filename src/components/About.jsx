import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useDarkMode from '../hooks/useDarkMode';

const About = () => {
  const { isDark } = useDarkMode();
  // Parallax effect for About background
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Video Backgrounds with Smooth Transition */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          src="/white1.mp4"
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
          src="/dark1.mp4"
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
          background:
            'linear-gradient(120deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.10) 100%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            viewport={{ once: true }}
          >
            À propos
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl transform rotate-6"
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 1, rotate: 6 }}
                transition={{ duration: 1.1, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <motion.img
                src={process.env.PUBLIC_URL + "/profile.jpeg"}
                alt="Keryl Djeukoua Tchani"
                loading="lazy"
                width="600"
                height="384"
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">Junior</div>
                <div className="text-sm text-gray-300">Data Engineer</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.h3
              className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ingénieure Data & IA | Data Engineering | ML & MLOps
            </motion.h3>

            <motion.p
              className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Je m’appelle <b>Keryl Djeukoua Tchani</b>, Ingénieure Data & IA, en recherche d’une opportunité
              de <b>CDI</b> avec <b>disponibilité immédiate</b>. Je conçois des solutions data de bout en bout :
              ingestion, transformation, orchestration, stockage et visualisation, avec une forte attention
              portée à la qualité et à l’automatisation.
              <br /><br />

              Mes compétences couvrent notamment :
              <br />
              • <b>ETL/ELT</b> et conception/optimisation de pipelines (Airflow, Talend)
              <br />
              • <b>Big Data & Cloud</b> (Spark, Hadoop, BigQuery, AWS)
              <br />
              • <b>Bases de données</b> relationnelles & NoSQL (PostgreSQL, MongoDB, Cassandra, Snowflake)
              <br />
              • <b>Machine Learning & IA</b> (Scikit-learn, NLP/LLM, RAG, TensorFlow/PyTorch)
              <br />
              • <b>DataViz & Monitoring</b> (Power BI, Metabase, Grafana)
              <br /><br />

              J’ai réalisé plusieurs projets concrets, dont un assistant pédagogique IA (RAG) et des pipelines
              temps réel pour capteurs IoT, ainsi que des pipelines de collecte/analyse de logs et des benchmarks NoSQL.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="mt-8 flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/cv.pdf"
                download
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl glass cursor-pointer select-none relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 12px 32px 0 rgba(0,0,0,0.25), 0 0 16px 4px rgba(16,185,129,0.35)',
                }}
                whileTap={{ scale: 0.95 }}
                data-interactive="true"
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)' }}
              >
                <span className="relative z-10">Télécharger mon CV</span>
                <span className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
