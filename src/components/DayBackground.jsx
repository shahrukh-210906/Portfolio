import { useState, useEffect } from 'react';

// (The createCloud function remains the same)
const createCloud = (id) => ({
  id,
  style: {
    top: `${Math.random() * 40}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 150 + 150}px`,
    height: `${Math.random() * 50 + 50}px`,
    animationDuration: `${Math.random() * 50 + 40}s`,
    animationDelay: `-${Math.random() * 40}s`,
    opacity: Math.random() * 0.4 + 0.6,
  },
});

export const DayBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const initialClouds = Array.from({ length: 8 }, (_, i) => createCloud(i));
    setClouds(initialClouds);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="day-sky absolute inset-0" 
        style={{ '--horizon-glow': 0 }}
      />
      <div className="day-glow absolute inset-0" style={{ opacity: 0 }} />
      <div className="sun" style={{ top: `90%` }} />
      
      <div className="clouds-container">
        {clouds.map(cloud => (
          <div key={cloud.id} className="cloud" style={cloud.style} />
        ))}
      </div>
    </div>
  );
};