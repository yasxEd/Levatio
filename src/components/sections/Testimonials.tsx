"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image: string;
    rating?: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "ALESSANDRO M.",
        role: "Fitness Enthusiast",
        content: "This gym is simply amazing. I was able to achieve my fitness goals thanks to their personalized training program.",
        image: "/Images/testimonials/1.jpg",
        rating: 4,
    },
    {
        id: 2,
        name: "ELENA K.",
        role: "Fitness Enthusiast",
        content: "Great gym! The equipment is high quality and the staff is very professional.",
        image: "/Images/testimonials/2.jpg",
        rating: 5,
    },
    {
        id: 3,
        name: "MARCUS S.",
        role: "Fitness Enthusiast",
        content: "I really enjoyed this gym. The trainers are knowledgeable and the atmosphere is motivating.",
        image: "/Images/testimonials/3.jpg",
        rating: 4,
    },
    {
        id: 4,
        name: "SOPHIA B.",
        role: "YOGA INSTRUCTOR",
        content: "I highly recommend this gym. The hours are flexible and the prices are excellent.",
        image: "/Images/testimonials/4.jpg",
        rating: 5,
    },
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        // Pause autoplay briefly when manually changing
        setAutoplay(false);
        setTimeout(() => setAutoplay(true), 7000);
    };

    useEffect(() => {
        if (autoplay && !isHovering) {
            intervalRef.current = setInterval(() => {
                nextTestimonial();
            }, 6000); // Change testimonial every 6 seconds
        }
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoplay, isHovering]);

    // Card variants for framer motion
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { 
                duration: 0.3,
                ease: "easeInOut" 
            }
        }
    };

    // Function to render star ratings with support for half stars
    const renderRating = (rating: number = 5) => {
        return (
            <div className="flex items-center justify-center md:justify-start mt-2">
                {[...Array(5)].map((_, i) => {
                    let starClass = 'text-gray-300'; // Default empty star
                    
                    if (i < Math.floor(rating)) {
                        starClass = 'text-yellow-400'; // Full star
                    } else if (i < rating && rating % 1 !== 0) {
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="relative w-5 h-5"
                            >
                                {/* Background star (gray) */}
                                <FaStar className="w-5 h-5 text-gray-300 absolute top-0 left-0" />
                                {/* Half-filled star with clip path */}
                                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                    <FaStar className="w-5 h-5 text-yellow-400" />
                                </div>
                            </motion.div>
                        );
                    }
                    
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                        >
                            <FaStar className={`w-5 h-5 ${starClass}`} />
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    return (
        <section 
            className="w-full py-20 overflow-hidden relative bg-blue-50"
            style={{
                backgroundColor: "#f0f7ff" // Fallback color
            }}
        >
            {/* Add the centered background image with maximum visibility */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src="/Images/bckr.png"
                        alt="Background"
                        className="object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[1500px]"
                        style={{ opacity: 1 }} /* Full opacity for maximum visibility */
                        width={1500}
                        height={1000}
                    />
                </div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 relative inline-block">
                        <span className="relative z-10">What Our Members Say</span>
                        <motion.div 
                            className="absolute -top-2 -left-6 -right-6 -bottom-2 bg-blue-100/50 blur-md rounded-full z-0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                        <motion.div 
                            className="absolute -bottom-3 left-0 h-1 bg-blue-500 rounded-full z-10"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                        />
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-6">
                        Discover how Levatio has helped people achieve their fitness goals and transform their lives.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Animated decorative elements */}
                    <motion.div 
                        className="absolute -top-20 -left-20 w-60 h-60 bg-blue-300 rounded-full opacity-50 blur-3xl"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.4, 0.6, 0.4]
                        }}
                        transition={{ 
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <motion.div 
                        className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-200 rounded-full opacity-40 blur-3xl"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 2
                        }}
                    />
                    
                    {/* Main testimonial carousel - REDESIGNED CARD */}
                    <motion.div 
                        className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                        style={{
                            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.08), 0 15px 25px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        {/* Top accent bar with gradient */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500" />
                        
                        <div className="p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                >
                                    <div className="flex flex-col lg:flex-row items-center gap-8">
                                        {/* Left side - Profile section */}
                                        <div className="lg:w-1/3 flex flex-col items-center text-center">
                                            <motion.div 
                                                className="relative mb-4"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {/* Profile image with modern frame */}
                                                <div className="relative w-24 h-24 md:w-32 md:h-32">
                                                    {/* Gradient ring */}
                                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-teal-500 p-1">
                                                        <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                                <Image 
                                                                    src={testimonials[currentIndex].image} 
                                                                    alt={testimonials[currentIndex].name}
                                                                    className="transition-transform duration-500 hover:scale-110"
                                                                    fill
                                                                    objectFit="cover"
                                                                    sizes="(max-width: 768px) 96px, 128px"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        if (target.src !== "https://via.placeholder.com/150/0A84FF/FFFFFF/?text=Levatio") {
                                                                            target.src = "https://via.placeholder.com/150/0A84FF/FFFFFF/?text=Levatio";
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Floating badge */}
                                                    <motion.div 
                                                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                            
                                            {/* Name and role */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3, duration: 0.5 }}
                                                className="mb-3"
                                            >
                                                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{testimonials[currentIndex].name}</h4>
                                                <div className="flex items-center justify-center mb-2">
                                                    <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></div>
                                                    <p className="text-blue-600 font-medium text-xs uppercase tracking-wider">{testimonials[currentIndex].role}</p>
                                                    <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 ml-2"></div>
                                                </div>
                                                {renderRating(testimonials[currentIndex].rating)}
                                            </motion.div>
                                            
                                            {/* Member since badge */}
                                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                                                <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-xs font-medium text-blue-700">Member since 2022</span>
                                            </div>
                                        </div>
                                        
                                        {/* Right side - Testimonial content */}
                                        <div className="lg:w-2/3 relative">
                                            {/* Large quote icon */}
                                            <div className="absolute -top-2 -left-2 text-4xl text-blue-100 opacity-80">
                                                <FaQuoteLeft />
                                            </div>
                                            
                                            {/* Quote content */}
                                            <motion.div 
                                                className="relative z-10 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.6 }}
                                            >
                                                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 italic">
                                                    &quot;{testimonials[currentIndex].content}&quot;
                                                </p>
                                                
                                                {/* Achievement tags */}
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                        ✓ Goals Achieved
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                        ✓ Fitness Improved
                                                    </span>
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                        ✓ Lifestyle Changed
                                                    </span>
                                                </div>
                                                
                                                {/* Progress indicator */}
                                                <div className="flex items-center text-xs text-gray-600">
                                                    <div className="flex items-center mr-3">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                                                        <span>Verified Member</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <svg className="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Real testimonial</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            
                            {/* Enhanced Navigation controls */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                <motion.button 
                                    onClick={prevTestimonial}
                                    className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 shadow-sm group"
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Previous testimonial"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 group-hover:text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">Previous</span>
                                </motion.button>

                                <div className="flex space-x-2">
                                    {testimonials.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleDotClick(index)}
                                            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                                                currentIndex === index 
                                                    ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-500' 
                                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                            }`}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        >
                                            {currentIndex === index && (
                                                <motion.div
                                                    className="absolute inset-0 bg-white/30 rounded-full"
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{ duration: 6, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.button 
                                    onClick={nextTestimonial}
                                    className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 shadow-sm group"
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Next testimonial"
                                >
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 mr-1">Next</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Stats cards with staggered animation */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                    >
                        {[
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>,
                                value: "500+",
                                label: "Happy Members",
                                color: "blue"
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>,
                                value: "98%",
                                label: "Satisfaction Rate",
                                color: "teal"
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 00-2 2zm9-13.5V9" />
                                </svg>,
                                value: "5+",
                                label: "Years of Excellence",
                                color: "blue"
                            }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                }}
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                
                                <motion.div 
                                    className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10`}
                                    whileHover={{ 
                                        rotate: 360,
                                        backgroundColor: stat.color === 'blue' ? '#DBEAFE' : '#CCFBF1',
                                        transition: { duration: 0.8 }
                                    }}
                                >
                                    {stat.icon}
                                </motion.div>
                                
                                <motion.h3 
                                    className="text-3xl font-bold text-gray-800 mb-2 relative z-10"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    {stat.value}
                                </motion.h3>
                                <p className="text-gray-500 font-medium relative z-10 group-hover:text-gray-700 transition-colors duration-300">{stat.label}</p>
                                
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-300 to-teal-300 group-hover:w-full transition-all duration-700 ease-in-out" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="text-base md:text-lg text-black inline-block"
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                    >
                        We&apos;re more than a gym, we&apos;re a community that lifts you up.
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;