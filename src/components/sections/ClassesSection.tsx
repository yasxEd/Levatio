"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Dumbbell, ChevronRight, ExternalLink, X, Share2, Phone } from "lucide-react";
import Image from "next/image";

export default function GymsSection() {
  const [activeGym, setActiveGym] = useState(1);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // New state for map modal
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedMapGym, setSelectedMapGym] = useState<typeof gyms[0] | null>(null);

  // Intersection Observer for section entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  const gyms = [
    {
      id: 1,
      name: "LEVATIO Bellacorte District",
      address: "Via Roma 45, Bellacorte, Aurelia 20145",
      features: ["Weight Training", "Martial Arts", "Aquagym", "Kinesiotherapy"],
      hours: "7:00 AM - 10:00 PM",
      image: "/Images/oth.jpg",
      color: "#3B82F6", // Blue
      // Generic map URL for demonstration
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.0907858529963!2d2.3522213!3d48.8566647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzI0LjAiTiAywrAyMScwOC4wIkU%3D!5e0!3m2!1sen!2sus!4v1234567890&markers=color:red%7C48.8566647,2.3522213",
      phone: "+33 1 23 45 67 89"
    },
    {
      id: 2,
      name: "LEVATIO Nordheim Center",
      address: "Hauptstraße 12, Nordheim, Zentral Europa 10115",
      features: ["Weight Training", "CrossFit", "Martial Arts", "Levatein"],
      hours: "7:00 AM - 10:00 PM",
      image: "/Images/mom.jpg",
      color: "#06B6D4", // Cyan
      // Generic map URL for demonstration
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.2045898634715!2d13.4050413!3d52.5200647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjIiTiAxM8KwMjQnMTguMSJF!5e0!3m2!1sen!2sus!4v1234567891&markers=color:red%7C52.5200647,13.4050413",
      phone: "+49 30 12 34 56 78"
    }
  ];

  return (
    <section 
      id="gyms" // Add this id to make it a target for the navbar links
      ref={sectionRef}
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Glowing orbs for modern look */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px] -z-10"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[80px] -z-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black mb-6 inline-block relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Our GYMS
            </span>
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: isVisible ? "100%" : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"
            />
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Our mission is To provide a space where everyone can evolve, push their limits, and achieve their goals
            through modern equipment, expert coaching, and a motivating atmosphere.
          </p>
        </motion.div>

        {/* Tab navigation for gyms */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Tab buttons section with heading */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/3"
          >
            {/* Super-sized "2" with text beside it */}
            <div className="mb-8 flex items-start">
              {/* The big "2" with all its effects */}
              <div className="relative group cursor-pointer mr-3">
                {/* 3D shadow layers for depth */}
                <span 
                  className="absolute text-8xl font-black text-blue-900/10 leading-none blur-sm transition-all duration-500 group-hover:blur-md group-hover:translate-x-2 group-hover:translate-y-2"
                  style={{ 
                    transform: "translate(5px, 5px)",
                    filter: "blur(4px)"
                  }}
                >
                  2
                </span>
                
                <span 
                  className="absolute text-8xl font-black text-blue-800/20 leading-none blur-[2px] transition-all duration-500 group-hover:blur-[3px] group-hover:translate-x-1 group-hover:translate-y-1"
                  style={{ 
                    transform: "translate(3px, 3px)",
                  }}
                >
                  2
                </span>

                {/* Main "2" with enhanced gradient */}
                <span 
                  className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-200 leading-none inline-block transition-all duration-500 relative z-10
                  group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    textShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
                    filter: 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.4))',
                  }}
                >
                  2
                </span>
                
                {/* Inner shine that appears on hover */}
                <span 
                  className="absolute inset-0 text-8xl font-black bg-clip-text text-transparent bg-gradient-to-tr from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-[2px] z-20"
                >
                  2
                </span>
                
                {/* Enhanced decorative elements */}
                <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-blue-500/20 blur-md transition-all duration-500 
                  group-hover:scale-[2] group-hover:bg-blue-400/60 group-hover:w-8 group-hover:h-8"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-cyan-500/20 blur-md transition-all duration-500 
                  group-hover:scale-[2.5] group-hover:bg-cyan-400/60 group-hover:w-5 group-hover:h-5"></div>
                
                {/* Sparkle effects that appear on hover */}
                <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-0 transition-all duration-500 
                  group-hover:opacity-80 group-hover:scale-110"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-0 transition-all duration-500 
                  group-hover:opacity-90 group-hover:scale-150"></div>
                
                {/* Sine wave animation using multiple pulsing rings with different timings */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-blue-400/0"
                  animate={{ 
                    scale: [1.1, 1.4, 1.1],
                    opacity: [0, 0.6, 0],
                    borderColor: ['rgba(59, 130, 246, 0)', 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0)']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
                
                {/* Second wave with offset timing */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/0"
                  animate={{ 
                    scale: [1.2, 1.5, 1.2],
                    opacity: [0, 0.5, 0],
                    borderColor: ['rgba(6, 182, 212, 0)', 'rgba(6, 182, 212, 0.3)', 'rgba(6, 182, 212, 0)']
                  }}
                  transition={{ 
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
                
                {/* Third wave with different timing */}
                <motion.div 
                  className="absolute inset-0 rounded-full border border-white/0"
                  animate={{ 
                    scale: [1.0, 1.3, 1.0],
                    opacity: [0, 0.3, 0],
                    borderColor: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']
                  }}
                  transition={{ 
                    duration: 2.5,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Text beside the big "2" */}
              <div className="pt-4">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-2">
                  Premium Locations
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Choose the gym that fits your needs and training preferences
                </p>
              </div>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
              {gyms.map((gym) => (
                <button
                  key={gym.id}
                  onClick={() => setActiveGym(gym.id)}
                  className={`w-full text-left p-5 mb-3 last:amb-0 rounded-lg flex items-center justify-between transition-all duration-300 ${
                    activeGym === gym.id 
                      ? 'bg-gradient-to-r from-blue-900/60 to-cyan-900/60 shadow-lg' 
                      : 'bg-gray-800/40 hover:bg-gray-800/80'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-lg mb-1">{gym.name}</span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span className="truncate max-w-[200px]">{gym.address}</span>
                    </div>
                  </div>
                  <div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activeGym === gym.id ? 'bg-white' : 'bg-gray-700'
                    }`}
                  >
                    <ChevronRight 
                      size={16} 
                      className={activeGym === gym.id ? 'text-blue-600' : 'text-gray-400'} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active gym card */}
          <AnimatePresence mode="wait">
            {gyms.map((gym) => (
              gym.id === activeGym && (
                <motion.div
                  key={gym.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-2/3 h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800 shadow-2xl">
                    {/* Main image - large and prominent */}
                    <div className="relative h-72 md:h-96 overflow-hidden">
                      <Image
                        src={gym.image}
                        alt={gym.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-700 hover:scale-105"
                        priority
                      />
                      
                      {/* Transparent gradient overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" 
                      />
                      
                      {/* Colored accent */}
                      <div 
                        className="absolute inset-0 opacity-40" 
                        style={{ 
                          background: `linear-gradient(135deg, ${gym.color}40, transparent 50%)` 
                        }}
                      />
                      
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-8">
                        <motion.h3 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-4xl font-black mb-3"
                        >
                          {gym.name}
                        </motion.h3>
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="flex items-center text-blue-300"
                        >
                          <MapPin size={18} className="mr-2" />
                          <p className="text-sm md:text-base">{gym.address}</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Details content */}
                    <div className="p-8">
                      {/* Hours with modern design */}
                      <div className="mb-8">
                        <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">OPENING HOURS</h4>
                        <div className="flex items-center p-4 bg-gray-800/60 rounded-lg">
                          <Clock size={20} className="mr-3 text-blue-400" />
                          <span className="text-lg font-medium">{gym.hours}</span>
                        </div>
                      </div>
                      
                      {/* Features section */}
                      <div className="mb-8">
                        <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">SERVICES</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {gym.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * index }}
                              className="p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg text-center"
                            >
                              <Dumbbell size={18} className="mx-auto mb-2 text-blue-400" />
                              <span className="text-sm font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA Button - Modified to open map modal */}
                      <button 
                        onClick={() => {
                          setSelectedMapGym(gym);
                          setShowMapModal(true);
                        }}
                        className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] group"
                      >
                        <span className="mr-2">VISIT THIS GYM</span>
                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Map Location Modal - Enhanced Version with improved mobile layout */}
      <AnimatePresence>
        {showMapModal && selectedMapGym && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowMapModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gray-900/90 rounded-xl overflow-hidden w-full max-w-4xl shadow-2xl border border-gray-800 md:h-auto mx-4 my-auto"
              style={{ maxHeight: "calc(100vh - 40px)" }} // Ensure it doesn't exceed screen height
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with enhanced gradient */}
              <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 sticky top-0 z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center truncate pr-2">
                  <span 
                    className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 md:mr-3 flex-shrink-0"
                    style={{ backgroundColor: selectedMapGym.color }}
                  />
                  {selectedMapGym.name}
                </h3>
                <button 
                  onClick={() => setShowMapModal(false)}
                  className="rounded-full p-2 hover:bg-gray-800 transition-colors duration-300 flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>
              
              {/* Modal Content - Responsive layout for mobile and desktop */}
              <div className="flex flex-col md:flex-row overflow-hidden max-h-[80vh] md:max-h-none">
                {/* Map container with enhanced effects */}
                <div className="w-full md:w-2/3 relative group overflow-hidden h-[40vh] md:h-[400px]">
                  {/* Actual map iframe - Enhanced with ability to interact directly */}
                  <div className="h-full w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-0"></div>
                    
                    {/* Map with interactive capabilities */}
                    <iframe 
                      src={selectedMapGym.mapUrl}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      loading="lazy"
                      className="grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 scale-[1.01] group-hover:scale-[1.03]"
                      title={`Map to ${selectedMapGym.name}`}
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    
                    {/* Interactive hint overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm opacity-80 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none z-20">
                      Click and drag to explore
                    </div>
                    
                    {/* Enhanced border glow effect that cycles colors */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100"
                      animate={{
                        boxShadow: [
                          `inset 0 0 15px ${selectedMapGym.color}90`,
                          `inset 0 0 25px ${selectedMapGym.color}60`,
                          `inset 0 0 15px ${selectedMapGym.color}90`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                  </div>
                </div>
                
                {/* Location details sidebar with enhanced styling */}
                <div className="w-full md:w-1/3 p-4 md:p-6 bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col border-t md:border-t-0 md:border-l border-gray-800 overflow-y-auto">
                  <h4 className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 font-semibold">LOCATION DETAILS</h4>
                  
                  {/* Address block with enhanced hover effect */}
                  <div className="mb-3 md:mb-6 group">
                    <div className="flex items-start p-3 rounded-lg transition-all duration-300 hover:bg-gray-800/40">
                      <MapPin 
                        size={18} 
                        className="mr-3 mt-1 text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div>
                        <h5 className="font-medium text-white text-sm md:text-base mb-1">Address</h5>
                        <p className="text-gray-400 text-xs md:text-sm">{selectedMapGym.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hours block with enhanced hover effect */}
                  <div className="mb-3 md:mb-6 group">
                    <div className="flex items-start p-3 rounded-lg transition-all duration-300 hover:bg-gray-800/40">
                      <Clock 
                        size={18} 
                        className="mr-3 mt-1 text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div>
                        <h5 className="font-medium text-white text-sm md:text-base mb-1">Opening Hours</h5>
                        <p className="text-gray-400 text-xs md:text-sm">{selectedMapGym.hours}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone number with enhanced hover effect */}
                  <div className="mb-3 md:mb-6 group">
                    <div className="flex items-start p-3 rounded-lg transition-all duration-300 hover:bg-gray-800/40">
                      <Phone 
                        size={18} 
                        className="mr-3 mt-1 text-blue-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div>
                        <h5 className="font-medium text-white text-sm md:text-base mb-1">Contact</h5>
                        <p className="text-gray-400 text-xs md:text-sm">{selectedMapGym.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons with enhanced styling */}
                  <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                    <a 
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 group"
                    >
                      <motion.div 
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <MapPin size={16} className="mr-2 text-white" />
                      </motion.div>
                      <span className="text-white text-xs md:text-sm font-medium">Directions</span>
                    </a>
                    
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: selectedMapGym.name,
                            text: `Check out ${selectedMapGym.name} at LEVATIO`,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="flex items-center justify-center py-2 md:py-3 px-3 md:px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/20"
                    >
                      <Share2 size={16} className="mr-2 text-gray-300 group-hover:rotate-12 transition-transform" />
                      <span className="text-gray-300 text-xs md:text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}