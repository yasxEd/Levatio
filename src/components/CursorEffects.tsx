'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CursorEffectsProps {
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  isClicking: boolean;
}

const CursorEffects = ({ mousePosition, isHovering, isClicking }: CursorEffectsProps) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  useEffect(() => {
    if (!isClicking) return;
    
    // Add current position to trail
    const newPoint = { x: mousePosition.x, y: mousePosition.y, id: Date.now() };
    setTrail(prev => [...prev, newPoint].slice(-15)); // Keep only last 15 points
    
    // Clear trail points after animation completes
    const timer = setTimeout(() => {
      setTrail(prev => prev.filter(point => point.id !== newPoint.id));
    }, 800);
    
    return () => clearTimeout(timer);
  }, [mousePosition, isClicking]);
  
  return (
    <>
      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="cursor-ripple"
          initial={{ 
            x: mousePosition.x, 
            y: mousePosition.y, 
            scale: 0, 
            opacity: 0.8 
          }}
          animate={{ 
            scale: 4, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
        />
      )}
      
      {/* Trail effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="cursor-trail"
          initial={{ 
            x: point.x, 
            y: point.y, 
            scale: 0.2, 
            opacity: 0.8 
          }}
          animate={{ 
            scale: 0, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
          style={{
            backgroundColor: `hsl(${(index * 20) % 360}, 100%, 70%)`,
          }}
        />
      ))}
      
      {/* Hover magnetic effect */}
      {isHovering && (
        <motion.div
          className="cursor-magnetic"
          initial={{ 
            x: mousePosition.x, 
            y: mousePosition.y, 
            scale: 0, 
            opacity: 0.2 
          }}
          animate={{ 
            x: mousePosition.x, 
            y: mousePosition.y,
            scale: 2.5, 
            opacity: 0.1 
          }}
          exit={{
            scale: 0,
            opacity: 0
          }}
          transition={{ 
            type: "spring",
            damping: 10,
            stiffness: 200
          }}
        />
      )}
    </>
  );
};

export default CursorEffects;