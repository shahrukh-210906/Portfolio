import { useState, useEffect } from 'react';

export const DayBackground = () => {
  const [sunPosition, setSunPosition] = useState(90); // Start at 90% from the top
  const [skyOpacity, setSkyOpacity] = useState(0); // Start with no bright overlay

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Ensure pageHeight is not zero to avoid division by zero
      const scrollPercent = pageHeight > 0 ? Math.min(scrollY / pageHeight, 1) : 0;

      // Sun moves from 90% (bottom) to 15% (top)
      setSunPosition(90 - scrollPercent * 75);

      // Sky brightens up (opacity from 0 to 1)
      setSkyOpacity(scrollPercent * 0.7);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base sky gradient */}
      <div className="day-sky absolute inset-0" />
      
      {/* Sun glow overlay that gets brighter on scroll */}
      <div
        className="day-glow absolute inset-0"
        style={{ opacity: skyOpacity }}
      />

      {/* The Sun */}
      <div
        className="sun"
        style={{ top: `${sunPosition}%` }}
      />
    </div>
  );
};