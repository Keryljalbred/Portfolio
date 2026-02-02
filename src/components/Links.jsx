import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { sendForm } from '@emailjs/browser';
import useDarkMode from '../hooks/useDarkMode';

const Links = () => {
  const { isDark } = useDarkMode();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1400], [0, 280]);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/keryl-djeukoua-9807ab2a1/',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/Keryljalbred',
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:keryljk@gmail.com',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://wa.me/33753820531',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendForm(
        'service_zmhqaxv',     // ✅ SERVICE_ID
        'template_r8hbat3',    // ✅ TEMPLATE_ID
        formRef.current,
        'psD_uSeLaHogI8mlo'    // ✅ PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset du form HTML (sécurise le reset visuel)
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
    id="contact"
    className="py-20 relative overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Vidéos de fond */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src="/white3.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isDark ? 0 : 1 }}
        />
        <video
          src="/dark3.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isDark ? 1 : 0 }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(120deg, rgba(0,0,0,0.6), rgba(30,30,34,0.6))'
              : 'linear-gradient(120deg, rgba(255,255,255,0.6), rgba(240,240,240,0.6))',
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: parallaxY,
          background:
            'linear-gradient(120deg, rgba(59,130,246,0.07), rgba(16,185,129,0.1))',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Me contacter</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Discutons de données, de projets et d’opportunités professionnelles
          </p>
        </motion.div>

        {/* Réseaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition-transform"
            >
              <link.icon className="text-3xl mx-auto mb-3" />
              <p className="font-semibold">{link.name}</p>
            </a>
          ))}
        </div>

        {/* Formulaire */}
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Envoyer un message</h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border"
            />

            <input
              name="subject"
              placeholder="Objet"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Votre message…"
              value={formData.message}
              onChange={handleInputChange}
              required
              className=" w-full px-4 py-3 rounded-lg border
                bg-white text-gray-900
                dark:bg-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer'}
            </button>

            {submitStatus && (
              <p
                className={`text-center ${
                  submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {submitStatus === 'success'
                  ? 'Message envoyé avec succès. Je vous répondrai rapidement.'
                  : 'Erreur lors de l’envoi. Réessayez ou contactez-moi directement.'}
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-16">
          © {new Date().getFullYear()} Keryl Djeukoua Tchani — Tous droits réservés
        </p>
      </div>
    </section>
  );
};

export default Links;
