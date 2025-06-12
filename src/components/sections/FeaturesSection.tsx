"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const FeaturesPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  // Remove isPlaying state since the video will always play automatically
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const features = [
    {
      title: "Expert Trainers",
      description: "Train with certified professionals who provide personalized guidance tailored to your unique fitness goals and abilities.",
      image: "/Images/coach.jpg",
      color: "#FF3366",
      label: "COACHES"
    },
    {
      title: "Kinesiotherapy",
      description: "Experience therapeutic movement techniques that rehabilitate injuries and improve mobility for long-term physical wellbeing.",
      image: "/Images/kine.jpg",
      color: "#4F46E5",
      label: "REHABILITATION"
    },
    {
      title: "Aquagym",
      description: "Enjoy refreshing low-impact water workouts that enhance strength, flexibility, and cardiovascular health without joint stress.",
      image: "/Images/aqua.jpg",
      color: "#0EA5E9",
      label: "RECOVERY"
    },
    {
      title: "Kickboxing",
      description: "Unleash your power with high-intensity martial arts training that builds strength, agility, and confidence through dynamic movements.",
      image: "/Images/kick.png",
      color: "#F59E0B",
      label: "MARTIAL-ARTS"
    }
  ];
  
  // Auto-rotate features when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % (features.length + 1)); // +1 to include video
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovering, features.length]); // Added dependencies to fix exhaustive deps warning

  // Improved video autoplay implementation
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Set up video to automatically play
      videoElement.muted = true; // Muted videos autoplay more reliably
      videoElement.loop = true;
      
      // Attempt to play the video
      const playVideo = () => {
        const playPromise = videoElement.play();
        
        // Handle the promise to avoid uncaught rejection errors
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video autoplay failed:", error);
            // Try again after a slight delay
            setTimeout(playVideo, 1000);
          });
        }
      };
      
      playVideo();
    }
    
    // Clean up function
    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, []);

  // Video feature to be used when the video indicator is active
  const videoFeature = {
    title: "Fuel your workout with Levatein",
    color: "#22C55E", // Green color from the video section
    description: "Our premium plant-based protein rich meals delivers essential nutrients to support muscle recovery and growth."
  };

  // Get the currently active feature (either from features array or the video feature)
  const getCurrentFeature = () => {
    if (activeIndex >= features.length) {
      return videoFeature;
    }
    return features[activeIndex];
  };

  const currentFeature = getCurrentFeature();

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl relative">
      {/* Added significantly more space (padding) on top of the title */}
      <div className="text-center mb-16 pt-10">
        <h2 className="inline-block relative text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          More than a <span className="font-extrabold" style={{ color: currentFeature.color }}>GYM</span>
          <span className="absolute -bottom-3 left-0 w-full h-1 rounded" 
            style={{ background: currentFeature.color }} />
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg">
        Enjoy personalized coaching, cutting-edge equipment, and a motivating atmosphere to push your limits, whether you&apos;re a beginner or an expert.
        </p>
      </div>
      
      {/* Improved responsive layout with better spacing */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - 2x2 grid with improved spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => {
                setActiveIndex(index);
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Enhanced Card Design with better hover effects */}
              <div 
                className="relative overflow-hidden rounded-3xl transition-all duration-300"
                style={{ 
                  aspectRatio: "1/1", // Square aspect ratio
                  boxShadow: activeIndex === index 
                    ? `0 18px 32px ${feature.color}40, 0 4px 12px ${feature.color}30` 
                    : '0 10px 20px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Category Label with improved styling */}
                <div className="absolute top-5 left-5 z-20">
                  <span 
                    className="px-4 py-1.5 text-xs font-bold text-white tracking-wider rounded-full"
                    style={{ background: `${feature.color}CC` }}
                  >
                    {feature.label}
                  </span>
                </div>
                
                {/* Image with improved gradient overlay */}
                <div className="h-full w-full overflow-hidden relative">
                  {/* Enhanced dark overlay at bottom */}
                  <div 
                    className="absolute inset-0 z-10" 
                    style={{ 
                      background: `linear-gradient(to bottom, 
                        rgba(0,0,0,0.05) 0%, 
                        rgba(0,0,0,0.3) 60%, 
                        rgba(0,0,0,0.8) 100%)` 
                    }}
                  />
                  
                  {/* Improved color accent overlay */}
                  <div 
                    className="absolute inset-0 z-5 opacity-40 transition-opacity duration-300 group-hover:opacity-60" 
                    style={{ 
                      background: `linear-gradient(45deg, ${feature.color}, transparent 70%)` 
                    }}
                  />
                  
                  {/* Replace img with Next/Image component */}
                  <Image 
                    src={feature.image} 
                    alt={feature.title}
                    className="transition-transform duration-700 group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                
                {/* Content overlay with better text contrast */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 z-20">
                  {/* Title */}
                  <div>
                    <h3 
                      className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-opacity-90"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  
                  {/* Description with improved readability */}
                  <div className="mt-1">
                    <p className="text-white text-sm md:text-base opacity-95 line-clamp-2"
                       style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Enhanced Action section */}
                  <div 
                    className={`mt-5 transition-all duration-300 transform ${
                      activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <button
                      className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105"
                      style={{ 
                        background: feature.color,
                        color: '#FFFFFF',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      <span>Learn more</span>
                      <svg 
                        className="w-4 h-4 ml-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Improved highlight effect on hover */}
                <div 
                  className={`absolute inset-0 z-0 transition-opacity duration-300 ${
                    activeIndex === index ? 'opacity-60' : 'opacity-0'
                  }`}
                  style={{ 
                    background: `radial-gradient(circle at bottom right, ${feature.color}40, transparent 70%)` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Right side - Vertical Rectangle with Video */}
        <div 
          className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 w-full lg:w-1/3"
          onClick={() => {
            setActiveIndex(features.length);
          }}
          onMouseEnter={() => {
            setActiveIndex(features.length);
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div 
            className="relative overflow-hidden rounded-3xl h-full transition-all duration-300"
            style={{ 
              height: "100%", // Full height to match the 2x2 grid
              minHeight: "520px", // Increased minimum height
              boxShadow: activeIndex === features.length
                ? '0 18px 32px rgba(34,197,94,0.25), 0 4px 12px rgba(34,197,94,0.18)'
                : '0 15px 30px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Category Label */}
            <div className="absolute top-6 left-6 z-20">
              <span className="px-4 py-1.5 text-xs font-bold text-white tracking-wider rounded-full bg-green-600">
                NUTRITION
              </span>
            </div>
            
            {/* Video instead of image */}
            <div className="h-full w-full overflow-hidden relative">
              {/* Dark overlay for better text contrast */}
              <div 
                className="absolute inset-0 z-10" 
                style={{ 
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)' 
                }}
              />
              
              {/* Color accent overlay */}
              <div 
                className="absolute inset-0 z-5 opacity-50" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.5), transparent 70%)' 
                }}
              />
              
              {/* Video element with proper attributes for cross-browser compatibility */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                poster="/Images/protein-poster.jpg" // Make sure this image exists
              >
                <source src="/videos/protein.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Remove the play button overlay since video will always autoplay */}
            </div>
            
            {/* Enhanced Content overlay */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-8 z-20">
              <h3 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {videoFeature.title}
              </h3>
              
              <p className="text-white text-base md:text-lg opacity-95 mb-6 max-w-xs" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {videoFeature.description}
              </p>
              
              {/* Enhanced Action button for video section */}
              <div 
                className={`mt-2 transition-all duration-300 transform ${
                  activeIndex === features.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <button
                  className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105"
                  style={{ 
                    background: videoFeature.color,
                    color: '#FFFFFF',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  <span>Shop now</span>
                  <svg 
                    className="w-4 h-4 ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Progress indicator with more space below - now including video indicator */}
      <div className="flex justify-center gap-5 mt-20 mb-8">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative h-3 rounded-full w-16 bg-gray-200 overflow-hidden shadow-inner hover:bg-gray-300 transition-all duration-300"
            aria-label={`View ${features[index].title}`}
          >
            <span 
              className="absolute inset-0 rounded-full transition-all duration-500 ease-out"
              style={{ 
                background: features[index].color,
                transform: `scaleX(${activeIndex === index ? 1 : 0})`,
                transformOrigin: 'left'
              }}
            />
          </button>
        ))}
        {/* Added video indicator */}
        <button
          onClick={() => setActiveIndex(features.length)}
          className="relative h-3 rounded-full w-16 bg-gray-200 overflow-hidden shadow-inner hover:bg-gray-300 transition-all duration-300"
          aria-label="View Levatein"
        >
          <span 
            className="absolute inset-0 rounded-full transition-all duration-500 ease-out"
            style={{ 
              background: videoFeature.color,
              transform: `scaleX(${activeIndex === features.length ? 1 : 0})`,
              transformOrigin: 'left'
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default FeaturesPreview;