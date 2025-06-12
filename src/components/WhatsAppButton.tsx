'use client';

// /src/components/WhatsAppButton.tsx
import React, { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Direct phone number without requiring it as a prop
  const phoneNumber = "1234567890";
  
  // WhatsApp link with pre-filled message
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello,%20I'm%20interested%20in%20Levatio%20services`;
  
  // Show button after a slight delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative">
        {/* Main button with glassmorphism effect */}
        <div className={`
          flex items-center justify-center w-12 h-12 
          bg-white/10 backdrop-blur-md
          rounded-full shadow-lg
          border border-white/20
          transition-all duration-300 
          ${isHovered ? 'shadow-green-400/20 shadow-xl scale-110' : 'shadow-green-400/10'}
        `}>
          {/* WhatsApp Icon */}
          <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          
          {/* Green inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-green-500/10"></div>
          
          {/* Water ripple effect on hover with glass effect */}
          <div className={`
            absolute inset-0 rounded-full
            transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <span className="absolute inset-0 rounded-full bg-green-400/10 animate-ping-slow"></span>
            <span className="absolute inset-0 rounded-full bg-green-400/5 animate-ping-slow delay-300"></span>
          </div>
        </div>
        
        {/* Tooltip with glassmorphism */}
        <div className={`
          absolute -top-10 left-1/2 transform -translate-x-1/2
          bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md
          text-green-600 font-medium whitespace-nowrap text-xs
          border border-white/50
          transition-all duration-300
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 -translate-y-2'}
        `}>
          Chat
          <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white/80" width="8" height="4" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L0 0H12L6 6Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </a>
  );
};

// Add these styles to your globals.css
// @keyframes ping-slow {
//   0% {
//     transform: scale(0.2);
//     opacity: 0.6;
//   }
//   50% {
//     opacity: 0.4;
//   }
//   100% {
//     transform: scale(1.8);
//     opacity: 0;
//   }
// }
// .animate-ping-slow {
//   animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
// }

export default WhatsAppButton;