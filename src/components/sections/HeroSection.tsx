"use client";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Initialize with a default value instead of empty string
  const [currentVideoSource, setCurrentVideoSource] = useState("/videos/hero.mp4");

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Listen for custom event from Navbar when menu is toggled
    const handleMenuToggle = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen);
    };
    
    window.addEventListener('menuToggled', handleMenuToggle as EventListener);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('menuToggled', handleMenuToggle as EventListener);
    };
  }, []);

  // Determine which video to play based on mobile status and menu state
  const videoSource = isMenuOpen ? "/videos/hero-mobile.mp4" : 
                     isMobile ? "/videos/hero-mobile.mp4" : "/videos/hero.mp4";
  
  // Update video source only when it changes
  useEffect(() => {
    // Only update if the source has actually changed and is not empty
    if (currentVideoSource !== videoSource && videoSource) {
      setCurrentVideoSource(videoSource);
      
      if (videoRef.current) {
        // Pause before changing source to prevent interrupted play requests
        videoRef.current.pause();
        
        // Use a small timeout to ensure pause completes
        setTimeout(() => {
          if (videoRef.current) {
            // Set source directly to prevent empty string being passed
            videoRef.current.src = videoSource;
            videoRef.current.load();
            
            // Play with catch for browser autoplay policies
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.log("Autoplay prevented by browser:", error);
                // Add a play button or user interaction here if needed
              });
            }
          }
        }, 50);
      }
    }
  }, [videoSource, currentVideoSource]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'none' }}
        >
          {/* Only provide source if it's not empty */}
          {currentVideoSource && <source src={currentVideoSource} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
        {/* Light overlay that doesn't add color, just darkens slightly for readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Content remains the same */}
      </div>
    </section>
  );
};

export default HeroSection;