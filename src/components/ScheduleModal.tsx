"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, ZoomIn, Download, ChevronLeft, ChevronRight, Share2, 
  Calendar, Clock, Mars as Male, Venus as Female, Layers
} from 'lucide-react';

const ScheduleFullView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState('');
  const scheduleRef = useRef<HTMLDivElement>(null);
  
  // Schedule data - using your image paths
  const scheduleData = [
    {
      title: "COURSES",
      subtitle: "All Available Classes",
      background: "from-indigo-600 to-violet-800",
      icon: <Layers size={18} />,
      imagePath: "/Images/cours.png",
      altText: "Levatio Available Courses"
    },
    {
      title: "WOMEN",
      subtitle: "Women's Schedule",
      background: "from-pink-600 to-rose-800",
      icon: <Female size={18} />,
      imagePath: "/Images/planf.png",
      altText: "Women's Schedule Plan"
    },
    {
      title: "MEN",
      subtitle: "Men's Schedule",
      background: "from-sky-600 to-blue-800",
      icon: <Male size={18} />,
      imagePath: "/Images/planh.png",
      altText: "Men's Schedule Plan"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scheduleRef.current && !isZoomed) {
      const rect = scheduleRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setTooltipContent("Click to zoom in");
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  const handleImageMouseLeave = () => {
    setShowTooltip(false);
  };

  // Add a download function for the schedules
  const handleDownload = () => {
    // Get the current active schedule
    const activeSchedule = scheduleData[activeTab];
    
    // Create a link element
    const link = document.createElement('a');
    link.href = activeSchedule.imagePath;
    link.download = `${activeSchedule.title.toLowerCase()}-schedule.png`;
    
    // Append to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add a share function for the schedules
  const handleShare = () => {
    // Get the current active schedule
    const activeSchedule = scheduleData[activeTab];
    
    // Content to share
    const shareData = {
      title: `Levatio ${activeSchedule.title} Schedule`,
      text: `Check out the ${activeSchedule.title} schedule at Levatio`,
      url: window.location.href,
    };
    
    // If Web Share API is available (mobile devices)
    if (navigator.share) {
      navigator.share(shareData)
        .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for desktop browsers
      try {
        // Create a temporary input to copy the text
        const textArea = document.createElement('textarea');
        textArea.value = `${shareData.title} - ${shareData.text}\n${shareData.url}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show confirmation
        alert('Schedule information copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  // Water ripple effect for buttons
  const WaterRippleButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }> = ({ children, onClick, className }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden group ${className}`}
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute w-0 h-0 transition-all duration-700 ease-in-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10"></span>
        <span className="absolute w-0 h-0 transition-all delay-100 duration-700 ease-in-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10"></span>
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="w-full bg-gradient-to-r from-black to-gray-900 border-b border-gray-800 p-4 md:p-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          
          <Image 
            src="/Images/Logo.png" 
            alt="Levatio Logo" 
            width={140} 
            height={50} 
            className="h-auto"
            priority
          />
        </motion.div>
        
        <div className="flex items-center space-x-2">
          <motion.span 
            className="px-3 py-1 text-xs font-medium bg-sky-900/30 text-sky-300 rounded-full border border-sky-800/30 hidden md:flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Clock size={12} className="mr-1" /> Updated April 2025
          </motion.span>
          <WaterRippleButton
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-300"
                    onClick={handleShare}
                  >
                    <Share2 size={18} />
          </WaterRippleButton>
          <WaterRippleButton
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/80 text-white transition-colors duration-300"
            onClick={handleDownload}
          >
            <Download size={18} />
          </WaterRippleButton>
          <WaterRippleButton
            className="p-2 rounded-full bg-gray-800/50 hover:bg-red-900/80 text-white transition-colors duration-300"
          >
            <X size={18} />
          </WaterRippleButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative" ref={scheduleRef}>
        {/* Tab Navigation */}
        <motion.div 
          className="flex items-center justify-center mb-8 pb-2 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex bg-gray-900/50 backdrop-blur-sm rounded-full p-1 border border-gray-800">
            {scheduleData.map((schedule, index) => (
              <motion.button
                key={index}
                className={`relative px-6 py-2 rounded-full text-sm font-medium flex items-center transition-colors duration-300 ${
                  activeTab === index 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => {
                  setIsAnimating(true);
                  setActiveTab(index);
                  setIsZoomed(false);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === index && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${schedule.background}`}
                    layoutId="activetab"
                    initial={false}
                    transition={{ type: "spring", damping: 25 }}
                  />
                )}
                <span className="relative z-10 mr-2">{schedule.icon}</span>
                <span className="relative z-10">{schedule.title}</span>
              </motion.button>
            ))}
          </div>
          
          {/* Animated Indicator */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </motion.div>

        {/* Schedule Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 30 }}
            variants={fadeIn}
            className="relative max-w-xl mx-auto"
          >
            {/* Header */}
            <motion.div 
              className={`p-6 rounded-t-2xl bg-gradient-to-r ${scheduleData[activeTab].background} flex justify-between items-center`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center">
                  {scheduleData[activeTab].icon}
                  <span className="ml-2">{scheduleData[activeTab].title}</span>
                </h2>
                <p className="text-white/80">{scheduleData[activeTab].subtitle}</p>
              </div>
              
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="hidden md:flex items-center text-white/90 text-sm">
                  <Calendar size={14} className="mr-1" /> Updated: April 2025
                </span>
                <WaterRippleButton
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium backdrop-blur-sm"
                  onClick={handleDownload}
                >
                  <span className="flex items-center">
                    <Download size={14} className="mr-2" />
                    Download Image
                  </span>
                </WaterRippleButton>
              </motion.div>
            </motion.div>
            
            {/* Schedule Image Display */}
            <motion.div
              className="relative bg-gray-900 border border-gray-800 rounded-b-2xl overflow-hidden w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Interactive Image Container */}
              <div 
                className="relative w-full bg-gray-900 overflow-hidden flex justify-center items-center aspect-[3/4] p-3"
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
              >
                <motion.div
                  className={`w-full h-full flex justify-center items-center cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  whileHover={!isZoomed ? { scale: 1.02 } : {}}
                  animate={isZoomed ? { 
                    scale: 1.5,
                    transition: { duration: 0.3 } 
                  } : { 
                    scale: 1,
                    transition: { duration: 0.3 } 
                  }}
                  drag={isZoomed}
                  dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                  style={{ touchAction: "none" }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={scheduleData[activeTab].imagePath}
                      alt={scheduleData[activeTab].altText}
                      className="pointer-events-none transition-all duration-300 object-contain max-h-full max-w-full"
                      width={600}
                      height={800}
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                </motion.div>
                
                {/* Controls for zoomed view */}
                {isZoomed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-sm"
                  >
                    <WaterRippleButton
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                      onClick={() => setIsZoomed(false)}
                    >
                      <ZoomIn size={18} />
                    </WaterRippleButton>
                  </motion.div>
                )}
                
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
                      'radial-gradient(circle at 60% 40%, rgba(56, 189, 248, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
                      'radial-gradient(circle at 40% 60%, rgba(56, 189, 248, 0.05) 0%, rgba(0, 0, 0, 0) 70%)'
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                
                {/* Interactive corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-sky-500/50"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-sky-500/50"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-sky-500/50"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-sky-500/50"></div>
              </div>
              
              {/* Zoom hint tooltip */}
              <AnimatePresence>
                {showTooltip && !isZoomed && (
                  <motion.div
                    className="absolute pointer-events-none bg-gray-900/90 backdrop-blur-md p-2 rounded-lg border border-gray-700 shadow-lg z-50 transform -translate-x-1/2 -translate-y-full"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    style={{ 
                      left: `${tooltipPosition.x}px`, 
                      top: `${tooltipPosition.y - 10}px`
                    }}
                  >
                    <div className="flex items-center space-x-2 text-xs">
                      <ZoomIn size={14} />
                      <span>{tooltipContent}</span>
                    </div>
                    <div className="absolute w-3 h-3 bg-gray-900 border-r border-b border-gray-700 transform rotate-45 left-1/2 -bottom-1.5 -ml-1.5"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Image Action Bar */}
              <div className="p-4 flex justify-between items-center border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <WaterRippleButton
                    className={`p-2 rounded-full ${activeTab > 0 ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'} transition-colors duration-300`}
                    onClick={() => {
                      if (activeTab > 0) {
                        setIsAnimating(true);
                        setActiveTab(prevTab => prevTab - 1);
                        setIsZoomed(false);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                  >
                    <ChevronLeft size={18} />
                  </WaterRippleButton>
                  <WaterRippleButton
                    className={`p-2 rounded-full ${activeTab < scheduleData.length - 1 ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'} transition-colors duration-300`}
                    onClick={() => {
                      if (activeTab < scheduleData.length - 1) {
                        setIsAnimating(true);
                        setActiveTab(prevTab => prevTab + 1);
                        setIsZoomed(false);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                  >
                    <ChevronRight size={18} />
                  </WaterRippleButton>
                  <span className="text-sm text-gray-400 ml-2">
                    {activeTab + 1} of {scheduleData.length}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <WaterRippleButton
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-300"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <ZoomIn size={18} />
                  </WaterRippleButton>
                </div>
              </div>
            </motion.div>
            
            
          </motion.div>
        </AnimatePresence>
        
        {/* Loading Animation Overlay */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 border-4 border-gray-800 border-t-sky-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-sky-300 rounded-full opacity-70"
                  animate={{ rotate: -180 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Wave Effect Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 left-0 right-0 opacity-10" 
          viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0,224L40,229.3C80,235,160,245,240,218.7C320,192,400,128,480,122.7C560,117,640,171,720,186.7C800,203,880,181,960,154.7C1040,128,1120,96,1200,90.7C1280,85,1360,107,1400,117.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            fill="url(#gradient1)"
            animate={{
              d: [
                "M0,224L40,229.3C80,235,160,245,240,218.7C320,192,400,128,480,122.7C560,117,640,171,720,186.7C800,203,880,181,960,154.7C1040,128,1120,96,1200,90.7C1280,85,1360,107,1400,117.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,96,320,48,320L0,320Z",
                "M0,192L40,197.3C80,203,160,213,240,197.3C320,181,400,139,480,138.7C560,139,640,181,720,186.7C800,192,880,160,960,154.7C1040,149,1120,171,1200,165.3C1280,160,1360,128,1400,112L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,96,320,48,320L0,320Z",
                "M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,122.7C672,117,768,171,864,186.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "mirror", 
              ease: "easeInOut" 
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
        
        <svg className="absolute bottom-0 left-0 right-0 opacity-5" 
          viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,122.7C672,117,768,171,864,186.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="url(#gradient2)"
            animate={{
              d: [
                "M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,122.7C672,117,768,171,864,186.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,149.3C672,149,768,107,864,101.3C960,96,1056,128,1152,154.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,122.7C672,117,768,171,864,186.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              repeatType: "mirror", 
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg overflow-y-auto"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="fixed top-4 right-4 z-[101] p-2 rounded-full bg-gray-800/50 hover:bg-red-900/80 text-white backdrop-blur-sm transition-colors duration-300"
            aria-label="Close modal"
          >
            <X size={24} />
          </motion.button>
          
          <ScheduleFullView />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleModal;