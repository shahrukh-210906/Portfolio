import { useState, useEffect } from 'react';

// (The createCloud function remains the same)
const createCloud = (id) => ({
  id,
  style: {
    top: `${Math.random() * 40}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 100 + 80}px`,
    height: `${Math.random() * 40 + 30}px`,
    animationDuration: `${Math.random() * 50 + 40}s`,
    animationDelay: `-${Math.random() * 40}s`,
    opacity: Math.random() * 0.4 + 0.3,
  },
});

export const DayBackground = () => {
  const [sunPosition, setSunPosition] = useState(90);
  const [skyOpacity, setSkyOpacity] = useState(0);
  const [clouds, setClouds] = useState([]);
  const [horizonGlow, setHorizonGlow] = useState(0);

  useEffect(() => {
    const initialClouds = Array.from({ length: 8 }, (_, i) => createCloud(i));
    setClouds(initialClouds);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = pageHeight > 0 ? Math.min(scrollY / pageHeight, 1) : 0;

      setSunPosition(90 - scrollPercent * 100);
      setSkyOpacity(scrollPercent * 0.7);

      // --- THIS IS THE CHANGE ---
      // Start the glow animation only when the user is 85% scrolled down the page.
      const glowStart = 0.95; 
      if (scrollPercent > glowStart) {
        const glowProgress = (scrollPercent - glowStart) / (1 - glowStart);
        setHorizonGlow(glowProgress);
      } else {
        setHorizonGlow(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="day-sky absolute inset-0" 
        style={{ '--horizon-glow': horizonGlow }}
      />
      <div className="day-glow absolute inset-0" style={{ opacity: skyOpacity }} />
      <div className="sun" style={{ top: `${sunPosition}%` }} />
      
      <div className="clouds-container">
        {clouds.map(cloud => (
          <div key={cloud.id} className="cloud" style={cloud.style} />
        ))}
      </div>
    </div>
  );
};