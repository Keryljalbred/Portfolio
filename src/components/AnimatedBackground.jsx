import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

const AnimatedBackground = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="fixed inset-0 -z-10">
      <div className="w-full h-full">
        <img
          src={process.env.PUBLIC_URL + (isDark ? "/dark.jpg" : "/white.jpg")}
          alt={isDark ? "Dark Background" : "Light Background"}
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: 1 }}
        />
      </div>
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
  );
};

export default AnimatedBackground; 